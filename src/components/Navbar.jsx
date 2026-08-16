import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

const NAV_ITEMS = [
  { to: "/home", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  // useEffect #: closes the mobile menu automatically if the viewport is
  // resized past the tablet breakpoint, so it can't get "stuck" open.
  // The resize listener is a subscription, so it must be cleaned up.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const linkClass = ({ isActive }) => (isActive ? "active" : undefined);

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Primary">
        <NavLink className="brand" to="/home">
          <span className="brand-mark">&lt;/&gt;</span> srk
        </NavLink>

        <input
          type="checkbox"
          id="nav-toggle"
          className="nav-toggle-input"
          checked={menuOpen}
          onChange={(e) => setMenuOpen(e.target.checked)}
        />

        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={linkClass} onClick={() => setMenuOpen(false)}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <label className="nav-toggle-label" htmlFor="nav-toggle" aria-label="Toggle navigation menu">
            <span></span><span></span><span></span>
          </label>
        </div>
      </nav>
    </header>
  );
}
