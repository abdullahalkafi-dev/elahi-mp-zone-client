import { baseApi } from "../../baseApi";

const newsLetterApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createNewsLetter: build.mutation({
      query: (data) => ({
        url: "/news-letter",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["NewsLetter"],
    }),
    getAllNewsLetter: build.query({
      query: () => ({
        url: "/news-letter",
        method: "GET",
      }),
      providesTags: ["NewsLetter"],
    })
  }),
});
export const { useCreateNewsLetterMutation, useGetAllNewsLetterQuery } = newsLetterApi;