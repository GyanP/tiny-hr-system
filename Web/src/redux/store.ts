import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { loginReducer } from "./reducers";


const reducer = combineReducers({
    login: loginReducer,
})

const middleware = [thunk];

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

export {store};