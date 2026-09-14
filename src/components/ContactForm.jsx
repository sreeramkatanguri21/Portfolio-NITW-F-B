import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const clientErrors = validate(formData);
  const isValid = Object.keys(clientErrors).length === 0;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
    if (serverError) setServerError(null);
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || "Failed to submit form.");
      }

      setSubmitted(true);
      setFormData(INITIAL_FORM);
      setTouched({});
    } catch (err) {
      console.error("Submission error:", err);
      setServerError(err.message || "An error occurred while submitting your message.");
    } finally {
      setIsSubmitting(false);
    }
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
            aria-invalid={Boolean(touched.name && clientErrors.name)}
          />
          {touched.name && clientErrors.name && (
            <span className="field-error">{clientErrors.name}</span>
          )}
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
            aria-invalid={Boolean(touched.email && clientErrors.email)}
          />
          {touched.email && clientErrors.email && (
            <span className="field-error">{clientErrors.email}</span>
          )}
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
          aria-invalid={Boolean(touched.message && clientErrors.message)}
        />
        {touched.message && clientErrors.message && (
          <span className="field-error">{clientErrors.message}</span>
        )}
      </div>

      {serverError && (
        <p className="form-status" role="alert" style={{ color: "var(--error)", borderColor: "var(--error)" }}>
          {serverError}
        </p>
      )}

      {submitted && (
        <p className="form-status" role="status">
          Thanks — your message has been received by the backend. I'll get back to you soon.
        </p>
      )}

      <div>
        <button type="submit" className="btn btn-solid" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  );
}

