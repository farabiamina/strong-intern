import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from "./sessionSlice";
import { authApi } from './API/apiService';

const store = configureStore({
    reducer: {
        auth: sessionReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
    devTools: true,
});

export default store;