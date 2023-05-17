import { authApi } from "../API/apiService";

export const genresApiSlice = authApi.injectEndpoints({
    endpoints: (builder) => ({
        getGenres: builder.query({
            query: () => "/genre/movie/list"
        }),
        getTvGenres: builder.query({
            query: () => "/genre/tv/list"
        }),
    }),
});

export const { useGetGenresQuery, useGetTvGenresQuery } = genresApiSlice;