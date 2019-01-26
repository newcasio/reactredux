const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(proxy("/auth/google", { target: "http://localhost:5000" }));
  app.use(proxy("api/*", { target: "http://localhost:5000" }));
};

//making a proxy,  if anyone is accessing the above extensions, auto forward the request to prefix localhost:5000.

//In dev mode, all requests to the backend from react goes through this proxy on the create react app server which redirects to 5000.

//In production, no client server exists.  All relevant files pass through webpack and babel, final build of application saved in the build folder.  Can do this manually, in client run npm run build which will fill the build folder which will be the entire react application.

//Magic, just works.  Doesn't care whether dev or production.  For dev, this setup good for security as all requests go through create-react-app as cookies will always be attached first going to client server 3000, then call to backend 5000 is already authorized.  No cross origin resource sharing issue CORS.
