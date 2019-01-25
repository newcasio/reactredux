//figure which set of credentials to return

//when deploying to heroku, there is a environment variable call NODE_ENV which automatically detects if we are running in a production environment.
if (process.env.NODE_ENV === "production") {
  //in production - return production set of keys
  //require in, then immediately make available to other files.
  module.exports = require("./prod.js");
} else {
  //in dev - return dev set of keys
  module.exports = require("./dev.js");
}
