import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ContactApi = createApi({
  reducerPath: "ContactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://contact-app.mmsdev.site/api/v1",
  }),
  tagTypes: ["contactApi"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["contactApi"],
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["contactApi"],
    }),
    getProfile: builder.query({
      query: (token) => `/user-profile/${token}`,
      providesTags:['contactApi']
    }),
    logOut:builder.mutation({
      query:(id)=>({
        url:`/user-logout/${id}`,
        method:"POST",
      }),
      invalidatesTags:['contactApi']
    })
  }),
});

export const { useRegisterMutation,useLoginMutation,useGetProfileQuery,useLogOutMutation }=ContactApi