import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {logout, setCredentials} from "../sessionSlice";

const baseQuery = fetchBaseQuery({
    // base url of backend API
    baseUrl: 'https://api.themoviedb.org/3/',
    prepareHeaders: (headers, { getState }) => {
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTA4MzgzZmNlY2ExMWIxNjRhYTE2ZWFiZmFjNTllZiIsInN1YiI6IjY0NWU2MmQ4ZjkwYjE5MDBlNGM3YjNiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P17QeuciB-ZHjUT2W0M1XsCVxPjoXC9v1mDjr8RwkkU";
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json;charset=utf-8');
        headers.set('accept', 'application/json');
        return headers;
    },
});

// const baseQueryWithRefresh = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions);
//     return result;
// };

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQuery,
    endpoints: builder => ({}),
});