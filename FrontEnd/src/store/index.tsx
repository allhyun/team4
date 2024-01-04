import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';
import studySlice from './modifyReducer';
import searchSlice from './searchReducer';
import userSlice from './user.slice';

// 한 번 묶어줘야 하는 걸로 보임 안 묶고 그냥 하려니까 안 됨
const studyReducers = combineReducers({
  study: studySlice,
});
const studyPersistConfig = {
  key: 'study',
  storage: storage,
  whitelist: ['study'],
};
const studyPersistedReducer = persistReducer(studyPersistConfig, studyReducers);

const searchReducers = combineReducers({
  search: searchSlice,
});
const searchPersistConfig = {
  key: 'search',
  storage: storage,
  whitelist: ['search'],
};
const searchPersistedReducer = persistReducer(searchPersistConfig, searchReducers);

const userReducers = combineReducers({
  user: userSlice,
});
const userPersistConfig = {
  key: 'user',
  storage: storage,
  whitelist: ['user'],
};
const userPersistedReducer = persistReducer(userPersistConfig, userReducers);

const store = configureStore({
  reducer: {
    study: studyPersistedReducer,
    search: searchPersistedReducer,
    user: userPersistedReducer,
  },
});

export default store;
