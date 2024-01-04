import { configureStore } from '@reduxjs/toolkit';
import studySlice from './modifyReducer';
import searchSlice from './searchReducer';

const store = configureStore({
  reducer: {
    study: studySlice,
    search: searchSlice,
  },
});

export default store;
