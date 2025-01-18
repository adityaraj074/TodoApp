import {configureStore} from '@reduxjs/toolkit';

// Import your reducers here (if you have any)
import user from './userSlice';

const store = configureStore({
  reducer: {
    user, // add your reducers here
  },
});

export default store;
