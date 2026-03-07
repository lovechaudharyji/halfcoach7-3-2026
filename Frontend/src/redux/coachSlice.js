
import { createSlice } from "@reduxjs/toolkit";

const safeParse = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log("Error parsing data from localStorage", error);
    return null;
  }
};

const initialState = {
  coach: safeParse(localStorage.getItem("coach")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.coach = action.payload.coach; 
      state.token = action.payload.token;
      state.loading = false;

      try {
        localStorage.setItem("coach", JSON.stringify(action.payload.coach)); 
        localStorage.setItem("token", action.payload.token); 
      } catch (error) {
        console.log("Error saving to localStorage", error);
      }
    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.coach = null;
      state.token = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("coach");
      localStorage.removeItem("token");
    },
    updateCoachProfile(state, action) {
      state.coach = { ...state.coach, ...action.payload };
      try {
        localStorage.setItem("coach", JSON.stringify(state.coach));
      } catch (error) {
       console.log("Error in saving to LocalStorage", error);
      }
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  updateCoachProfile,
} = coachSlice.actions;

export default coachSlice.reducer;