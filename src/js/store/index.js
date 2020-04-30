import { compose, createStore } from "redux";
import rootReducer from "../reducers/index";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, storeEnhancers());
