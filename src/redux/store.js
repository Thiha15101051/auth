import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./services/UserSlice";
import { authApi } from "./api/authApi";
import { ContactApi } from "./api/ContactApi";

export const store = configureStore({
  reducer: {
    USER: UserSlice,
    [authApi.reducerPath]: authApi.reducer,
    [ContactApi.reducerPath]: ContactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, ContactApi.middleware),
  
});