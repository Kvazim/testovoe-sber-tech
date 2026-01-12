import { createSelector } from "@reduxjs/toolkit";
import { selectedSelector } from "./selected-api";
import { Option } from "@client/types/option-data";
import { v4 } from "uuid";

export const selectAdaptData = createSelector(
  selectedSelector,
  (data) => {
    if (data.isSuccess) {
      const adaptedData = data.data.filter(({ name, value }: Option) => name && value).map((item: Option) => {
        if (!item.id) {
          return {
            ...item,
            id: v4(),
          };
        }
      });

      return adaptedData;
    }
      
    return [];
  }
);