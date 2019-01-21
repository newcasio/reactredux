//load in modules needed
const express = require("express");

//create express application instance from express module
//app object used for configuration
const app = express();

//route handler.
//get method used to get info
//"/" refers to specified route
//req is an object and refers to the incoming request
//res is an object and refers to the outgoing response
//res.send returns an JS object
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

//heroku can dynamically inject environment variables including port number when run.  Environment variables are heroku's opportunity to pass config info.  || (or) port 5000 if still in development as herouku has not passed the port number yet.
const PORT = process.env.PORT || 5000;
//express is telling node to listen to port defined above
app.listen(PORT);
