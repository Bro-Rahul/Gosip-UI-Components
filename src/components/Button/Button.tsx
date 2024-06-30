import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode | ReactNode[];
}

const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <button
      style={{ padding: '1em' }}
      {...props} // Spread props to pass down other button attributes
    >
      {children}
    </button>
  );
};

export default Button;