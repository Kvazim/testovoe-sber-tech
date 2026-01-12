import { useState, useRef, useMemo } from "react";
import { OptionDataWithId } from "@client/types/option-data";

import style from "./style.module.css";
import { SelectControl } from "../select-control/select-control";
import { OptionList } from "../option-list/option-list";
import { useKeyboardNavigation } from "./hooks/use-keyboard-navigation";

type CustomSelectProps = {
  options: OptionDataWithId;
}

function CustomSelect({ options }: CustomSelectProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
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
      <OptionList 
        isOpen={isOpen} 
        options={filteredOptions} 
        isActiveIndex={isActiveIndex} 
        query={query} 
      />
    </div>
  );
}

export { CustomSelect };
