import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const UserSlice=createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        setUserData:(state,{payload})=>{
            state.user=payload.user,
            state.token=payload.token
        }
    }
})

export const {setUserData}=UserSlice.actions;
export default UserSlice.reducer