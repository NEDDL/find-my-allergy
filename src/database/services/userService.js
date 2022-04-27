import db from "../configureFirestore";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  DocumentReference,
  query,
  where,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

export const createUser = async (userId, payload) => {
  const userDoc = doc(db, "users", userId);
  return await setDoc(userDoc, payload);
};

export const getUser = async (userId) => {
  const userDoc = doc(db, "users", userId);
  return (await getDoc(userDoc)).data();
};

export const updateUser = async (userId, payload) => {
  const userDoc = doc(db, "users", userId);
  return updateDoc(userDoc, payload);
};

export const updateArrayAdd = async (userId, array, payload) => {
  const userDoc = doc(db, "users", userId);
  return updateDoc(userDoc, { [array]: arrayUnion(payload) });
};

export const updateArrayRemove = async (userId, array, payload) => {
  const userDoc = doc(db, "users", userId);
  return updateDoc(userDoc, { [array]: arrayRemove(payload) });
};
