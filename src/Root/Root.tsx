import React, { Component } from "react";
import { Provider } from "react-redux";
import { RootStore } from "./Root.reducer";
import { DevTools } from "./../DevTools";
import { Store } from "redux";
import { ConnectedRouter } from "react-router-redux";

interface IProps {
  store: Store<RootStore>;
  history: any // TODO
}

export class Root extends Component<IProps, never> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <React.Fragment>
            <DevTools />
          </React.Fragment>
        </ConnectedRouter >
      </Provider >
    );
  }
}

export default Root;