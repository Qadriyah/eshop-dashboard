import { combineReducers } from "@reduxjs/toolkit";
import drawerSlice from "./drawer";

const rootReducer = combineReducers({
  drawer: drawerSlice,
});

export default rootReducer;
