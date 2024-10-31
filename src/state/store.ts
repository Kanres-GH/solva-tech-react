import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from "./counter/counterSlice";
import loginReducer from './counter/loginSlice'

export const store = configureStore({
    reducer: {
        login: loginReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;