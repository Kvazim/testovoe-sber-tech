import { useRef } from "react";
import style from "./style.module.css";
import { OptionData } from "@client/types/option-data";
import { useVirtualOptions } from "./hooks/use-virtual-options";
import { useScrollToActive } from "./hooks/use-scroll-to-active";

type OptionListProps = {
  options: OptionData;
  isActiveIndex: number | null;
  query: string;
  isOpen: boolean;
}

function OptionList({ options, isActiveIndex, query, isOpen }: OptionListProps) {
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
  );
}

export { OptionList };
