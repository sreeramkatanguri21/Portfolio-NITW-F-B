import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setNotFound(false);
    setError(null);

    fetch(`${API_BASE_URL}/api/projects/${projectId}`)
      .then((res) => {
        if (res.status === 404) {
          if (isMounted) {
            setNotFound(true);
            setLoading(false);
          }
          return null;
        }
        if (!res.ok) {
          throw new Error(`Server returned HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted && data) {
          setProject(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Error fetching project detail:", err);
          setError("Failed to load project details from server.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  if (loading) {
    return (
      <div className="loading-screen" style={{ minHeight: "300px" }}>
        <div className="loading-bar" aria-hidden="true"></div>
        <p>Loading project details…</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <section className="not-found" aria-label="Project not found">
        <p className="eyebrow">404</p>
        <h1>No project called "{projectId}"</h1>
        <p>It might have moved, or the link may be out of date.</p>
        <Link className="btn btn-solid" to="/projects">Back to projects</Link>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="not-found" aria-label="Error loading project">
        <p className="eyebrow">Error</p>
        <h1>Unable to load project</h1>
        <p>{error || "An unknown error occurred while fetching project data."}</p>
        <Link className="btn btn-solid" to="/projects">Back to projects</Link>
      </section>
    );
  }

  return (
    <section className="projects-section" aria-label={`${project.title} case study`}>
      <div className="container">
        <Link className="back-link" to="/projects">← Back to all projects</Link>

        <div className="detail-hero">
          <div>
            {project.period && <p className="project-period">{project.period}</p>}
            <h1>{project.title}</h1>
            <ul className="project-stack">
              {project.stack?.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <p className="project-desc detail-desc">
              {project.longDescription}
            </p>

            {project.highlights?.length > 0 && (
              <ul className="detail-highlights">
                {project.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}

            <div className="project-actions detail-actions">
              {project.github && (
                <a className="project-link" href={project.github} target="_blank" rel="noopener noreferrer">
                  View source on GitHub
                </a>
              )}
            </div>
          </div>

          <div className="detail-shot">
            <img src={project.image} alt={project.imageAlt || project.title} />
          </div>
        </div>
      </div>
    </section>
  );
}

