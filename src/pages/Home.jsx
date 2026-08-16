import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // useEffect #: runs once on mount ([] dependency array) to simulate a
  // brief loading sequence before the hero content appears.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-bar" aria-hidden="true"></div>
        <p>loading…</p>
      </div>
    );
  }

  return (
    <section className="hero" aria-label="Introduction">
      <div className="container">
        <div className="hero-intro">
          <p className="eyebrow">Full-stack developer &amp; CS undergrad</p>
          <h1 className="hero-name">Sreeram Reddy Katanguri</h1>
          <p className="hero-role">Backend systems · Scalable web apps · Competitive programming</p>
          <p className="hero-desc">
            NIT Warangal undergraduate with strong fundamentals in full-stack web
            development, competitive programming, and data structures. I build
            RESTful APIs and responsive interfaces, and I'm looking for a
            software engineering role centered on backend systems.
          </p>

          <div className="btn-row">
            <Link className="btn btn-solid" to="/projects">View projects</Link>
            <Link className="btn btn-outline" to="/contact">Get in touch</Link>
          </div>

          <div className="social-row">
            <a href="mailto:sreeramkatanguri@gmail.com">sreeramkatanguri@gmail.com</a>
            <a href="https://github.com/sreeramkatanguri21" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/sreeramkatanguri" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        <div className="intro-card">
          <div className="polaroid">
            <div className="avatar" aria-hidden="true">SRK</div>
            <p className="polaroid-caption">building backend systems, one bug at a time ✎</p>
          </div>

          <ul className="fact-tags">
            <li>CGPA<span>9.31</span></li>
            <li>LeetCode<span>1715</span></li>
            <li>JEE AIR<span>3162</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
