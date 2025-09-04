import React from "react";
import "./PrimaryButton.scss";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...rest }) => (
  <button className="primary-btn" {...rest}>
    {children}
  </button>
);

export default PrimaryButton;
