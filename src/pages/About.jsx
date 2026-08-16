import Skills from "../components/Skills.jsx";
import skillGroups from "../data/skills.js";

const EDUCATION = [
  {
    date: "Aug 2024 — Apr 2028",
    title: "B.Tech, Computer Science & Engineering",
    detail: "National Institute of Technology, Warangal · CGPA 9.31",
  },
  {
    date: "2022 — 2024",
    title: "Senior Secondary, CBSE (Class 12)",
    detail: "SR Prime School, Warangal · 94.6%",
  },
  {
    date: "2020 — 2022",
    title: "Secondary, CBSE (Class 10)",
    detail: "SR Prime School, Warangal · 96.8%",
  },
];

const ACHIEVEMENTS = [
  {
    date: "June 2026",
    title: "Salesforce FutureForce Hackathon",
    detail: "Selected in the top 50 participants nationally, building on the Salesforce platform.",
  },
  {
    date: "May 2024",
    title: "JEE Advanced — AIR 3162",
    detail: "Among 180,000+ candidates in one of India's most rigorous engineering entrance exams.",
  },
  {
    date: "Apr 2024",
    title: "JEE Mains — AIR 1601",
    detail: "Out of 1.1 million candidates, placing in the top 0.15% nationwide.",
  },
  {
    date: "Ongoing",
    title: "LeetCode — sreeram_k21",
    detail: "Contest rating of 1715 across competitive programming rounds.",
  },
];

export default function About() {
  return (
    <>
      <section className="about-section" aria-label="About">
        <div className="container about-grid">
          <div className="about-copy">
            <p className="eyebrow">About</p>
            <h1>A little about my path</h1>
            <p>
              I'm currently pursuing a B.Tech in Computer Science and Engineering
              at the National Institute of Technology, Warangal, with a CGPA of
              9.31. My coursework in Data Structures &amp; Algorithms, Operating
              Systems, and DBMS feeds directly into how I build software — I
              care about correctness and performance as much as I care about
              how an interface feels to use.
            </p>
            <p>
              Outside of coursework, I compete on LeetCode and enjoy problem
              solving, and I ranked in the top 50 nationally at the Salesforce
              FutureForce Hackathon. When I'm not writing code, I follow sports
              and look for the next hard problem to chip away at.
            </p>
          </div>

          <div className="timeline">
            {EDUCATION.map((item) => (
              <div className="timeline-item" key={item.title}>
                <p className="timeline-date">{item.date}</p>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Skills">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Skills</p>
            <h2>Tools I reach for</h2>
            <p>The languages, frameworks and coursework behind the projects I build.</p>
          </div>
          <Skills groups={skillGroups} />
        </div>
      </section>

      <section aria-label="Achievements">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Achievements</p>
            <h2>A few milestones</h2>
          </div>
          <div className="achievements-grid">
            {ACHIEVEMENTS.map((item) => (
              <article className="achievement-card" key={item.title}>
                <span className="timeline-date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
