const port_number = process.env.PORT || 8080; //PORT SPECIFIED IN THE .env file
const app = express();
app.set('port', PORT);
app.set('env', NODE_ENV);

// /session(post), /session/:sid(get), /session/:pid(get), /profile(post)  


app.listen(PORT , function() {
    console.log('Express server listening on port ', PORT);
  })