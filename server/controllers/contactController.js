const fs = require("fs");
const path = require("path");

const CONTACTS_FILE = path.join(__dirname, "..", "data", "contacts.json");

// Helper to read contacts from JSON file
function readContacts() {
  if (!fs.existsSync(CONTACTS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(CONTACTS_FILE, "utf8");
  return JSON.parse(data);
}

// Helper to write contacts to JSON file
function writeContacts(contacts) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), "utf8");
}

// B4: POST /api/contact
exports.createContact = (req, res, _next) => {
  try {
    const { name, email, subject, message } = req.body || {};

    const errors = {};
    if (!name || typeof name !== "string" || !name.trim()) {
      errors.name = "Name is required.";
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      errors.email = "Email is required.";
    } else if (!email.includes("@")) {
      errors.email = "Invalid email format. Email must contain '@'.";
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      errors.message = "Message is required.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors,
        message: Object.values(errors).join(" "),
      });
    }

    const contacts = readContacts();
    const newSubmission = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      subject: subject ? subject.trim() : "",
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    contacts.push(newSubmission);
    writeContacts(contacts);

    res.status(201).json({
      message: "Contact submission received successfully.",
      submission: newSubmission,
    });
  } catch (error) {
    _next(error);
  }
};

// B5: GET /api/contact
exports.getContacts = (req, res, _next) => {
  try {
    const contacts = readContacts();
    res.status(200).json(contacts);
  } catch (error) {
    _next(error);
  }
};
