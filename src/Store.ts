import { routerMiddleware as createRouterMiddleware } from "react-router-redux";
import { createStore, compose, applyMiddleware, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer, } from "./Root/Root.reducer";
import { rootSaga } from "./Root/Root.saga";
import { persistState } from "redux-devtools";
import { DevTools } from "./DevTools";
import { RootStore } from "./Root/Root.reducer";

export const configureStore = (initialState: RootStore = new RootStore(), history: any): Store<RootStore> => {
    const sagaMiddleware = createSagaMiddleware()
    const routerMiddleware = createRouterMiddleware(history);
    // TODO
    const enhancer: any = process.env.DEBUG ? compose(
        applyMiddleware(sagaMiddleware, routerMiddleware),
        DevTools.instrument(),
        persistState(
            window.location.href.match(
                /[?&]debug_session=([^&#]+)\b/
            )
        )
    ) : applyMiddleware(sagaMiddleware, routerMiddleware);
    const store = createStore<RootStore>(rootReducer, initialState, enhancer);
    if (module.hot && process.env.DEBUG) {
        module.hot.accept("./Root/Root.reducer.ts", () =>
            store.replaceReducer(require("./Root/Root.reducer.ts").default)
        );
    }
    sagaMiddleware.run(rootSaga);
    return store;
}

export default configureStore;