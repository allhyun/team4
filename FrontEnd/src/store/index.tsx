import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';
import studySlice from './modifyReducer';
import userSlice from './user.slice';

// 한 번 묶어줘야 하는 걸로 보임 안 묶고 그냥 하려니까 안 됨
const reducers = combineReducers({
  user: userSlice,
});

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['user'],
};

const userPersistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: {
    study: studySlice,
    user: userPersistedReducer,
  },
});

export default store;
