require("dotenv").config();
const { Client } = require("pg");

let pushSession = function(req) {
    // var resp = {}
    var client = new Client();
   client.connect(err => {
      if (err) {
        console.error('connection error', err.stack)
      } else {
        console.log('connected')
      }
    })
    return client.query("insert into sessions(session_data, profile_id) values ($1,$2);",[req.body.session_data, req.body.profile_id]).then(()=>client.end())
}
let pushProfile = function(req) {
  // var resp = {}
  var client = new Client();
 client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  return client.query("insert into profile(age, height, weight, disability_info, name) values ($1,$2,$3,$4,$5);",[req.body.age, req.body.height, req.body.weight, req.body.disability_info, req.body.name])
}

let getProfile = function(req) {
  // var resp = {}
  var client = new Client();
 client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  return client.query("select * from profile where profile_id = $1;",[req.params.pid])
}

module.exports={
    pushSession:pushSession,
    pushProfile: pushProfile,
    getProfile: getProfile
  }
