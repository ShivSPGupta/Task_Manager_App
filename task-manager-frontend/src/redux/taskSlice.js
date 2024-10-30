import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    setTasks(state, action) {
      return action.payload;
    },
    addTask(state, action) {
      state.push(action.payload);
    },
    updateTask(state, action) {
      const index = state.findIndex((task) => task._id === action.payload._id);
      state[index] = action.payload;
    },
  },
});

export const { setTasks, addTask, updateTask } = taskSlice.actions;

export const fetchTasks = () => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/tasks`);
  dispatch(setTasks(data));
};

export const createTask = (taskData) => async (dispatch) => {
  const { data } = await axios.post(`${API_URL}/tasks`, taskData);
  dispatch(addTask(data));
};

export const modifyTask = (id, updatedData) => async (dispatch) => {
  const { data } = await axios.put(`${API_URL}/tasks/${id}`, updatedData);
  dispatch(updateTask(data));
};

export default taskSlice.reducer;
