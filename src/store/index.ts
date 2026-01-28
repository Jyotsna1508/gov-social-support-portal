import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage"; // localStorage

// Config for persistence
const persistConfig = {
  key: "form",
  storage,
  whitelist: ["activeStep", "data"], // only persist these keys
};

// Wrap your reducer
const persistedFormReducer = persistReducer(persistConfig, formReducer);

// Configure store
export const store = configureStore({
  reducer: {
    form: persistedFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist requires ignoring these action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
