import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  email: "",
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // addValues: (state, action) => {
    //   const values = action.payload;
    //   Object.assign(state, values);
    // },
    login: (state, action) => {
      const values = action.payload;
      if (typeof values === "object" && values.userName && values.email) {
        state.userName = values.userName;
        state.email = values.email;
        state.isLogin = true;
      }
    },
    logOut: (state, action) => {
      state.userName = "";
      state.email = "";
      state.isLogin = false;
    },
  },
});

export const { login, logOut } = userSlice.actions;

export default userSlice.reducer;
