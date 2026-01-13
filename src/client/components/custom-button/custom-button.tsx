import { ReactNode, useRef, MouseEventHandler, KeyboardEventHandler, HTMLAttributes } from "react";
import style from "./style.module.css";
import { BUTTON_TYPES } from "@lib/const/const";
import { getTargetForm } from "@lib/utils/utils";

type CustomButtonOwnProps = {
  children: ReactNode;
  type?: typeof BUTTON_TYPES[keyof typeof BUTTON_TYPES];
  disabled?: boolean;
  form?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}

type CustomButtonProps = CustomButtonOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof CustomButtonOwnProps>;

function CustomButton({ type=BUTTON_TYPES.BUTTON, disabled=false, form, onClick, onKeyDown, children, ...props}: CustomButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null);

  const handleButtonClick: MouseEventHandler<HTMLDivElement> = (evt) => {
    if (type === BUTTON_TYPES.RESET || type === BUTTON_TYPES.SUBMIT) {
      const targetForm = getTargetForm(form, btnRef);

      if (type === BUTTON_TYPES.RESET) {
        if (targetForm) {
          targetForm.reset();
          return;
        }
      }

      if (type === BUTTON_TYPES.SUBMIT) {
        if (targetForm) {
          targetForm.requestSubmit();
          return;
        }
      }
    }

    onClick?.(evt);
  }

  const handleButtonKeyDownClick: KeyboardEventHandler<HTMLDivElement> = (evt) => {
    if (evt.key === "Enter" || evt.key === ' ') {
      btnRef.current?.click();
    }

    onKeyDown?.(evt)
  }

  return (
    <div
      className={`${style.button} ${disabled ? style.disabled : '' }`}
      tabIndex={disabled ? -1 : 0}
      role="button"
      ref={btnRef}
      onClick={handleButtonClick}
      onKeyDown={handleButtonKeyDownClick}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </div>
  );
}

export {CustomButton};
