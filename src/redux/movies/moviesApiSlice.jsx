import { authApi } from "../API/apiService";

export const moviesApiSlice = authApi.injectEndpoints({
    endpoints: (builder) => ({
        getNowPlayingMovies: builder.query({
            query: (page) => "/movie/now_playing?page=" + page
        }),
        getTopRatedMovies: builder.query({
            query: (page) => "/movie/top_rated?page=" + page
        }),
        getPopularMovies: builder.query({
            query: (page) => "/movie/popular?page=" + page
        }),
        getUpcomingMovies: builder.query({
            query: (page) => "/movie/upcoming?page=" + page
        })
    }),
});

export const {
    useGetNowPlayingMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetPopularMoviesQuery,
    useGetUpcomingMoviesQuery,
} = moviesApiSlice;