import { baseApi } from "../../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userLogin : builder.mutation({
      query: (data) => {
        return {
          url: "/user/login",
          method: "POST",
          body: data,
        };
      },
    }),
    userEmailSignUp: builder.mutation({
      query: (data) => {
        return {
          url: "/user/email-signup",
          method: "POST",
          body: data,
        };
      },
    }),

    getMe: builder.query({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    getAllUsers: builder.query({
      query: (query) => {
        return {
          url: query ? `/user/?${query}` : "/user",
          method: "GET",
        };
      },
      providesTags: ["Users"],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => {
        return {
          url: `/user/update-role/${id}/${role}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: `/user/${data.id}`,
          method: "PUT",
          body: data?.data,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Users", id },
        "Users",
      ],
    }),
    getRoleBasedUser: builder.query({
      query: (query) => {
        return {
          url: query ? `/user/role-based-user/${query}` : "/user",
          method: "GET",
        };
      },
      providesTags: ["Users"],
    }),
  }),
});
export const {
  useGetMeQuery,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserMutation,
  useGetRoleBasedUserQuery,
  useUserLoginMutation,
  useUserEmailSignUpMutation,
} = userApi;
