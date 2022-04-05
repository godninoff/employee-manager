import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import employees from "./utils/mock.json";
import { Provider } from "react-redux";
import store from "./store";

employees.map((payload) => store.dispatch({ type: "addEmployees", payload }));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
