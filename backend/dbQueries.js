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
    .then((response)=>{res.status(200).json({message: "Data entered"}); client.end()})
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
  client.query("insert into profile(age, height, weight, disability_info, name) values ($1,$2,$3,$4,$5);",[req.body.age, req.body.height, req.body.weight, req.body.disability_info, req.body.name])
  .then((response)=>{res.status(200).json({message: "profile created"}); client.end()})
  .catch((error)=>{res.status(400).json(error); console.log(error); client.end()})
}

let getProfile = function(req,res) {
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
  var client = new Client();
 client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  await client.query("select avg(cast(session_data -> $1 as float)) from sessions where profile_id = $2 AND date = $3;",[req.params.leg, req.params.pid, req.params.date])
  .then((response)=>{resp.userAverage = (response.rows[0].avg); })
  .catch((err)=>{res.status(400).json(err); console.log(err); })   
  
  await client.query("select avg(cast(session_data -> $1 as float)) from sessions where date = $2;",[req.params.leg, req.params.date])
  .then((response)=>{resp.totalAverage = (response.rows[0].avg); })
  .catch((err)=>{res.status(400).json(err); console.log(err); })   
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

module.exports={
    pushSession:pushSession,
    pushProfile: pushProfile,
    getProfile: getProfile,
    getSession: getSession,
    getUserAverage: getUserAverage,
    getUserAverageDate: getUserAverageDate,
    endSession: endSession,
    currentVsAllAverage: currentVsAllAverage
  }
