import { useState, useRef, useEffect, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { OptionData } from "@client/types/option-data";

import style from "./style.module.css";
import { SelectControl } from "../select-control/select-control";

type CustomSelectProps = {
  options: OptionData;
}

function CustomSelect({ options }: CustomSelectProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isActiveIndex, setIsActiveIndex] = useState<number | null>(null);

  const selectRef = useRef<HTMLDivElement>(null);
  const optionRef = useRef<HTMLDivElement>(null);

  const handleClear = () => {
    setQuery('');
    setIsActiveIndex(null);
  }

  const getSelectedIndex = () => {
    const index = options.findIndex(({value}) => value === query);
    return index >= 0 ? index : null;
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDownArrow = (event: globalThis.KeyboardEvent) => {
      const moveIndex = (direction: "up" | "down") => {
        setIsActiveIndex((prev) => {
          const selectedIndex = prev !== null ? prev : getSelectedIndex();
          
          if (selectedIndex === null) {
            return direction === "down" ? 0 : options.length - 1;
          } else {
            if (direction === "down") {
              return selectedIndex >= options.length - 1 ? 0 : selectedIndex + 1;
            } else {
              return selectedIndex <= 0 ? options.length - 1 : selectedIndex - 1;
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

        if (isActiveIndex !== null) {
          setQuery(options[isActiveIndex].value);
          setIsActiveIndex(null);
          setIsOpen(false);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDownArrow);

    return () => {
      document.removeEventListener("keydown", handleKeyDownArrow);
    };
  }, [isOpen, options.length, isActiveIndex]);

  const getItemKey = useCallback(
    (index: number) => options[index].name,
    [options]
  );

  const rowVirtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => optionRef.current,
    estimateSize: () => 15,
    measureElement: (el) => el.getBoundingClientRect().height,
    getItemKey,
    gap: 5,
  });

  useEffect(() => {
    if (
      isActiveIndex !== null &&
      isOpen &&
      options.length > 0 &&
      isActiveIndex < options.length
    ) {
      rowVirtualizer.scrollToIndex(isActiveIndex, { align: 'auto' });
    }
  }, [isActiveIndex, isOpen, options.length, rowVirtualizer]);

  return (
    <div
      ref={selectRef}
      className={style.select}
    >
      <SelectControl 
        isOpen={isOpen} 
        onChangeOpen={setIsOpen} 
        inputValue={query} 
        onChangeInput={setQuery} 
        rootContains={selectRef.current} 
        onClearInput={handleClear} 
      />
      <div className={`${style.options} ${isOpen ? '' : style.visuallyHidden}`} ref={optionRef}>
        <ul
          className={style.optionsList}
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
        >
          {
            rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const item = options[virtualRow.index];

              return (
                <li
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  key={item.name}
                  className={`${style.optionsItem} ${isActiveIndex === virtualRow.index ? style.hover : ''} ${query === item.value ? style.selected : ''}`}
                >
                  {item.value}
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
}

export { CustomSelect };