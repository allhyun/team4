import { createSlice } from '@reduxjs/toolkit';

const marketSlice = createSlice({
  name: 'market',
  initialState: {
    marketDetail: null, // 게시글 포린키
  },
  reducers: {
    setMarketDetail: (state, action) => {
      state.marketDetail = action.payload;
    },
  },
});

export const { setMarketDetail } = marketSlice.actions;
//export const selectStudyDetail = (state) => state.study.studyDetail;
export default marketSlice.reducer;
