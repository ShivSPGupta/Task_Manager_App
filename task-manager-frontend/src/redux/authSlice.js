import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const login = (credentials) => async (dispatch) => {
  const { data } = await axios.post(`${API_URL}/auth/login`, credentials);
  dispatch(setUser(data));
};

export const register = (userData) => async (dispatch) => {
  await axios.post(`${API_URL}/auth/register`, userData);
};

export default authSlice.reducer;
