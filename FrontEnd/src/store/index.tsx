import { configureStore } from "@reduxjs/toolkit";
import studySlice from "./modifyReducer";

const store = configureStore({
  reducer: {
    study: studySlice,
  },
});

export default store;
