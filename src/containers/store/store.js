import { applyMiddleware, createStore, compose } from "redux"
import { loadState, saveState } from './localStorage';
import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "../reducers"

// const middleware = compose(applyMiddleware(promise(), thunk, logger(),window.devToolsExtension ? window.devToolsExtension(): f => f));
const persistedState = loadState();
export default createStore(reducer, persistedState,
    compose(
        applyMiddleware(promise(),
            thunk, logger()),
        window.devToolsExtension ? window.devToolsExtension() : f => f

    )
);
