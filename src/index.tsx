import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { configureStore } from "./Store";
import { Root } from "./Root/Root";
import { createBrowserHistory } from "history";
import { RootStore } from "Root/Root.reducer";

const history = createBrowserHistory();
const store = configureStore(new RootStore(), history);

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./Root/Root.tsx", () => {
    const RootContainer = require("./Root/Root.tsx").default;
    render(
      <AppContainer>
        <RootContainer store={store} history={history} />
      </AppContainer>,
      document.getElementById("root")
    );
  });
}