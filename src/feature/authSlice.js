import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// get user Form LocalStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
//   isTeacher: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) =>{
        builder
        .addCase(login.fulfilled, (state, action)=> {
            state.isSuccess = true
            state.isError = false
            state.user = action.payload
        })
        .addCase(login.rejected, (state,action) =>{
            state.isError= true
            state.isSuccess =false
            state.message = action.payload
            state.user = null
        })
  }
});

export const login = createAsyncThunk("/login", async (userData, thunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
