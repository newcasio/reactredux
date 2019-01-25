//prod keys here

//module.exports so these key value pairs are accessible by other files.  Can then require either or both files.
//The actual keys are held remotely with heroku
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY
};

// Setup keys on Heroku
// Goto heroku.com and login
// click on the project and then the settings tab, config variables, reveal variables.
// Set key value pairs.  Make sure the keys are exactly the sames as above eg. GOOGLE_CLIENT_ID.  Paste the actual keys from google and mongo (make sure you replace teh dbuser and password).
//THese are now available from process.env
