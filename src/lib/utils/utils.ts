import { RefObject } from "react";

export const getTargetForm = (form: string | undefined, ref: RefObject<HTMLDivElement | null>): HTMLFormElement | null | undefined => {
  if (form) {
    const el = document.getElementById(form);
    return el instanceof HTMLFormElement ? el : null;
  } else {
    return ref.current?.closest("form");
  }
};
