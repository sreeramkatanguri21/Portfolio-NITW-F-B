import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <p>&copy; 2026 Sreeram Reddy Katanguri</p>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
