import { createAction } from "@reduxjs/toolkit";

export const authenticationCallBegan = createAction("authentication/CallBegan");
export const authenticationCallSuccess = createAction(
  "authentication/CallSuccess"
);
export const authenticationCallFailed = createAction(
  "authentication/CallFailed"
);
