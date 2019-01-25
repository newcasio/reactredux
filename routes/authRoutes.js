const passport = require("passport");

//export the route handlers as a whole to index.js
//cannot const app = express(); because this will create a new express app.
module.exports = app => {
  //route handler to authenticate user
  //instead of usual callback for second argument, tells to use passport. Google after authenticate is specifying using the google strategy (this is derived from the new instance of GoogleStrategy).
  //scope tells the Google servers what we want to have access to
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  //on this route, passport.authenticate is called again, but it will see a code at the end of the url so deduces user already verified so will send what is in the scope above which is the user profile and email.
  app.get("/auth/google/callback", passport.authenticate("google"));

  //log out function.
  //logout method automatically attached to req by passport.
  //destroys cookie currently attached to request.
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  //this route to test after logging in, user info is attached to subsequent reqests
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
    // res.send(req.session);
  });
};
