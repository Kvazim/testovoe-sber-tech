import { OptionData } from "@client/types/option-data";
import { baseApi } from "@lib/api/base-api";
import { ROUTES } from "@lib/const/const";
import { addAppMiddleware, reducer } from "@lib/redux/redux";

export const getSelectedDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSelectedOptions: builder.query<OptionData, void>({
      query: () => ROUTES.OPTIONS,
    }),
  })
});

reducer.inject(getSelectedDataApi);

addAppMiddleware(getSelectedDataApi.middleware);

export const { useGetSelectedOptionsQuery } = getSelectedDataApi;

export const selectedSelector = getSelectedDataApi.endpoints.getSelectedOptions.select();
