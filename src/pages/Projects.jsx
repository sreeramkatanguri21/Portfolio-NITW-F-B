import ProjectList from "../components/ProjectList.jsx";
import projects from "../data/projects.js";

export default function Projects() {
  return (
    <section className="projects-section" aria-label="Projects">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Projects</p>
          <h1>Things I've built</h1>
          <p>A mix of full-stack platforms and interface-focused apps.</p>
        </div>

        {/* Projects (this page) -> ProjectList -> ProjectCard: prop drilling, 2 levels deep */}
        <ProjectList projects={projects} />
      </div>
    </section>
  );
}
