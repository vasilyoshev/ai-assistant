import { Balance, PicturesRequest, PicturesResponse, User } from "interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.query<User, void>({
      query: () => "user/account",
    }),
    getBalance: builder.query<Balance, void>({
      query: () => "user/balance",
    }),
    generatePics: builder.mutation<PicturesResponse, PicturesRequest>({
      query: (body) => ({
        url: "generate",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetUserInfoQuery, useGetBalanceQuery, useGeneratePicsMutation } = api;
