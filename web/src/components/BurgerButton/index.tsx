import React from "react";
import "./BurgerButton.scss";

interface BurgerButtonProps {
  open: boolean;
  onToggle: () => void;
  className?: string;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({
  open,
  onToggle,
  className,
}) => (
  <button
    type="button"
    aria-label={open ? "Close menu" : "Open menu"}
    aria-expanded={open}
    aria-pressed={open}
    className={["burger", open && "open", className].filter(Boolean).join(" ")}
    onClick={onToggle}
  >
    <span />
    <span />
    <span />
  </button>
);

export default BurgerButton;
