const { createSlice } = require("@reduxjs/toolkit");

const initial = { isAuthenticated: false };

const authSlice = createSlice({
    name: 'Auth',
    initialState: initial,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;