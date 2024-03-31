import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import ftdReducer from "./slices/ftdSlice";
import { api } from "api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    app: appReducer,
    ftd: ftdReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
