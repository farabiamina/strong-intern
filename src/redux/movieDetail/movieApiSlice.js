import { authApi } from "../API/apiService";

export const movieApiSlice = authApi.injectEndpoints({
    endpoints: (builder) => ({
        getMovieDetails: builder.query({
            query: (id) => "/movie/" + id
        }),
        getMovieCredits: builder.query({
            query: (id) => "/movie/" + id + "/credits"
        }),
        getMovieVideos: builder.query({
            query: (id) => "/movie/" + id + "/videos"
        }),
        getSimilarMovies: builder.query({
            query: (id) => "/movie/" + id + "/similar"
        }),
        rateMovie: builder.mutation({
            query: ({id, rating}) => ({
                url: "/movie/" + id,
                method: "POST",
                body: rating,
            }),
        })
    }),
});

export const {
    useGetMovieDetailsQuery,
    useGetMovieCreditsQuery,
    useGetMovieVideosQuery,
    useGetSimilarMoviesQuery,
    useRateMovieMutation,
} = movieApiSlice;