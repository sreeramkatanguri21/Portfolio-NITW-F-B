import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found" aria-label="Page not found">
      <p className="eyebrow">404</p>
      <h1>This page doesn't exist</h1>
      <p>The link might be broken, or the page may have moved.</p>
      <Link className="btn btn-solid" to="/home">Back to Home</Link>
    </section>
  );
}
