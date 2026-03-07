
import { createSlice } from "@reduxjs/toolkit";
const safeParse = (data) => {
  try {
    return JSON.parse(data);
  } catch (e) {
   console.error("Error parsing data from localStorage", e);
    return null; // Return null if parsing fails
  }
};

// Initial state
const initialState = {
  user: safeParse(localStorage.getItem("user")) || null, // Load user from localStorage if exists
  token: localStorage.getItem("token") || null, // Load token from localStorage if exists
  loading: false, // to track loading state
  error: null, // to track any errors
};

// Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = {
        ...action.payload.user,
        phone: action.payload.phone,
      };
      state.token = action.payload.token;
      state.loading = false;

      try {
        localStorage.setItem("user", JSON.stringify(action.payload.user)); 
        localStorage.setItem("token", action.payload.token);
      } catch (error) {
        console.error("Error saving to localStorage", error);
      }
    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;

      // Clear user data and token from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

// Export actions
export const { loginRequest, loginSuccess, loginFailure, logout } =
  userSlice.actions;

// Export the reducer
export default userSlice.reducer;