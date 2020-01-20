import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(rootReducer),
  supportsHistory = "pushState" in window.history;

render(
  <Provider store={store}>
    <Router forceRefresh={!supportsHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
