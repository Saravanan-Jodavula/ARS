require("dotenv").config();
const { Client } = require("pg");

let pushSession = function(req,res) {
    // var resp = {}
    var client = new Client();
   client.connect(err => {
      if (err) {
        console.error('connection error', err.stack)
      } else {
        console.log('connected')
      }
    })
    client.query("insert into sessions(session_data, profile_id, sid, date, current) values ($1,$2,$3,$4,$5);",[req.body.session_data, req.body.profile_id, req.body.sid, req.body.date, req.body.current]).then(()=>client.end())
    .then((response)=>{res.status(200).json({message: "Data entered"}); console.log(response); client.end()})
    .catch((error)=>{res.status(400).json(error); console.log(error); client.end()})
  }

  let login = function(req,res) {
    // var resp = {}
    var client = new Client();
   client.connect(err => {
      if (err) {
        console.error('connection error', err.stack)
      } else {
        console.log('connected')
      }
    })
    client.query("select * from adminuser where username=$1;",[req.body.username])
    .then((response)=>{
      if(response.rows[0].password === req.body.password) {
      res.status(200).json({isLoggedin: true}); 
      console.log(response);
       client.end()
      } 
      else {
        res.status(400).json({isLoggedin: false, message: "wrong creds"})
        client.end()
      }
    })
    .catch((error)=>{res.status(400).json(error); console.log(error); client.end()})
  }

  let updateEndpoint = function(req,res) {
    // var resp = {}
    var client = new Client();
   client.connect(err => {
      if (err) {
        console.error('connection error', err.stack)
      } else {
        console.log('connected')
      }
    })
    client.query("update endpoint set link=$1 where id=$2;",[req.body.link, "url"]).then(()=>client.end())
    .then((response)=>{res.status(200).json({message: "Endpoint Changed"});  client.end()})
    .catch((error)=>{res.status(400).json(error); console.log(error); client.end()})
  }

  let getEndpoint = function(req,res) {
    // var resp = {}
    var client = new Client();
   client.connect(err => {
      if (err) {
        console.error('connection error', err.stack)
      } else {
        console.log('connected')
      }
    })
    client.query("select * from endpoint where id='url';")
    .then((response)=>{res.status(200).json({endpoint: response.rows[0].link}); client.end()})
    .catch((error)=>{res.status(400).json(error); console.log(error); client.end()})
  }
let pushProfile = function(req,res) {
  // var resp = {}
  var client = new Client();
 client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  client.query("insert into profile(age, height, weight, disability_info, name, unique_id) values ($1,$2,$3,$4,$5,$6);",[req.body.age, req.body.height, req.body.weight, req.body.disability_info, req.body.name, req.body.unique_id])
  .then((response)=>{res.status(200).json({message: "profile created"}); console.log(response); client.end()})
  .catch((error)=>{res.status(400).json(error); console.log(error); client.end()})
}

let getProfile = function(req,res) {
  // const resp = {}
  var client = new Client();
 client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  client.query("select * from profile where profile_id = $1;",[req.params.pid])
  .then((response)=>{res.status(200).json(response.rows); client.end();})
  .catch((err)=>{res.status(400).json(err); console.log(err); client.end();})   
  // console.log(resp)   
}
let getSession = function(req,res) {
  const resp = {}
  var client = new Client();
 client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  client.query("select * from sessions where profile_id = $1;",[req.params.pid])
  .then((response)=>{res.status(200).json(response.rows); client.end();})
  .catch((err)=>{res.status(400).json(err); console.log(err); client.end();})   
  // console.log(resp)   
}

async function getUserAverage(req,res) {
  const resp = {}
  var client = new Client();
 client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  await client.query("select avg(cast(session_data -> $1 as float)) from sessions where profile_id = $2;",[req.params.leg, req.params.pid])
  .then((response)=>{resp.userAverage = (response.rows[0].avg); })
  .catch((err)=>{res.status(400).json(err); console.log(err); })   
  
  await client.query("select avg(cast(session_data -> $1 as float)) from sessions;",[req.params.leg])
  .then((response)=>{resp.totalAverage = (response.rows[0].avg); })
  .catch((err)=>{res.status(400).json(err); console.log(err); })   
  client.end();
  return resp
}

async function getUserAverageDate(req,res) {
  const resp = {}
  var client = new Client();
 client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  var daet = req.params.date.toString()
  console.log(daet)
  await client.query(`select avg(cast(session_data -> $1 as float)) from sessions where profile_id = $2 AND date = cast('${daet}' as date);`,[req.params.leg, req.params.pid])
  .then((response)=>{resp.userAverage = (response.rows[0].avg); })
  .catch((err)=>{resp.error = err; console.log(err); })   
  
  await client.query(`select avg(cast(session_data -> $1 as float)) from sessions where date = cast('${daet}' as date);`,[req.params.leg])
  .then((response)=>{resp.totalAverage = (response.rows[0].avg); })
  .catch((err)=>{resp.error = err; console.log(err); })   
  client.end();
  return resp
}

