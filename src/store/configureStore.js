import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/reducer";
import { firestore } from "./middleware/firestore";

export default function store() {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      firestore,
    ],
  });
}

export const useSelector = useReduxSelector;
export const useDispatch = () => useReduxDispatch();
