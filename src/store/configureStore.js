import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { firestore } from "./middleware/firestore";

export default function store() {
  return configureStore({
    reducer,
    middleware: [firestore],
  });
}

export const useSelector = useReduxSelector;
export const useDispatch = () => useReduxDispatch();
