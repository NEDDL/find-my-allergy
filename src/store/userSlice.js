import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./firestore";
import moment from "moment";

const slice = createSlice({
  name: "user",
  initialState: {
    userId: "xtFEjEyYNK1PlLJidBxA",
    user: {
      name: "",
      lastName: "",
    },
    allergens: [],
    favorites: [],
    lastSearched: [],
    loading: false,
    uploading: false,
    lastFetch: null,
  },
  reducers: {
    dataLoaded: (state, action) => {
      state.userId = "xtFEjEyYNK1PlLJidBxA";
      state.user.name = action.payload.user.name;
      state.user.lastName = action.payload.user.lastName;
      state.allergens = action.payload.allergens;
      state.favorites = action.payload.favorites;
      state.lastSearched = action.payload.lastSearched;
      state.loading = false;
      state.uploading = false;
      state.lastFetch = Date.now();
    },
    dataLoadRequested: (state) => {
      state.loading = true;
    },
    dataLoadedFromCache: (state) => {
      state.loading = false;
    },
    dataUploadRequested: (state) => {
      state.uploading = true;
    },
    userUpdated: (state, action) => {
      return {
        ...state,
        state: {
          user: {
            name: action.payload.name,
            lastName: action.payload.lastName,
          },
          loading: false,
        },
      };
    },
    allergensUpdated: (state, action) => {
      return {
        ...state,
        allergens: action.payload.allergens,
        uploading: false,
      };
    },
    lastSearchedAdded: (state, action) => {
      if (state.lastSearched.includes(action.payload.lastSearched)) return;
      if (state.lastSearched?.length > 9) {
        state.lastSearched.pop();
      }
      state.lastSearched?.unshift(action.payload.lastSearched);
    },
    favoriteAdded: (state, action) => {
      state.favorites.push(action.payload.favorites);
    },
    favoriteDeleted: (state, action) => {
      return {
        ...state,
        favorites: state.favorites.filter(
          (_favorite) => _favorite != action.payload.favorites
        ),
      };
    },
  },
});

export const {
  userUpdated,
  allergensUpdated,
  favoriteAdded,
  favoriteDeleted,
  lastSearchedAdded,
} = slice.actions;

export default slice.reducer;

export const loadUser = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.user;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  dispatch(
    actions.firestoreCallBegan({
      onStart: "user/dataLoadRequested",
      onSuccess: "user/dataLoaded",
      onError: actions.firestoreCallFailed.type,
      method: "get",
    })
  );
};

export const addAllergens = (payload) =>
  actions.firestoreCallBegan({
    onStart: "user/dataUploadRequested",
    onSuccess: "user/allergensUpdated",
    onError: actions.firestoreCallFailed.type,
    method: "updateUser",
    data: payload,
  });

export const addLastSearched = (payload) =>
  actions.firestoreCallBegan({
    onStart: "user/dataUploadRequested",
    onSuccess: "user/lastSearchedAdded",
    onError: actions.firestoreCallFailed.type,
    method: "updateArrayAdd",
    data: payload,
  });

export const addFavorite = (payload) =>
  actions.firestoreCallBegan({
    onStart: "user/dataUploadRequested",
    onSuccess: "user/favoriteAdded",
    onError: actions.firestoreCallFailed.type,
    method: "updateArrayAdd",
    data: payload,
  });
export const removeFavorite = (payload) =>
  actions.firestoreCallBegan({
    onStart: "user/dataUploadRequested",
    onSuccess: "user/favoriteDeleted",
    onError: actions.firestoreCallFailed.type,
    method: "updateArrayRemove",
    data: payload,
  });
