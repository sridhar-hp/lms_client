import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  // Role:null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.Role=action.payload.user.Role;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      // state.Role=null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;