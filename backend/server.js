const express = require("express");
const port_number = process.env.PORT || 8080; //PORT SPECIFIED IN THE .env file
const app = express();
dbQuery = require('./dbQueries')
const body_parser = require("body-parser");


app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
// /session(post), /session/:sid(get), /session/:pid(get), /profile(post)

app.post("/session", (req, res) => {
    dbQuery.pushSession(req)
    .then((response)=>res.status(200).json(response.response))
    .catch((response)=>{res.status(400).json(response); console.log(response)})  
  });
app.post("/profile", (req, res) => {
      dbQuery.pushProfile(req)
      .then((response)=>{res.status(200).json(response.response); client.end()})
      .catch((response)=>{res.status(400).json(response); console.log(response)})
    });
app.get("/profile/:pid", (req, res) => {
        console.log(req.params.pid)
        dbQuery.getProfile(req)
        .then((response)=>{res.status(200).json(response.response); client.end()})
        .catch((response)=>{res.status(400).json(response); console.log(response); client.end()})
      });



app.listen(port_number , function() {
    console.log('Express server listening on port ', port_number);
  })