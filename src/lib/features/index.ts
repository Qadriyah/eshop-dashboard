import { combineReducers } from "@reduxjs/toolkit";
import drawerSlice from "./drawer";
import userSlice from "./user";

const rootReducer = combineReducers({
  drawer: drawerSlice,
  user: userSlice,
});

export default rootReducer;
