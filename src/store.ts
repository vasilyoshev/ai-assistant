import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import { api } from "api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    counter: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
