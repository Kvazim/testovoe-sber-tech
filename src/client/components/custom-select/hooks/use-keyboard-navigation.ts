import { OptionDataWithId } from "@client/types/option-data";
import { Dispatch, SetStateAction, useEffect } from "react";
type UseKeyboardNavigationProps = {
  options: OptionDataWithId;
  query: string;
  isOpen: boolean;
  onChangeActiveIndex: Dispatch<SetStateAction<number | null>>;
  onChangeQuery: Dispatch<SetStateAction<string>>;
  activeIndex: number | null;
  onChangeOpen: Dispatch<SetStateAction<boolean>>;
}

function useKeyboardNavigation({ options, query, isOpen, onChangeActiveIndex, activeIndex, onChangeQuery, onChangeOpen }: UseKeyboardNavigationProps) {
  const getSelectedIndex = () => {
    const index = options.findIndex(({ value }) => value === query);
    return index >= 0 ? index : null;
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDownArrow = (event: globalThis.KeyboardEvent) => {
      const moveIndex = (direction: "up" | "down") => {
        onChangeActiveIndex((prev) => {
          const selectedIndex = prev !== null ? prev : getSelectedIndex();

          if (selectedIndex === null) {
            return direction === "down" ? 0 : options.length - 1;
          } else {
            if (direction === "down") {
              return selectedIndex >= options.length - 1 ? selectedIndex : selectedIndex + 1;
            } else {
              return selectedIndex <= 0 ? selectedIndex : selectedIndex - 1;
            }
          }
        });
      };

      if (event.key === "ArrowDown") {
        moveIndex("down");
      }

      if (event.key === "ArrowUp") {
        moveIndex("up");
      }

      if (event.key === "Enter") {
        event.preventDefault();

        if (activeIndex !== null) {
          onChangeQuery(options[activeIndex].value);
          onChangeActiveIndex(null);
          onChangeOpen(false);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDownArrow);

    return () => {
      document.removeEventListener("keydown", handleKeyDownArrow);
    };
  }, [isOpen, options.length, activeIndex, onChangeActiveIndex, options, query]);
}

export { useKeyboardNavigation };
