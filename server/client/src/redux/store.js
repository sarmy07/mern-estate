import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware(authApi.middleware).concat(),
});

setupListeners(store.dispatch);
