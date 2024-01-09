import { createSlice } from '@reduxjs/toolkit';
import { MarketState } from '../components/Types/MarketType';

const initialState: MarketState = {
  modifyPost: null,
};

const marketSlice = createSlice({
  name: 'market',
  initialState, // 초기 상태를 여기서 설정
  reducers: {
    setModifyPost: (state, action) => {
      state.modifyPost = action.payload;
    },
  },
});

export const { setModifyPost } = marketSlice.actions;
export default marketSlice.reducer;
