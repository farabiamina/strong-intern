import { authApi } from "./apiService";

export const authApiSlice = authApi.injectEndpoints({
    endpoints: (builder) => ({
        getSessionId: builder.query({
            query: () => ({
                url: "/authentication/guest_session/new",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetSessionIdQuery } = authApiSlice;
