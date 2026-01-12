import { HTMLAttributes, ReactNode } from "react";

type UiMessageOwnProps = {
  children: ReactNode;
}

type UiMessageProps = UiMessageOwnProps &
  Omit<HTMLAttributes<HTMLParagraphElement>, keyof UiMessageOwnProps>;

function UiMessage({children, ...props}: UiMessageProps) {
  return (
    <p {...props}>{children}</p>
  );
}

export { UiMessage };
