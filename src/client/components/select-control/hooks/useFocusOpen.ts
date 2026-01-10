import { RefObject, useEffect } from "react";

function useFocusOpen<T extends HTMLElement | null>(isOpen: boolean, targetElement: RefObject<T>) {
    useEffect(() => {
      if (!targetElement.current) return;
      
      if (isOpen) {
        targetElement.current.focus();
      } else {
        targetElement.current.blur();
      }
    }, [isOpen, targetElement]);
}

export { useFocusOpen };
