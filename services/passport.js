const passport = require("passport");
//only need the strategy property from the passport-google-oauth module
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require("../config/keys");

//create a new GoogleStrategy instance
//1st argument config options, an object containing client ID, secret, url to redirect after google verifies user credentials
//2nd argument is a callback
//access token allows us to ask google to get more info and change info.  This token will expire eventually, so the refresh token allows us to refresh the access token automatically.
//profile is the profile that has been saved to your Google account.
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token:", accessToken);
      console.log("refresh token:", refreshToken);
      console.log("profile:", profile);
    }
  )
);
