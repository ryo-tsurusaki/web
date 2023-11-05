/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import { UserReducer } from './user/reducer';

const RootReducer = combineReducers({
  user: UserReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const logger = createLogger({
  diff: true,
  collapsed: true,
});

const middlewareList = [logger];

export type RootState = ReturnType<typeof RootReducer>;

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewareList,
  devTools: true,
});

export const persistor = persistStore(store);
export default store;
