import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: data,
      }),
      refetchOnMount: true,
      inavlidateTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: `/user/logout`,
        method: "POST",
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
    getTotalUsers: builder.query({
      query: () => ({
        url: `/user/total-users`,
        method: "GET",
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `/user/users`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useGetTotalUsersQuery,
  useGetUsersQuery,
} = userApi;
