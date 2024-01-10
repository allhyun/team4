import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatDetail: null,
  },
  reducers: {
    setchatDetail: (state, action) => {
      state.chatDetail = action.payload;
    },
  },
});

export const { setchatDetail } = chatSlice.actions;
//export const selectchatDetail = (state) => state.chat.chatDetail;
export default chatSlice.reducer;
