//load in modules needed
const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

require("./models/User.js");

//we need the code in the passport.js file to run, so we just require instead of assigning a const name.  We don't need to constName.add or anything.
require("./services/passport");

//connect the express application to our remote mongodb
//mongo address found on mLab database page, the second addres (standard mongodb URI).
//keep address secret, sent to config/keys.js
mongoose.connect(keys.mongoURI);

//create express application instance from express module
//app object used for configuration
const app = express();

//bring in the routes which returns a function, then immediately call that function with the app object.
require("./routes/authRoutes")(app);

//heroku can dynamically inject environment variables including port number when run.  Environment variables are heroku's opportunity to pass config info.  || (or) port 5000 if still in development as herouku has not passed the port number yet.
const PORT = process.env.PORT || 5000;
//express is telling node to listen to port defined above
app.listen(PORT);

//REDUNDANT CODE

//route handler.
//get method used to get info
//"/" refers to specified route
//req is an object and refers to the incoming request
//res is an object and refers to the outgoing response
//res.send returns an JS object
// app.get("/", (req, res) => {
//   res.send({ bye: "there" });
// });
