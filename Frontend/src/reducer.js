import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./Redux/authslice";

const rootreducer = combineReducers({
  auth : authReducer
})

export default rootreducer;