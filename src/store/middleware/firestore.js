import * as actions from "../firestore";
import * as db from "../../database/services/userService";
import moment from "moment"

export const firestore =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.firestoreCallBegan.type) return next(action);

    const { onStart, onError, onSuccess, data, method } = action.payload;
    const { userId, lastFetch } = getState().entities.user;

    dispatch({ type: onStart });
    next(action);

    if (method === "updateUser") {
      try {
        await db.updateUser(userId, data);
        dispatch(actions.firestoreCallSuccess("Call performed successfully"));
        dispatch({ type: onSuccess, payload: data });
      } catch (err) {
        dispatch({ type: onError, payload: err.message });
      }
    }

    if (method === "updateArrayAdd") {
      try {
        const array = Object.keys(data)[0];
        const payload = data.[array];
        await db.updateArrayAdd(userId, array, payload);
        dispatch(actions.firestoreCallSuccess("Call performed successfully"));
        dispatch({ type: onSuccess, payload: data });
      } catch (err) {
        dispatch({ type: onError, payload: err.message });
      }
    }
    if (method === "updateArrayRemove") {
      try {
        const array = Object.keys(data)[0];
        const payload = data.[array];
        await db.updateArrayRemove(userId, array, payload);
        dispatch(actions.firestoreCallSuccess("Call performed successfully"));
        dispatch({ type: onSuccess, payload: data });
      } catch (err) {
        dispatch({ type: onError, payload: err.message });
      }
    }
    if (method === "get") {
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes")
      if (diffInMinutes < 10) {
        dispatch(actions.firestoreReadFromCached("Last fetched: " + moment(lastFetch).startOf('minutes').fromNow()))
      } else {
      try{
        const userData = await db.getUser(userId);
        dispatch(actions.firestoreCallSuccess("Call performed successfully"));
        dispatch({ type: onSuccess, payload: userData });
      } catch (err) {
        dispatch({ type: onError, payload: err.message });
      }
      }
    }

    
  };
