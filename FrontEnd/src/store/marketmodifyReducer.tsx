import { createSlice } from '@reduxjs/toolkit';
import { MarketState } from '../components/Types/MarketType';

const initialState: MarketState = {
  modifyPost: null,
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    // setMarketDetail: (state, action) => {
    //   state.marketDetail = action.payload;
    // },
    setModifyPost: (state, action) => {
      state.modifyPost = action.payload;
    },
  },
});

export const { setModifyPost } = marketSlice.actions;
export default marketSlice.reducer;
