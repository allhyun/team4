import { createSlice } from '@reduxjs/toolkit';

interface UserInfo {
  u_idx: string | null;
  userid: string | null;
  nickname: string | null;
  u_img: string | null;
}

const INITIAL_STATE: UserInfo = {
  u_idx: null,
  userid: null,
  nickname: null,
  u_img: null,
};

export const userSlice = createSlice({
  name: 'userInfo',
  initialState: INITIAL_STATE,
  reducers: {
    setUserInfo: (state, action) => {
      state.u_idx = action.payload.u_idx;
      state.userid = action.payload.userid;
      state.nickname = action.payload.nickname;
      state.u_img = action.payload.u_img;
    },
    removeUserInfo: (state) => {
      state.u_idx = null;
      state.userid = null;
      state.nickname = null;
      state.u_img = null;
    },
  },
});

export const { setUserInfo, removeUserInfo } = userSlice.actions;

export default userSlice.reducer;
