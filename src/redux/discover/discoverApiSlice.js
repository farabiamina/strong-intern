import { authApi } from "../API/apiService";

export const discoverApiSlice = authApi.injectEndpoints({
    endpoints: (builder) => ({
        getDiscover: builder.query({
            query: ({ type, sort_by, release_year, with_genres, page }) => {
                let queryString = `/discover/${type}?sort_by=${sort_by}`;

                if (release_year) {
                    queryString += `&primary_release_year=${release_year}`;
                }

                if (with_genres.length > 0) {
                    queryString += `&with_genres=${with_genres.join(",")}`;
                }

                queryString += `&page=${page}`;

                return queryString;
            },
        }),
    }),
});

export const { useGetDiscoverQuery } = discoverApiSlice;