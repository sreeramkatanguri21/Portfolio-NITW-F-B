import { Link, useParams } from "react-router-dom";
import projects from "../data/projects.js";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section className="not-found" aria-label="Project not found">
        <p className="eyebrow">404</p>
        <h1>No project called "{projectId}"</h1>
        <p>It might have moved, or the link may be out of date.</p>
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
              {project.stack.map((tech) => (
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
            <img src={project.image} alt={project.imageAlt} />
          </div>
        </div>
      </div>
    </section>
  );
}
