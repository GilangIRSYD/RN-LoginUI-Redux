import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import InputReducer from "./InputReducer";


const Reducers = combineReducers({InputReducer,AuthReducer})

export default Reducers