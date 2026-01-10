import { Virtualizer } from "@tanstack/react-virtual";
import { useEffect } from "react";

function useScrollToActive(
  virtualizer: Virtualizer<HTMLDivElement, HTMLLIElement>,
  isActiveIndex: number | null,
  isOpen: boolean,
  optionsLength: number
) {
  useEffect(() => {
    if (
      isActiveIndex !== null &&
      isOpen &&
      optionsLength > 0 &&
      isActiveIndex < optionsLength
    ) {
      virtualizer.scrollToIndex(isActiveIndex, { align: 'auto' });
    }
  }, [isActiveIndex, isOpen, optionsLength, virtualizer]);
}

export { useScrollToActive };
