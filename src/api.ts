import {
  Balance,
  GenerationRequest,
  GenerationResponse,
  MaskingRequest,
  User,
} from "interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.stability.ai/v1/",
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        `Bearer sk-xRwOzr8D6m8M3zuDLIoYYz167iPSnfRreHSHjhHI5XimDcdP`,
      );

      return headers;
    },
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

export const {
  useGetUserInfoQuery,
  useGetBalanceQuery,
  useGetOriginalPicMutation,
  useGetMaskedPicMutation,
} = api;
