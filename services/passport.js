const passport = require("passport");
//only need the strategy property from the passport-google-oauth module
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

//import the users schema.  Do not require/import because can cause errors in testing.
//Now User refers to our model class/users collection.
const User = mongoose.model("users");

//when the user has signed in and has been authenticated, passport will use the user profile to create a token/cookie which will be sent back to the browser that will allow follow up requests without having to authenticate again.  This is done in the background.
//serializeUser is a predefined method in passport will use the user.id to create a cookie code.
//the first argument of user refers to the user returned from either retrieving an existing user, or the newly created user when signing up/loggin in.
//null is used to handle any errors that may occur.
//user.id !== profile.id.  The profile.id is the google id.  This actually refers to the id that is automatically assigned to the record/user by mongo when the user is created.  Use this user.id because all records will have this id, not all records may have a google id if the user signed up with via facebook.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//deserialize is reversing serialize, which will extract the user.id from the cookie.  deserializeUser uses the id immediately to look in the db.
//id refers to the exact token which was attached to the cookie.
//User.findById using the id which comes back from deserialize.
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//create a new GoogleStrategy instance
//1st argument config options, an object containing client ID, secret, url to redirect after google verifies user credentials
//2nd argument is a callback that is run after google has verified the user.  Google sends back info including the accessToken, refreshToken and the user profile.
//access token allows us to ask google to get more info and change info.  This token will expire eventually, so the refresh token allows us to refresh the access token automatically.
//profile is the profile that has been saved to your Google account.
//when google returns without error, we want to create a new User, and assign the google ID according to the schema.  The key must match what is defined in the schema, and assign it the id (profile.id).  Manually save this record with .save();
//if google ID exists in our database, do not create a new User.
//call done to tell passport we have finished, and it can continue on the auth process.  If we find a record (the if part) we pass null as the first argument to say no errors occurred, the second will be the actual record.
//proxy true to allow proxies?  (avoid error caused from callback domains to http instead of https)
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //if user is found, do nothing
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
