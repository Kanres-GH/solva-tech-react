import { createSlice , PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isLoggedOn: boolean;
}

const initialState: AuthState = {
    isLoggedOn: false,
};

const authSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string; password: string }>) => {
            const { username, password } = action.payload;
            if (username === 'admin' && password === 'password') {
                state.isLoggedOn = true;
            }
        },
        logout: (state) => {
            state.isLoggedOn = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;