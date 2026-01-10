import { useEffect, useRef, KeyboardEvent, ChangeEvent } from "react";
import style from "./style.module.css";
import { useFocusOpen } from "./hooks/useFocusOpen";
import { on } from "cluster";
import { useCloseOnEscapeOrOutside } from "./hooks/use-close-on-escape-or-outside";

type SelectControlProps = {
  isOpen: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  inputValue: string;
  onChangeInput: (value: string) => void;
  rootContains?: HTMLElement | null;
  onClearInput: () => void;
}

function SelectControl({ isOpen, onChangeOpen, inputValue, onChangeInput, rootContains, onClearInput }: SelectControlProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenSelect = () => {
    onChangeOpen(true);
  };

  const handleCloseSelect = () => {
    onChangeOpen(false);
  };

  const handleToogleSelect = () => {
    onChangeOpen(!isOpen);
  };

  const handleClearKeyDown = (evt: KeyboardEvent<HTMLSpanElement>) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      onClearInput();
    }
  };

  const handleOpenSelectKeyDown = (evt: KeyboardEvent<HTMLSpanElement>) => {
    if (evt.key === "Enter") {
      evt.preventDefault();

      handleToogleSelect();
    }
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    onChangeInput(evt.target.value);
  }

  useFocusOpen(isOpen, inputRef);
  useCloseOnEscapeOrOutside(isOpen, handleCloseSelect, rootContains);

  return (
    <div className={`${style.selectControl} ${isOpen ? style.open : ''}`}>
      <input
        ref={inputRef}
        type="text"
        name="select"
        value={inputValue}
        tabIndex={-1}
        autoComplete="off"
        onChange={handleInputChange}
        onClick={handleOpenSelect}
      />
      {
        inputValue &&
        <span
          className={style.clear}
          tabIndex={0}
          onClick={onClearInput}
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
  );
}

export { SelectControl };
