//load in modules needed
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
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

//Pass app.use an object, used to wire up middleware in our express application.  This are modifying all incoming requests before being sent to the route handlers (therefore are a centralised place to run logic on requests instead of doing on each handler individually).
//require both cookieSession and passport.  cookieSession so we have access to cookies, passport so we can tell passport to use them.
//configuration of cookieSession
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //cookie expiry length in milliseconds, here 30 days
    keys: [keys.cookieKey] //key encryption, array may have multiple keys
  })
);
//tell passport to use cookie, with config above
app.use(passport.initialize());
app.use(passport.session());

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
