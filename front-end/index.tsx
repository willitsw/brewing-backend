import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";

import "./globalStyles.css";

var mountNode = document.getElementById("app");

ReactDOM.render(<App />, mountNode);
