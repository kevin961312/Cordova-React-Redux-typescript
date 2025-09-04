import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navRoutes, routes } from "../../routes/routes";
import BurgerButton from "../BurgerButton/index";
import BackButton from "../BackButton";
import "./Header.scss";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);
  const currentRoute = routes.find((r) => r.path === location.pathname);
  const hideBurger = currentRoute?.hideBurger;
  const showBack = location.pathname !== "/";
  
  // Close menu automatically whenever the route/path changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="header__left">
        {showBack && <BackButton className="header__back" label="Back" />}
        {!hideBurger && <BurgerButton open={open} onToggle={toggle} />}
        <h1 className="header__brand">My App</h1>
      </div>
      {open && (
        <nav className="header__menu" onClick={close}>
          {navRoutes.map((r) => (
            <Link
              key={r.path}
              to={r.path}
              className={location.pathname === r.path ? "active" : ""}
            >
              {r.label}
            </Link>
          ))}
          <a href="#policy" onClick={(e) => e.preventDefault()}>
            Policy
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
