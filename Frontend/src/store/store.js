import {configureStore} from '@reduxjs/toolkit';

import user from './userSlice';
import todo from './todoSlice';

const store = configureStore({
  reducer: {
    user,
    todo,
  },
});

export default store;
