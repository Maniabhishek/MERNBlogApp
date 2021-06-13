import { combineReducers } from 'redux';
import {postReducer,loadReducer} from "./PostReducer";
import {authReducer} from "./AuthReducer";

export const rootReducers = combineReducers({
    posts:postReducer,
    loading:loadReducer,
    authData:authReducer,
})