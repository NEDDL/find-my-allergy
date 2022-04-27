import { combineReducers } from "redux";
import userReducer from "../slices/userSlice";
import authReducer from "../slices/authSlice";

export default combineReducers({
  user: userReducer,
  auth: authReducer,
});
