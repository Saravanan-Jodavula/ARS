const express = require("express");
const port_number = process.env.PORT || 8000; //PORT SPECIFIED IN THE .env file
const app = express();
dbQuery = require('./dbQueries')
const body_parser = require("body-parser");

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(allowCrossDomain);
var cors = require("cors");
app.use(cors());
// /session(post), /session/:sid(get), /session/:pid(get), /profile(post)

app.post("/session", (req, res) => {
    dbQuery.pushSession(req, res)
  });
app.post("/profile", (req, res) => {
      dbQuery.pushProfile(req,res)
    });
app.get("/profile/:pid", (req, res) => {
        console.log(req.params.pid)
        dbQuery.getProfile(req,res)
      });
app.get("/session/:pid", (req, res) => {
        console.log(req.params.pid)
        dbQuery.getSession(req,res)
      });
app.get("/session/usersavg/:leg/:pid", (req, res) => {
        // console.log(req.params.pid + req.params.date)
        dbQuery.getUserAverage(req,res)
        .then((resp)=>res.status(200).json(resp))
        .catch((err)=>res.status(400).json(err))
      });
app.get("/session/currentvsall/:leg/:pid", (req, res) => {
        // console.log(req.params.pid + req.params.date)
        dbQuery.currentVsAllAverage(req,res)
        .then((resp)=>res.status(200).json(resp))
        .catch((err)=>res.status(400).json(err))
      });
app.get("/session/usersavg/:leg/:pid/:date", (req, res) => {
        // console.log(req.params.pid + req.params.date)
        dbQuery.getUserAverageDate(req,res)
        .then((resp)=>res.status(200).json(resp))
        .catch((err)=>res.status(400).json(err))
      });
app.get("/currentsession", (req, res) => {
        // console.log(req.params.pid + req.params.date)
        dbQuery.getCurrentSession(req,res)
        .then((resp)=>res.status(200).json(resp))
        .catch((err)=>res.status(400).json(err))
      });
app.post("/endsession", (req, res) => {
        dbQuery.endSession(req,res)
        .then((resp)=>res.status(200).json(resp))
        .catch((err)=>res.status(400).json(err))
});
app.get("/peakdata/:leg/:pid", (req, res) => {
  dbQuery.getPeakData(req,res)
  .then((resp)=>res.status(200).json(resp))
  .catch((err)=>res.status(400).json(err))
});



app.listen(port_number , function() {
    console.log('Express server listening on port ', port_number);
  })