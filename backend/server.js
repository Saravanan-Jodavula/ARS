const express = require("express");
const port_number = process.env.PORT || 8080; //PORT SPECIFIED IN THE .env file
const app = express();
dbQuery = require('./dbQueries')
const body_parser = require("body-parser");


app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
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



app.listen(port_number , function() {
    console.log('Express server listening on port ', port_number);
  })