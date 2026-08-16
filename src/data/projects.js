// Central project data. Every field here is passed down to <ProjectCard />
// (and, for the detail route, straight to the ProjectDetail page) via props —
// no project content is hardcoded inside the components themselves.

const projects = [
  {
    id: "studynotion",
    title: "StudyNotion",
    period: "Jan – Feb 2026",
    description:
      "A full-stack ed-tech platform with RESTful APIs for authentication — JWT sessions, OTP verification and password reset — plus role-based dashboards for students and instructors.",
    longDescription:
      "StudyNotion is a full-stack ed-tech platform built to explore end-to-end product ownership: authentication, payments, media storage and role-based UI in one codebase. The backend exposes RESTful APIs for JWT-based auth, OTP verification and password reset, while separate dashboards give students and instructors different course-management tools. Razorpay handles enrollment payments and Cloudinary stores course media, with a responsive React + Redux front end covering course browsing, wishlist and cart checkout.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "Cloudinary", "Razorpay", "JWT"],
    image: "/images/projects/studynotion.png",
    imageAlt:
      "StudyNotion homepage hero section with a headline about coding skills and a Book a Demo button",
    github: "https://github.com/sreeramkatanguri21",
    highlights: [
      "JWT authentication with OTP verification and password reset",
      "Role-based access control with separate student/instructor dashboards",
      "Razorpay payment gateway integrated for course enrollment",
      "Cloudinary-backed media storage for course content",
    ],
  },
  {
    id: "shopping-cart",
    title: "Shopping Cart Web App",
    period: "Nov 2025",
    description:
      "A responsive e-commerce cart with real-time cart management and async product fetching from the FakeStore API.",
    longDescription:
      "A responsive e-commerce cart app focused on state management: Redux Toolkit drives global cart state across the app, with add/remove actions and a live cart count reflected instantly in the navbar. Product data is fetched asynchronously from the FakeStore API, and the product grid includes hover animations. The cart summary page itemizes totals and falls back gracefully to an empty-cart state.",
    stack: ["React.js", "Redux Toolkit", "React Router", "Tailwind CSS"],
    image: "/images/projects/shoppingcart.png",
    imageAlt:
      "Ecomzy shopping cart web app showing a grid of products with add to cart buttons and a cart counter",
    github: "https://github.com/sreeramkatanguri21",
    highlights: [
      "Global cart state managed with Redux Toolkit",
      "Real-time cart count synced to the navbar",
      "Async product fetching from the FakeStore API",
      "Itemized cart summary with an empty-cart fallback",
    ],
  },
  {
    id: "razorpay-clone",
    title: "Razorpay Website Clone",
    period: "Personal build",
    description:
      "A Razorpay website clone demonstrating expertise in the Tailwind CSS utility-first framework, with clean, maintainable, responsive code.",
    longDescription:
      "A pixel-conscious clone of the Razorpay marketing homepage, built to get fluent in Tailwind CSS's utility-first workflow. The focus was on writing clean, maintainable class compositions rather than custom CSS, while keeping the layout fully responsive across mobile, tablet and desktop breakpoints.",
    stack: ["HTML5", "Tailwind CSS", "Responsive Design"],
    image: "/images/projects/razorpay.png",
    imageAlt:
      "Razorpay website clone homepage with the headline Power your finance, grow your business and a Sign Up Now button",
    github: "https://github.com/sreeramkatanguri21",
    highlights: [
      "Rebuilt the Razorpay marketing homepage layout section by section",
      "Utility-first styling with Tailwind CSS — no custom CSS files",
      "Fully responsive across mobile, tablet and desktop widths",
    ],
  },
];

export default projects;
