import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ContactApi = createApi({
  reducerPath: "ContactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://contact-app.mmsdev.site/api/v1",
  }),
  tagTypes: ["contentApi"],
  endpoints: (builder) => ({
    getContact: builder.query({
      query: (token) => ({
        url: "/contact",
        method: "GET",
        headers: { authorization: `Bearer ${token}` }
      }),
      providesTags:['contentApi']
    }),
  }),
});

export const {useGetContactQuery} = ContactApi;
