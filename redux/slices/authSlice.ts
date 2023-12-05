import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    user?: any,
    token?: string,
}

const initAuthState: AuthState = {
    user: undefined,
    token: undefined,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initAuthState,
    reducers: {
        signOut: () => {
            return initAuthState;
        },
        signIn: (state, payload: PayloadAction<AuthState>) => {
            return {
                ...payload.payload,
            };
        },
    },
});


export const { signIn, signOut } = authSlice.actions;

export default authSlice;