async function endSession(req,res) {
  const resp = {}
  var client = new Client();
 client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  await client.query("update sessions set current = false where current = true;")
  .then((response)=>{resp.message = "session ended successfully"; resp.rows_affected = response.rowCount })
  .catch((err)=>{resp.error = err; console.log(err); })   
  client.end();
  return resp
}

async function currentVsAllAverage(req,res) {
  const resp = {}
  var client = new Client();
 client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  await client.query("select avg(cast(session_data -> $1 as float)) from sessions where profile_id = $2 and current = true;",[req.params.leg, req.params.pid])
  .then((response)=>{resp.current_Average = (response.rows[0].avg); })
  .catch((err)=>{res.status(400).json(err); console.log(err); })   
  
  await client.query("select avg(cast(session_data -> $1 as float)) from sessions where profile_id = $2;",[req.params.leg, req.params.pid])
  .then((response)=>{resp.all_Time_Average = (response.rows[0].avg); })
  .catch((err)=>{res.status(400).json(err); console.log(err); })   
   
  client.end();
  return resp
}

async function getCurrentSession() {
  const resp = {}
  var client = new Client();
 client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  await client.query("select * from sessions where current = true;")
  .then((response)=>{resp.data = response.rows;})
  .catch((err)=>{resp.error = err; console.log(err); })   
  client.end();
  return resp
}
async function getCurrentSessionLive(socket) {
  const resp = {}
  var obj = {
    updateEndpoint : [],
    lowerQuadrant: [],
    sideways: [],
    diagonal: []
  }
  var client = new Client();
 client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  await client.query("select * from sessions where current = true;")
  .then((response)=>{resp.data = response.rows;})
  .catch((err)=>{resp.error = err; console.log(err); })   
  client.end();
  // console.log(socket)
  var upperQuadrant = []
  var lowerQuadrant =[]
  var sideways =[]
  var diagonal =[]
  var one = []
  var two = []
  var three = []
  var four = []
  var five = []
  var six = []
  var seven = []
  var eight = []
  var nine = []
  var ten = []
  resp.data.forEach(element => {
    upperQuadrant.push(element.session_data["left-leg"])
    lowerQuadrant.push(element.session_data["right-leg"])
    sideways.push(element.session_data["left-hand"])
    diagonal.push(element.session_data["right-hand"])
    one.push(element.session_data["one"])
    two.push(element.session_data["two"])
    three.push(element.session_data["three"])
    four.push(element.session_data["four"])
    five.push(element.session_data["five"])
    six.push(element.session_data["six"])
    seven.push(element.session_data["seven"])
    eight.push(element.session_data["eight"])
    nine.push(element.session_data["nine"])
    ten.push(element.session_data["ten"])
  });
  return {upperQuadrant: upperQuadrant,lowerQuadrant: lowerQuadrant,sideways: sideways,diagonal: diagonal}
}

async function getPeakData(req,res) {
  let resp = {}
  var client = new Client();
 client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  await client.query("select max(cast(session_data -> $1 as float)) from sessions where profile_id = $2;",[req.params.leg, req.params.pid])
  .then((response)=>{resp.userMax = (response.rows[0].max); console.log('0');})
  .catch((err)=>{res.status(400).json(err); console.log(err);})   
  
  await client.query("select max(cast(session_data -> $1 as float)) from sessions;",[req.params.leg])
  .then((response)=>{resp.totalMax = (response.rows[0].max);   console.log('1');})
  .catch((err)=>{res.status(400).json(err); console.log(err); })   

  await client.query("select min(cast(session_data -> $1 as float)) from sessions where profile_id = $2;",[req.params.leg, req.params.pid])
  .then((response)=>{resp.userMin = (response.rows[0].min); console.log('2');})
  .catch((err)=>{res.status(400).json(err); console.log(err); })   
  
  await client.query("select min(cast(session_data -> $1 as float)) from sessions;",[req.params.leg])
  .then((response)=>{resp.totalMin = (response.rows[0].min); console.log('3');})
  .catch((err)=>{res.status(400).json(err); console.log(err); })     
  
  client.end();
  console.log('hi')
  return resp
}

module.exports={
     pushSession,
     pushProfile,
     getProfile,
     getSession,
     getUserAverage,
     getUserAverageDate,
     endSession,
     currentVsAllAverage,
     getCurrentSession,
     getCurrentSessionLive,
     getPeakData,
     updateEndpoint,
     getEndpoint,
     login
  }
