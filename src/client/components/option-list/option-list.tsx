import { Dispatch, SetStateAction, useRef } from "react";
import style from "./style.module.css";
import { OptionDataWithId, OptionWithId } from "@client/types/option-data";
import { useVirtualOptions } from "./hooks/use-virtual-options";
import { useScrollToActive } from "./hooks/use-scroll-to-active";

type OptionListProps = {
  options: OptionDataWithId;
  isActiveIndex: number | null;
  query: string;
  isOpen: boolean;
  handleOptionItemClick: (value: OptionWithId['value']) => void;
}

function OptionList({ options, isActiveIndex, query, isOpen, handleOptionItemClick }: OptionListProps) {
  const optionRef = useRef<HTMLDivElement>(null);

  const { rowVirtualizer } = useVirtualOptions(options, optionRef);

  useScrollToActive(
    rowVirtualizer,
    isActiveIndex,
    isOpen,
    options.length
  );

  return (
    <div className={`${style.options} ${isOpen ? '' : style.visuallyHidden}`} ref={optionRef}>
      <ul
        className={style.optionsList}
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {
          rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const { id, name, value } = options[virtualRow.index];

            return (
              <li
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                key={id}
                data-name={name}
                className={`${style.optionsItem} ${isActiveIndex === virtualRow.index ? style.hover : ''} ${query === value ? style.selected : ''}`}
                onClick={() => handleOptionItemClick(value)}
              >
                {value}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export { OptionList };
