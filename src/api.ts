import { Balance, GenerationRequest, GenerationResponse, User } from "interfaces";
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
    getOriginalPic: builder.mutation<GenerationResponse, GenerationRequest>({
      query: (body) => ({
        url: "generation/stable-diffusion-xl-1024-v1-0/text-to-image",
        method: "POST",
        body,
      }),
    }),
    getMaskedPic: builder.mutation<GenerationResponse, FormData>({
      query: (body) => ({
        url: "generation/stable-diffusion-xl-1024-v1-0/image-to-image/masking",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetUserInfoQuery, useGetBalanceQuery, useGetOriginalPicMutation, useGetMaskedPicMutation } = api;
