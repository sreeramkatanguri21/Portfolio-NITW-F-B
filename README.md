# Full Stack Portfolio (React + Node.js/Express)

A full-stack portfolio website featuring a React frontend connected to a live Node.js/Express REST API backend. The backend serves project data, handles contact form submissions with validation, and stores submissions server-side in JSON storage using a modularized MVC directory structure (`app.js`, `routes/`, `controllers/`).

---

## How to Run the Application

The application consists of two parts: the Express backend server (`/server`) and the React frontend client.

### 1. Start the Backend Server
```bash
cd server
npm install
npm start          # Or npm run dev for hot-reloading with nodemon
```
The server will run on `http://localhost:5000` (or the port defined in `server/.env`).

### 2. Start the React Frontend
In a separate terminal (from the project root directory):
```bash
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

---

## Environment Configuration

The backend reads configuration from `server/.env`. A template is provided in `server/.env.example`:

```env
PORT=5000
ALLOWED_ORIGIN=http://localhost:5173
```

- **`PORT`**: Port on which the Express backend runs.
- **`ALLOWED_ORIGIN`**: The allowed origin configured for CORS requests from the React dev server.

---

## REST API Documentation

Base URL: `http://localhost:5000`

| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `GET` | `/` | Health check confirmation | `200 OK` |
| `GET` | `/api/projects` | Fetch all project items | `200 OK` |
| `GET` | `/api/projects/:id` | Fetch details for single project by ID | `200 OK` / `404 Not Found` |
| `POST` | `/api/contact` | Submit contact form message | `201 Created` / `400 Bad Request` |
| `GET` | `/api/contact` | List all contact form submissions *(Open endpoint for verification)* | `200 OK` |

> [!NOTE]
> `GET /api/contact` is an open endpoint intentionally unauthenticated for evaluator verification as specified in assignment requirements.

---

## Testing Endpoints (curl Commands)

### B1. Health Check
```bash
curl -i http://localhost:5000/
```
**Sample Response (HTTP 200):**
```json
{
  "status": "ok"
}
```

---

### B2. Get All Projects
```bash
curl -i http://localhost:5000/api/projects
```
**Sample Response (HTTP 200):**
```json
[
  {
    "id": "studynotion",
    "title": "StudyNotion",
    "period": "Jan – Feb 2026",
    "description": "A full-stack ed-tech platform with RESTful APIs...",
    "longDescription": "StudyNotion is a full-stack ed-tech platform built to explore end-to-end product ownership...",
    "stack": ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "Cloudinary", "Razorpay", "JWT"],
    "image": "/images/projects/studynotion.png",
    "imageAlt": "StudyNotion homepage hero section...",
    "github": "https://github.com/sreeramkatanguri21",
    "highlights": [
      "JWT authentication with OTP verification and password reset",
      "Role-based access control with separate student/instructor dashboards"
    ]
  }
]
```

---

### B3. Get Single Project (Valid ID)
```bash
curl -i http://localhost:5000/api/projects/studynotion
```
**Sample Response (HTTP 200):** Returns project object.

### B3. Get Single Project (Failure Case - Invalid ID)
```bash
curl -i http://localhost:5000/api/projects/non-existent-id
```
**Sample Response (HTTP 404):**
```json
{
  "error": "Project not found"
}
```

---

### B4. Submit Contact Form (Valid Submission)
```bash
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Johnson", "email": "alice@example.com", "subject": "Job Offer", "message": "Hi Sreeram, let us connect!"}'
```
**Sample Response (HTTP 201):**
```json
{
  "message": "Contact submission received successfully.",
  "submission": {
    "id": "1742045000000",
    "name": "Sreeram Reddy",
    "email": "sreeram@gmail.com",
    "subject": "Job Offer",
    "message": "Hi Sreeram, let us connect!",
    "submittedAt": "2026-09-14T13:20:00.000Z"
  }
}
```

### B4. Submit Contact Form (Failure Case - Missing "@" in Email)
```bash
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Johnson", "email": "invalidemailformat", "message": "Hello"}'
```
**Sample Response (HTTP 400):**
```json
{
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format. Email must contain '@'."
  },
  "message": "Invalid email format. Email must contain '@'."
}
```

---

### B5. List All Contact Submissions
```bash
curl -i http://localhost:5000/api/contact
```
**Sample Response (HTTP 200):** Returns JSON array of all persisted contact submissions.

---

### B6. Catch-All 404 Route Test
```bash
curl -i http://localhost:5000/api/doesnotexist
```
**Sample Response (HTTP 404):**
```json
{
  "error": "Route not found"
}
```

---

## Postman Collection

An exported Postman Collection is available in `postman_collection.json` at the root of the repository. It includes pre-configured requests for all endpoints (B1 to B7), including success and validation error test cases.

---

## Repository Structure

```
portfolio-react/
├── node_modules/
├── public/
│   └── images/projects/
├── server/                    # Node.js/Express Backend (Modularized Architecture)
│   ├── controllers/           # Business logic controllers
│   │   ├── projectController.js # Project data fetching handlers
│   │   └── contactController.js # Contact form validation & persistence handlers
│   ├── routes/                # Express router definitions
│   │   ├── projectRoutes.js   # GET / and GET /:id routes for projects
│   │   └── contactRoutes.js   # POST / and GET / routes for contacts
│   ├── data/
│   │   ├── projects.json      # Server-side project data storage
│   │   └── contacts.json      # Persisted contact form submissions
│   ├── .env                   # Environment config (Port, CORS origin)
│   ├── .env.example           # Template for environment variables
│   ├── app.js                 # Express app initialization, middleware & router mounting
│   ├── package.json           # Server dependencies & scripts
│   └── server.js              # Server entry point & port listener
├── src/                       # React Frontend
│   ├── components/            # ProjectCard, ProjectList, ContactForm, Navbar, Layout, Footer
│   ├── pages/                 # Home, About, Projects, ProjectDetail, Contact, NotFound
│   ├── context/               # ThemeContext (Light/Dark mode)
│   ├── data/                  # Static skills data
│   └── styles/                # global.css
├── postman_collection.json    # Exported Postman API collection
├── package.json
└── README.md
```

---

## Features & Functionality

- **Modular Backend Architecture**: Clean separation into `server.js` (entry point), `app.js` (Express configuration), `routes/` (route declarations), and `controllers/` (business logic handlers).
- **Live Data Fetching (`useEffect`)**: Projects page and Project Detail page fetch data dynamically from Express API (`/api/projects` and `/api/projects/:id`).
- **Graceful Error Handling**: Visible loading states and user-friendly error banners when the server is unreachable or when requesting a non-existent project ID.
- **Server-Side Validation**: Contact form validates required fields and email syntax on the server, surfacing error messages directly in the UI.
- **Persistence**: Contact messages are saved to `server/data/contacts.json`.
- **CORS & Environment Variables**: Configured via `dotenv` and `cors` middleware.
- **Assignment 2 Features Retained**: React Router navigation, theme toggle (light/dark mode), responsive CSS layout, and 404 catch-all page remain intact.
