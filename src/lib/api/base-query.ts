import { BASE_URL, REQUEST_TIMEOUT } from '@lib/const/const';
import { getBaseUrl } from '@lib/utils/utils';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const createBaseQuery = () => fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },

  timeout: REQUEST_TIMEOUT
});
