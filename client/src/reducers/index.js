import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'; //this syntax for renaming 'reducer' is just an example of a more descriptive way to reference this variable
import authReducer from './authReducer';
import streamReducer from "./streamReducer";

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});