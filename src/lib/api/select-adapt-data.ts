import { createSelector } from "@reduxjs/toolkit";
import { Option, OptionWithId } from "@client/types/option-data";
import { v4 } from "uuid";
import { selectedSelector } from "./get-selected-data-api";

export const selectAdaptData = createSelector(
  selectedSelector,
  (optionsData) => {
    if (optionsData.isSuccess) {
      const { data } = optionsData;
      const filteredData = data.filter((item): item is Option & {
        name: string;
        value: string
      } => !!item.name?.trim() && !!item.value?.trim());

      const adaptedData = filteredData.map(({value, name}): OptionWithId => {
        const id = v4();

        return {
          id,
          name: name,
          value: value
        };
      });

      return adaptedData;
    }
      
    return [];
  }
);