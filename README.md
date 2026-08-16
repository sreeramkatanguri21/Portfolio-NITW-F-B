# Sreeram Reddy Katanguri — Portfolio (React)

A React conversion of the Assignment 1 static portfolio: reusable components,
props, `useState`/`useEffect`, and client-side routing with
`react-router-dom`. No third-party state libraries — just Hooks and prop
passing, per the assignment constraints.

## Setup & run

```bash
npm install
npm run dev       # local dev server (Vite)
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

Requires Node.js 18+. No environment variables or backend are needed for
this assignment — the contact form is client-side only for now.

## Component tree

```
main.jsx
└─ BrowserRouter
   └─ ThemeProvider                      (Context: theme + toggleTheme)
      └─ App                             (Routes)
         └─ Layout                       (Navbar + <Outlet/> + Footer, shared across routes)
            ├─ Navbar                    (NavLink nav, mobile toggle, theme toggle button)
            ├─ <Outlet/>  →  one of:
            │   ├─ Home                  (loading-sequence effect, hero content)
            │   ├─ About                 (education timeline + Skills + achievements)
            │   │   └─ Skills            (receives `groups` via props)
            │   ├─ Projects               (imports projects.js)
            │   │   └─ ProjectList        (receives `projects`, drills a single project down)
            │   │       └─ ProjectCard    (receives one project's fields via props; grandchild)
            │   ├─ ProjectDetail          (useParams -> looks up project by :projectId)
            │   ├─ Contact
            │   │   └─ ContactForm        (controlled inputs, validation, local submit state)
            │   └─ NotFound               (catch-all "*" route)
            └─ Footer
```

### Prop drilling (2 levels)

`Projects` (page) owns the imported `projects` array and passes the whole
array to `ProjectList` (child). `ProjectList` then passes a single project's
fields (`title`, `description`, `stack`, `image`, etc.) further down to each
`ProjectCard` (grandchild). `ProjectCard` itself never imports the data file
— everything it renders arrives via props, which is what makes it reusable
on both the Projects page and (in spirit) the detail page.

### State-lifting decisions

- **Theme (light/dark):** lifted all the way to a `ThemeProvider` wrapping
  the whole app (via React Context, one of the two options the assignment
  allows). It's read by `Navbar` for the toggle button and applied globally
  by setting `data-theme` on `<html>`, so any component's CSS can react to
  it without prop-drilling a theme value through every layout.
- **Contact form state:** kept local to `ContactForm` (`formData`, `touched`,
  `submitted`). Nothing outside the form needs it, so lifting it further up
  would only add unnecessary re-renders elsewhere.
- **"View details" toggle:** kept local to each `ProjectCard` instance
  (`useState` inside the component). This was a deliberate test of scoping —
  expanding one card's details never affects any other card, because each
  card has its own independent piece of state rather than a shared one.
- **Mobile nav open/close:** kept local to `Navbar`, since no other
  component needs to know whether the mobile menu is open.

## `useEffect` hooks implemented

| Where | Dependency array | Why |
|---|---|---|
| `Home.jsx` | `[]` (mount only) | Simulates a ~1s loading sequence with `setTimeout` before showing the hero content, per the "loading state on mount" requirement. Cleans up the timer on unmount so it can't call `setState` after the component is gone. |
| `ThemeContext.jsx` | `[theme]` | Persists the current theme to `localStorage` and applies it to `<html data-theme="...">` every time `theme` changes; the saved value is read back via a lazy `useState` initializer on first load. |
| `Navbar.jsx` | `[]` (mount only) | Adds a `window.resize` listener that auto-closes the mobile nav menu once the viewport grows past the tablet breakpoint, so the menu can't get stuck open after a resize. Since this is a subscription, it returns a cleanup function that removes the listener on unmount. |

All effects that set up a timer or event listener return a cleanup
function, as required.

## Routing

- `/` redirects to `/home`.
- `/home`, `/about`, `/projects`, `/contact` are static routes.
- `/projects/:projectId` is a dynamic route read with `useParams()`; if the
  id doesn't match any project in `src/data/projects.js`, it shows an
  inline "not found" message with a link back to `/projects` instead of
  crashing.
- `path="*"` catches anything else and renders the `NotFound` page with a
  link back to `/home`.
- All internal navigation uses `<Link>` / `<NavLink>` — no `<a href>` — so
  routing never triggers a full page reload.

## Folder structure

```
src/
  components/   Navbar, Footer, Layout, ProjectCard, ProjectList, Skills, ContactForm
  pages/        Home, About, Projects, ProjectDetail, Contact, NotFound
  data/         projects.js, skills.js
  context/      ThemeContext.jsx
  styles/       global.css (design tokens + light/dark theme variables)
  assets/       (reserved for future static assets)
public/
  images/projects/  studynotion.png, ecomzy.png, razorpay.png
```

## Known limitations

- The contact form validates and confirms locally — there's no backend yet,
  since that's introduced in a later assignment.
- Project "Source code" links point to the GitHub profile rather than
  per-repo URLs, since individual repo links weren't provided.
