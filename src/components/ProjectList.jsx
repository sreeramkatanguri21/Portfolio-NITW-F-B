import ProjectCard from "./ProjectCard.jsx";

/**
 * Prop-drilling step: the Projects page (grandparent) passes the whole
 * `projects` array down to this component (parent), which then passes a
 * single project's fields further down to each ProjectCard (child) —
 * Page -> ProjectList -> ProjectCard.
 */
export default function ProjectList({ projects }) {
  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.title}
          period={project.period}
          description={project.description}
          stack={project.stack}
          image={project.image}
          imageAlt={project.imageAlt}
          github={project.github}
          highlights={project.highlights}
          reverse={index % 2 === 1}
        />
      ))}
    </div>
  );
}
