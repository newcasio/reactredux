import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

//first argument root component (App.js which is imported above), second argument is where we want to render the root component inside our DOM.  THis is found in the public/index.html file.
ReactDOM.render(<App />, document.querySelector("#root"));
