import { baseApi } from "@lib/api/base-api";
import { ROUTES } from "@lib/const/const";
import { addAppMiddleware, reducer } from "@lib/redux/redux";

export const selectedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSelectedOptions: builder.query({
      query: () => ROUTES.OPTIONS,
    }),
  })
});

reducer.inject(selectedApi);

addAppMiddleware(selectedApi.middleware);

export const { useGetSelectedOptionsQuery } = selectedApi;