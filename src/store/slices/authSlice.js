import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/authActions";
import moment from "moment";

const initialState = {
  userId: "",
  email: "",
  lastLogin: null,
  isAuthenticated: false,
  authLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    stateLoaded: (state, action) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.lastLogin = action.payload.lastLoginAt;
      state.isAuthenticated = true;
      state.authLoading = false;
    },
    authRequested: (state) => {
      state.authLoading = true;
    },
    authFailed: (state) => {
      state.authLoading = false;
      state.isAuthenticated = false;
    },
    initialStateRequested: (state) => {
      return initialState;
    },
  },
});

const { stateLoaded, authRequested, initialStateRequested } = slice.actions;

export default slice.reducer;

export const signIn = (payload) =>
  actions.authenticationCallBegan({
    onStart: authRequested.type,
    onSuccess: stateLoaded.type,
    onError: actions.authenticationCallFailed.type,
    method: "signIn",
    data: payload,
  });

export const authenticateUser = () =>
  actions.authenticationCallBegan({
    onStart: authRequested.type,
    onSuccess: stateLoaded.type,
    onError: actions.authenticationCallFailed.type,
    method: "authState",
  });

export const logout = () =>
  actions.authenticationCallBegan({
    onStart: authRequested.type,
    onSuccess: userIdFetched.type,
    onError: actions.authenticationFailed.type,
    method: "logout",
  });
