import React from "react";
import ReactDOM from "react-dom";
import "./i18n/i18n";
import { Provider } from "react-redux";

import RootApp from "./App";
import configureStore from "./data/store";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <RootApp />
  </Provider>,
  document.getElementById("root")
);
