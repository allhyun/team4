import { createSlice } from '@reduxjs/toolkit';

const marketSearchSlice = createSlice({
  name: 'marketSearch',
  initialState: {
    marketSearchDetail: null,
  },
  reducers: {
    setMarketSearchDetail: (state, action) => {
      state.marketSearchDetail = action.payload;
    },
  },
});

export const { setMarketSearchDetail } = marketSearchSlice.actions;
export default marketSearchSlice.reducer;
