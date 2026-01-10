import { BASE_URL, REQUEST_TIMEOUT } from '@lib/const/const';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const createBaseQuery = () => fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },

  timeout: REQUEST_TIMEOUT
});