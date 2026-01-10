import { useState, KeyboardEvent, useRef, useEffect, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { OptionData } from "@client/types/option-data";

import style from "./style.module.css";

type CustomSelectProps = {
  options: OptionData;
}

function CustomSelect({ options }: CustomSelectProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isActiveIndex, setIsActiveIndex] = useState<number | null>(null);

  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRef = useRef<HTMLDivElement>(null);

  const handleOpenSelect = () => {
    setIsOpen(true);
  };

  const handleCloseSelect = () => {
    setIsOpen(false);
  };

  const handleToogleSelect = () => {
    isOpen ? handleCloseSelect() : handleOpenSelect();
  };

  const getSelectedIndex = () => {
    const index = options.findIndex(({value}) => value === query);
    return index >= 0 ? index : null;
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    } else if (!isOpen && selectRef.current) {
      selectRef.current.blur();
    }
  }, [isOpen]);

  useEffect(() => {
    const handlerClickEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseSelect();
      }
    };

    document.addEventListener("keydown", handlerClickEscape);

    return () => {
      document.removeEventListener("keydown", handlerClickEscape);
    };
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (selectRef.current && !selectRef.current.contains(target)) {
        handleCloseSelect();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          handleCloseSelect();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDownArrow);

    return () => {
      document.removeEventListener("keydown", handleKeyDownArrow);
    };
  }, [isOpen, options.length, isActiveIndex]);

  const handleClear = () => {
    setQuery('');
    setIsActiveIndex(null);
  }

  const handleClearKeyDown = (evt: KeyboardEvent<HTMLSpanElement>) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      handleClear();
    }
  };

  const handleOpenSelectKeyDown = (evt: KeyboardEvent<HTMLSpanElement>) => {
    if (evt.key === "Enter") {
      evt.preventDefault();

      handleToogleSelect();
    }
  };

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
      className={`${style.select} ${isOpen ? style.open : ''}`}
    >
      <div className={style.selectControl}>
        <input
          ref={inputRef}
          type="text"
          name="select"
          value={query}
          tabIndex={-1}
          autoComplete="off"
          onChange={(e) => setQuery(e.target.value)}
          onClick={handleOpenSelect}
        />
        {
          query &&
          <span
            className={style.clear}
            tabIndex={0}
            onClick={handleClear}
            onKeyDown={handleClearKeyDown}
          />
        }
        <span
          className={`${style.arrow} ${isOpen ? style.open : ''}`}
          tabIndex={0}
          onClick={handleToogleSelect}
          onKeyDown={handleOpenSelectKeyDown}
        />
      </div>
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