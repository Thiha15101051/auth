import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { stringify } from "postcss";

const initialState = {
  user: null,
  token: null,
};

export const UserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      (state.user = payload.user), (state.token = payload.token);
      Cookies.set("token", state.token);
      Cookies.set("user", JSON.stringify(state.user));
    },
    removeUserAcc: (state) => {
      (state.token = null),
        (state.user = null),
        Cookies.set("token", state.token);
      Cookies.set("user", state.user);
    },
  },
});

export const { setUserData,removeUserAcc } = UserSlice.actions;
export default UserSlice.reducer;
