import { useEffect } from "react";

function useCloseOnEscapeOrOutside(isOpen: boolean, onClose: () => void, targetElement: HTMLElement | null | undefined) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (targetElement && !targetElement.contains(target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, targetElement]);
}

export { useCloseOnEscapeOrOutside };