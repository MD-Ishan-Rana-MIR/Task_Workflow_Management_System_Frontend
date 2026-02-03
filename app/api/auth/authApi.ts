import { baseApi } from "../baseApi/baseApi"



export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registration: builder.mutation({
            query: (data) => ({
                url: `/auth/registration`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["User"]
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `/auth/login`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["User"]
        }),
        allUser: builder.query({
            query: () => ({
                url: `/auth/all-users`,
                method: "GET"
            }),
            providesTags: ["User"]
        })
    }),
})

export const {
    useRegistrationMutation,
    useLoginMutation,
    useAllUserQuery

} = authApi
