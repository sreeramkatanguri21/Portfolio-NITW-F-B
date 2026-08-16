export default function Skills({ groups }) {
  return (
    <div className="skills-grid">
      {groups.map((group) => (
        <article className="skill-card" key={group.id}>
          <h3>{group.label}</h3>
          <ul className="skill-tags">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
