import { configureStore } from "@reduxjs/toolkit";
import {ContactApi} from "./api/ContactApi";
import UserSlice from "./services/UserSlice";

export const store = configureStore({
  reducer: {
    USER:UserSlice,
    [ContactApi.reducerPath]:ContactApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ContactApi.middleware),
});