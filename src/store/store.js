import { createStore, combineReducers, applyMiddleware } from "redux";
import  bucket  from "../reducer/bucket";
import  task  from "../reducer/task";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(combineReducers({
    bucket,
    task
}),
    composeWithDevTools(applyMiddleware(thunk)));

export default store;