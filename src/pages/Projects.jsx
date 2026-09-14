import { useEffect, useState } from "react";
import ProjectList from "../components/ProjectList.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server returned HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setProjects(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Error fetching projects:", err);
          setError("Failed to load projects from server. Please check if backend is running.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="projects-section" aria-label="Projects">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Projects</p>
          <h1>Things I've built</h1>
          <p>A mix of full-stack platforms and interface-focused apps.</p>
        </div>

        {loading && (
          <div className="loading-screen" style={{ minHeight: "200px" }}>
            <div className="loading-bar" aria-hidden="true"></div>
            <p>Loading projects from server…</p>
          </div>
        )}

        {error && !loading && (
          <div className="form-status" role="alert" style={{ color: "var(--error)", borderColor: "var(--error)", textAlign: "center", margin: "2rem 0" }}>
            <p><strong>Unable to connect to the backend server.</strong></p>
            <p style={{ marginTop: "0.5rem" }}>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <ProjectList projects={projects} />
        )}
      </div>
    </section>
  );
}

