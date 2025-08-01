import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/slice';
import articlesReducer from './articles/slice';
import authorsReducer from './authors/slice';
import subscriptionsReducer from './subscriptions/slice';
import favoritesReducer from './favorites/slice';
import modalReducer from './modal/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articlesReducer,
  authors: authorsReducer,
  subscriptions: subscriptionsReducer,
  favorites: favoritesReducer,
  modal: modalReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  blacklist: ['modal'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
