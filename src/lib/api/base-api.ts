import { createApi } from '@reduxjs/toolkit/query/react';
import { NameSpace } from '../const/const';
import { createBaseQuery } from './base-query';

export const baseApi = createApi({
  baseQuery: createBaseQuery(),
  endpoints: () => ({}),
});