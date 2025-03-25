import { baseApi } from "../../baseApi";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFeedback: build.mutation({
      query: (data) => ({
        url: "/feedback",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Feedback"],
    }),
    toggleFeedback: build.mutation({
      query: (id) => ({
        url: `/feedback/${id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: ["Feedback"],
    }),
    getAllFeedbacks: build.query({
      query: () => ({
        url: "/feedback",
        method: "GET",
      }),
      providesTags: ["Feedback"],
    })
  }),
});

export const { 
  useCreateFeedbackMutation, 
  useToggleFeedbackMutation, 
  useGetAllFeedbacksQuery 
} = feedbackApi;