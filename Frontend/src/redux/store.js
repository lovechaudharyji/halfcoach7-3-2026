import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import coachReducer from "./coachSlice.js";

// Configure the store
const store = configureStore({
  reducer: {
    user: userReducer,
    coach: coachReducer,
  },
});

export default store;
