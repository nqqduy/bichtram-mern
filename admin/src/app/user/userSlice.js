import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: user ? JSON.parse(user) : null,
    token: token ? token : "",
  },
  reducers: {
    logoutUser: (state) => {
      state.currentUser = null;
      state.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
