import ContactForm from "../components/ContactForm.jsx";

export default function Contact() {
  return (
    <section className="contact-section" aria-label="Contact">
      <div className="container contact-grid">
        <div className="contact-info">
          <p className="eyebrow">Contact</p>
          <h1>Let's talk</h1>
          <p>Have a role, project or just want to say hello? My inbox is open.</p>

          <dl className="contact-detail">
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:sreeramkatanguri@gmail.com">sreeramkatanguri@gmail.com</a></dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd><a href="tel:+919177176317">+91 91771 76317</a></dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd><a href="https://github.com/sreeramkatanguri21" target="_blank" rel="noopener noreferrer">github.com/sreeramkatanguri21</a></dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd><a href="https://linkedin.com/in/sreeramkatanguri" target="_blank" rel="noopener noreferrer">linkedin.com/in/sreeramkatanguri</a></dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
