import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.scss";

interface BackButtonProps {
  fallbackPath?: string; // path to go if no history
  className?: string;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  fallbackPath = "/",
  className,
  label = "Back",
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    // Attempt history back; if same page, navigate fallback
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={["back-btn", className].filter(Boolean).join(" ")}
      aria-label={label}
    >
      <span className="back-btn__icon" aria-hidden>
      </span>
      <span className="back-btn__label">{label}</span>
    </button>
  );
};

export default BackButton;
