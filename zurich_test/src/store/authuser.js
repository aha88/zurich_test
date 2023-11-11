// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'guser',
  initialState: {
    users: {},
  },
  reducers: {
    addUser: (state, action) => {
      state.users = (action.payload);
    },

  },
});

export const { addUser, removeUser } = userSlice.actions;
export const selectUser = state => state.guser.users;

export default userSlice.reducer;
