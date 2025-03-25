import { baseApi } from "../../baseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAnalytics: build.query({
      query: () => ({
        url: "/analytics-log",
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),
    deleteAnalytics: build.mutation({
      query: (id: string) => ({
        url: `/analytics-log/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Analytics"],
    }),
    createAnalytics: build.mutation({
      query: (data: any) => {
        return {
          url: "/analytics-log",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Analytics"],
    }),
  }),
});
export const {
  useCreateAnalyticsMutation,
  useDeleteAnalyticsMutation,
  useGetAllAnalyticsQuery,
} = analyticsApi;
