import * as actions from "../actions/authActions";
import { signIn, authState, logout } from "../../auth/authService";
import moment from "moment";

export const auth =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.authenticationCallBegan.type)
      return next(action);

    const { onStart, onError, onSuccess, method, data } = action.payload;

    dispatch({ type: onStart });
    next(action);

    if (method === "signIn") {
      try {
        const { email, password } = data;
        const userData = await signIn(email, password);
        const payload = {
          userId: userData.user.uid,
          email: userData.user.email,
          lastLoginAt: userData.user.metadata.lastLoginAt,
        };
        dispatch(
          actions.authenticationCallSuccess(
            "User credentials are successfully obtained."
          )
        );
        dispatch({ type: onSuccess, payload: payload });
        console.log(userData);
      } catch (err) {
        dispatch({ type: onError, payload: err.message });
        dispatch({ type: "auth/authFailed" });
        throw err;
      }
    }

    if (method === "authState") {
      try {
        const userData = await authState();
        const payload = {
          userId: userData.uid,
          email: userData.email,
          lastLoginAt: userData.metadata.lastLoginAt,
        };
        dispatch(
          actions.authenticationCallSuccess("User credentials are still valid.")
        );
        dispatch({ type: onSuccess, payload: payload });
      } catch (err) {
        dispatch({ type: onError, payload: err.message });
        dispatch({ type: "auth/initialStateRequested" });
        throw err;
      }
    }

    if (method === "logout") {
    }

    // if (method === "updateUser") {
    //   try {
    //     await db.updateUser(userId, data);
    //     dispatch(actions.firestoreCallSuccess("Call performed successfully"));
    //     dispatch({ type: onSuccess, payload: data });
    //   } catch (err) {
    //     dispatch({ type: onError, payload: err.message });
    //   }
    // }

    // if (method === "updateArrayAdd") {
    //   try {
    //     const array = Object.keys(data)[0];
    //     const payload = data.[array];
    //     await db.updateArrayAdd(userId, array, payload);
    //     dispatch(actions.firestoreCallSuccess("Call performed successfully"));
    //     dispatch({ type: onSuccess, payload: data });
    //   } catch (err) {
    //     dispatch({ type: onError, payload: err.message });
    //   }
    // }
    // if (method === "updateArrayRemove") {
    //   try {
    //     const array = Object.keys(data)[0];
    //     const payload = data.[array];
    //     await db.updateArrayRemove(userId, array, payload);
    //     dispatch(actions.firestoreCallSuccess("Call performed successfully"));
    //     dispatch({ type: onSuccess, payload: data });
    //   } catch (err) {
    //     dispatch({ type: onError, payload: err.message });
    //   }
    // }
    // if (method === "get") {
    //   try{
    //     const userData = await db.getUser(userId);
    //     dispatch(actions.firestoreCallSuccess("Call performed successfully"));
    //     dispatch({ type: onSuccess, payload: userData });
    //   } catch (err) {
    //     dispatch({ type: onError, payload: err.message });
    //   }
    // }
  };
