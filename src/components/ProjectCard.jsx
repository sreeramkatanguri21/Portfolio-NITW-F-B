import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Purely presentational — every piece of content comes in via props.
 * The "view details" expand/collapse state below is local to each
 * instance, so expanding one card never affects any other card.
 */
export default function ProjectCard({
  id,
  title,
  period,
  description,
  stack = [],
  image,
  imageAlt,
  github,
  highlights = [],
  reverse = false,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={`project-card${reverse ? " reverse" : ""}`}>
      <div className="project-shot">
        <img src={image} alt={imageAlt} />
      </div>

      <div className="project-info">
        {period && <p className="project-period">{period}</p>}
        <h2>{title}</h2>

        <ul className="project-stack">
          {stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <p className="project-desc">{description}</p>

        <div className="project-actions">
          {github && (
            <a className="project-link" href={github} target="_blank" rel="noopener noreferrer">
              Source code
            </a>
          )}
          <Link className="project-link" to={`/projects/${id}`}>
            Full case study →
          </Link>
          {highlights.length > 0 && (
            <button
              type="button"
              className="details-toggle"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
            >
              {expanded ? "Hide details" : "View details"}
            </button>
          )}
        </div>

        {expanded && highlights.length > 0 && (
          <ul className="details-panel">
            {highlights.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
