import { configureStore } from '@reduxjs/toolkit';
import studySlice from './modifyReducer';
import userSlice from './user.slice';

const store = configureStore({
  reducer: {
    study: studySlice,
    user: userSlice,
  },
});

export default store;
