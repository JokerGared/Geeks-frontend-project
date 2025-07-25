import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice";
import articlesReducer from "./articles/slice";
import authorsReducer from "./authors/slice";
import subscriptionsReducer from "./subscriptions/slice";
import favoritesReducer from "./favorites/slice";
import modalReducer from "./modal/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    articles: articlesReducer,
    authors: authorsReducer,
    subscriptions: subscriptionsReducer,
    favorites: favoritesReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
