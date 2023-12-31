// studySlice.js
import { createSlice } from "@reduxjs/toolkit";

const studySlice = createSlice({
  name: "study",
  initialState: {
    studyDetail: null,
  },
  reducers: {
    setStudyDetail: (state, action) => {
      state.studyDetail = action.payload;
    },
  },
});

export const { setStudyDetail } = studySlice.actions;
//export const selectStudyDetail = (state) => state.study.studyDetail;
export default studySlice.reducer;
