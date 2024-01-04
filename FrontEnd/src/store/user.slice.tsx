import { createSlice } from '@reduxjs/toolkit';

interface UserInfo {
  uid: string | null;
  nickname: string | null;
}

const INITIAL_STATE: UserInfo = {
  uid: null,
  nickname: null,
};

export const userSlice = createSlice({
  name: 'userInfo',
  initialState: INITIAL_STATE,
  reducers: {
    setUserInfo: (state, action) => {
      state.uid = action.payload.uid;
      state.nickname = action.payload.nickname;
    },
    removeUserInfo: (state) => {
      state.uid = null;
      state.nickname = null;
    },
  },
});

export const { setUserInfo, removeUserInfo } = userSlice.actions;

export default userSlice.reducer;
