import { useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = "Please enter your name.";
  if (!data.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = "That doesn't look like a valid email.";
  }
  if (!data.message.trim()) errors.message = "Please add a short message.";
  return errors;
}

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(formData);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    // No backend yet (that's a later assignment) — just confirm locally.
    setSubmitted(true);
    setFormData(INITIAL_FORM);
    setTouched({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(touched.name && errors.name)}
          />
          {touched.name && errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(touched.email && errors.email)}
          />
          {touched.email && errors.email && <span className="field-error">{errors.email}</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="What's this about? (optional)"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Write your message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(touched.message && errors.message)}
        />
        {touched.message && errors.message && <span className="field-error">{errors.message}</span>}
      </div>

      {submitted && (
        <p className="form-status" role="status">
          Thanks — your message has been noted. I'll get back to you soon.
        </p>
      )}

      <div>
        <button type="submit" className="btn btn-solid" disabled={!isValid}>
          Send message
        </button>
      </div>
    </form>
  );
}
