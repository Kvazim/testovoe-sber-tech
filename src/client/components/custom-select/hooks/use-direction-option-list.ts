import { DirectionSelect } from "@client/types/direction";
import { DIRECTION_SELECT } from "@lib/const/const";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

type DirectionOptionListParams = {
  isOpen: boolean;
  selectRef: RefObject<HTMLDivElement | null>;
  setDirection: Dispatch<SetStateAction<DirectionSelect>>;
}

function useDirectionOptionList({ isOpen, selectRef, setDirection }: DirectionOptionListParams) {
  useEffect(() => {
    if (!isOpen || !selectRef.current) return;

    const rect = selectRef.current.getBoundingClientRect();
    const spaceBottom = window.innerHeight - rect.bottom;
    const newDirection = spaceBottom <= 250 ? DIRECTION_SELECT.UP : DIRECTION_SELECT.DOWN;
    setDirection(newDirection);
  }, [isOpen]);
 }

 export { useDirectionOptionList };
