import React from "react";
import HomePage from "../pages/Home/HomePage";
import OtherPage from "../pages/Other/OtherPage";

// Type describing a route entry
export interface AppRoute {
  path: string;              // React Router path
  element: React.ReactElement; // Component element
  label?: string;            // Optional label for navigation
  hidden?: boolean;          // If true, omit from nav menu
  hideBurger?: boolean;      // If true, hides burger menu button in header
}

// Central route registry – add new pages here
export const routes: AppRoute[] = [
  {
    path: "/",
    element: <HomePage />,
    label: "Home"
  },
  {
    path: "/other",
    element: <OtherPage />,
    label: "Other Page",
    hideBurger: true
  }
];

// Convenience subset for navigation (filter hidden ones)
export const navRoutes = routes.filter(r => !r.hidden && r.label);

// Component to render all defined routes
export const AppRoutes: React.FC = () => {
  return (
    <>
      {routes.map(r => (
        <React.Fragment key={r.path}>{/* routes consumed in App.tsx */}</React.Fragment>
      ))}
    </>
  );
};

// NOTE: Actual <Route> elements are generated in App.tsx to keep HashRouter context localized.
