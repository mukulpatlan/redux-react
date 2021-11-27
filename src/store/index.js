import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from './counter.js';
import AuthReducer from './auth.js';

const store = configureStore({
    reducer: {
        counter: CounterReducer,
        auth: AuthReducer
    }
});


export default store;