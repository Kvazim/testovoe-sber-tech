import { baseApi } from "@lib/api/base-api";
import { ROUTES } from "@lib/const/const";
import { addAppMiddleware, reducer } from "@lib/redux/redux";

export const addSelectedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSelectedOption: builder.mutation({
      query: ({ ...body }) => ({
        url: ROUTES.SELECTED,
        method: 'POST',
        body,
      }),
    }),
  })
});

reducer.inject(addSelectedApi);

addAppMiddleware(addSelectedApi.middleware);

export const { useAddSelectedOptionMutation } = addSelectedApi;
