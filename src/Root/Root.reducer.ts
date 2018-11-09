import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

export class RootStore {
    router: any;
    form: any;
};

export const rootReducer = combineReducers<RootStore>({
    router: routerReducer,
    form: formReducer
});

export default rootReducer;