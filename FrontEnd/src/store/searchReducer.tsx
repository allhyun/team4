// searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchDetail: null,
  },
  reducers: {
    setsearchDetail: (state, action) => {
      state.searchDetail = action.payload;
    },
  },
});

export const { setsearchDetail } = searchSlice.actions;
//export const selectsearchDetail = (state) => state.search.searchDetail;
export default searchSlice.reducer;
