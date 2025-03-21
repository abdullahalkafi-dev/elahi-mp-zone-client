import { baseApi } from "../../baseApi";

const managementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllManagements: build.query({
      query: () => ({
        url: "/management",
        method: "GET",
      }),
      providesTags: ["Managements"],
    }),
    updateManagements: build.mutation({
      query: ({ id, data }) => {
        console.log("inside, ", data)
        return {
          url: `/management/${id}`,
          method: "PATCH",
          body: {...data}
        }
      },
      invalidatesTags: ["Managements"]
    })
  }),
});
export const { useGetAllManagementsQuery, useUpdateManagementsMutation } = managementApi;