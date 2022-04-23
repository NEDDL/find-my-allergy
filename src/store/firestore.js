import { createAction } from "@reduxjs/toolkit";

export const firestoreCallBegan = createAction("firestore/CallBegan");
export const firestoreCallSuccess = createAction("firestore/CallSuccess");
export const firestoreCallFailed = createAction("firestore/CallFailed");
export const firestoreReadFromCached = createAction("firestore/ReadFromCached");
