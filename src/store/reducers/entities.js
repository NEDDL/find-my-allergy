import { combineReducers } from "redux";
import userReducer from "../slices/userSlice";

export default combineReducers({
  user: userReducer,
});
