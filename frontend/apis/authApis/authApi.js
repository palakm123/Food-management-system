import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000"
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data
            })
        }),

         signUp: builder.mutation({
            query: (data) => ({
                url: "/signUp",
                method: "POST",
                body: data
            })
        })


    })
})
export const{useLoginMutation,useSignUpMutation}=authApi