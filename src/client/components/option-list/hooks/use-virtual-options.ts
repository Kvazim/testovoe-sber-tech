import { OptionDataWithId } from "@client/types/option-data";
import { useVirtualizer } from "@tanstack/react-virtual";
import { RefObject, useCallback } from "react";

function useVirtualOptions(options: OptionDataWithId, targetRef: RefObject<HTMLDivElement | null>) {
    const getItemKey = useCallback(
      (index: number) => options[index].id,
      [options]
    );
  
  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLLIElement>({
      count: options.length,
      getScrollElement: () => targetRef.current,
      estimateSize: () => 15,
      measureElement: (el) => el.getBoundingClientRect().height,
      getItemKey,
      gap: 5,
    });

    return { rowVirtualizer };
}

export { useVirtualOptions };
