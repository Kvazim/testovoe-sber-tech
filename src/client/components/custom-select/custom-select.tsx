import { useState, useRef, useMemo, Dispatch, SetStateAction } from "react";
import { OptionDataWithId, OptionWithId } from "@client/types/option-data";
import { SelectControl } from "../select-control/select-control";
import { OptionList } from "../option-list/option-list";
import { useKeyboardNavigation } from "./hooks/use-keyboard-navigation";
import { DIRECTION_SELECT } from "@lib/const/const";
import { DirectionSelect } from "@client/types/direction";
import { useDirectionOptionList } from "./hooks/use-direction-option-list";

import style from "./style.module.css";

type CustomSelectProps = {
  options: OptionDataWithId;
  selectedValue: string;
  setSelectedValue: Dispatch<SetStateAction<string>>;
}

function CustomSelect({ options, selectedValue: query, setSelectedValue: setQuery }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState<DirectionSelect>(DIRECTION_SELECT.DOWN);
  const [isActiveIndex, setIsActiveIndex] = useState<number | null>(null);

  const selectRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => options.filter(option => option.value.toLowerCase().includes(query.toLowerCase())), [options, query]);

  const handleClear = () => {
    setQuery('');
    setIsActiveIndex(null);
  }

  useKeyboardNavigation({ 
    options: filteredOptions, 
    query, 
    isOpen, 
    onChangeActiveIndex: setIsActiveIndex, 
    activeIndex: isActiveIndex,
    onChangeQuery: setQuery,
    onChangeOpen: setIsOpen
  });

  useDirectionOptionList({ isOpen, selectRef, setDirection });

  const handleOptionItemClick = (value: OptionWithId['value']) => {
    setQuery(value);
    setIsActiveIndex(null);
    setIsOpen(false);
  }

  return (
    <div
      ref={selectRef}
      className={`${style.select} ${direction === DIRECTION_SELECT.UP ? style.up : style.down}`}
    >
      <SelectControl 
        isOpen={isOpen} 
        onChangeOpen={setIsOpen} 
        inputValue={query} 
        onChangeInput={setQuery} 
        rootContains={selectRef.current} 
        onClearInput={handleClear} 
      />
      <OptionList 
        isOpen={isOpen} 
        options={filteredOptions} 
        isActiveIndex={isActiveIndex} 
        query={query} 
        handleOptionItemClick={handleOptionItemClick}
      />
    </div>
  );
}

export { CustomSelect };
