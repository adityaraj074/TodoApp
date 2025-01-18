import {createSlice} from '@reduxjs/toolkit';

const initialState = {user: null};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setuser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {setuser} = userSlice.actions;
export default userSlice.reducer;
