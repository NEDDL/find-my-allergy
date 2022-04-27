import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/reducer";
import { firestore } from "./middleware/firestore";
import { auth } from "./middleware/auth";

export default function store() {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      firestore,
      auth,
    ],
  });
}

export const useSelector = useReduxSelector;
export const useDispatch = () => useReduxDispatch();
