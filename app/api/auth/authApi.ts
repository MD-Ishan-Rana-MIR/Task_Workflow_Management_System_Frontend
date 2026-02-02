import { baseApi } from "../baseApi/baseApi"



export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registration : builder.mutation({
        query : (data)=>({
            url : `/auth/registration`,
            method : "POST",
            body : data
        }),
        invalidatesTags : ["User"]
    })
  }),
})

export const {
    useRegistrationMutation
  
} = authApi
