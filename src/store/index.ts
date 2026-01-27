import { configureStore } from "@reduxjs/toolkit";
import formReducer  from './formSlice';
export const store = configureStore({
reducer: {
    userForm: formReducer,
}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;