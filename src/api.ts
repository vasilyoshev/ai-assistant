import { Balance, PicturesRequest, PicturesResponse, User } from "interfaces";
import { FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockGenerate } from "mocks";
import { RootState } from "store";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getBalance: builder.query<Balance, void>({
      query: () => "user/balance",
    }),
    generatePics: builder.mutation<PicturesResponse, PicturesRequest>({
      queryFn: async (body, queryApi, extraOptions, baseQuery) => {
        const { app } = queryApi.getState() as RootState;

        if (app.mocksEnabled) {
          return { data: mockGenerate as PicturesResponse };
        } else {
          return (await baseQuery({
            url: "generate",
            method: "POST",
            body,
          })) as QueryReturnValue<PicturesResponse, FetchBaseQueryError>;
        }
      },
    }),
  }),
});

export const { useGetBalanceQuery, useGeneratePicsMutation } = api;
