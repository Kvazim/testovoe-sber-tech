import { RefObject } from "react";

export const generateOptions = () => {
  return Array.from({ length: 1000 }, (_, i) => {
    const value = String(i + 1);
    return { name: value, value };
  });
};

export const getTargetForm = (form: string | undefined, ref: RefObject<HTMLDivElement | null>): HTMLFormElement | null | undefined => {
  if (form) {
    const el = document.getElementById(form);
    return el instanceof HTMLFormElement ? el : null;
  } else {
    return ref.current?.closest("form");
  }
};