/**
 * =============================================================================
 * CENTRAL PORTFOLIO DATA (Single Source of Truth)
 * =============================================================================
 */

// 1. BRAND NAME
export const BRAND_NAME = "Mudasir Ali.";

// 2. PERSONAL INFO
export const PERSONAL_INFO = {
  name: "Mudasir Ali",
  role: "Full Stack Developer (Laravel, React, PHP, MySQL, REST APIs)",
  location: "Hyderabad, Pakistan",
  email: "mudasiralikorejo@gmail.com",
  phone: "+92-301-3570938",
  github: "https://github.com/Mudasir-ali1",
  linkedin: "https://www.linkedin.com/in/mudasir-ali-678032275/",
};

// 3. HERO SECTION
export const HERO_DATA = {
  tag: "Hey, I'm a",
  title: "Full Stack Developer",
  headline: "Reliable software,\nbuilt end to end.",
  subline: "I build web apps with Laravel and React: REST APIs, real-time systems, secure authentication and Stripe payments.",
  items: [
    { num: "// 01", name: "React Frontends" },
    { num: "// 02", name: "Laravel Backends" },
    { num: "// 03", name: "Real-time Systems" },
    { num: "// 04", name: "REST APIs" },
  ],
};

// 4. ABOUT SECTION
export const ABOUT_DATA = {
  lead: [
    { t: "I'm Mudasir Ali, a full stack developer and Software Engineering student at the University of Sindh. I build web applications with " },
    { t: "React, Laravel and PHP", hl: true },
    { t: ", from secure REST APIs and MySQL databases to the interface people actually use." },
  ],
  secondParagraph: {
    start: "I currently work as a Laravel Developer at XCL Technologies, delivering features for live client projects. I've built real-time chat with ",
    highlight: "Laravel Reverb, WebSockets and WebRTC",
    end: ", Sanctum authentication with role-based access, and Stripe payments.",
  },
  chips: ["Laravel", "React", "REST APIs", "MySQL"],
};

// 5. SERVICES SECTION (3D Cards)
export const hero = {
  label: "WHAT I DO",
  headlineBefore: "Building scalable backends into ",
  headlineEm: "reality",
  headlineAfter: ".",
  paragraph: "I build web apps with Laravel and React: REST APIs, real-time systems, secure authentication and Stripe payments.",
};

export const services = [
  {
    id: "fullstack",
    title: "Full-Stack Web Apps",
    desc: "I build complete web products with Laravel and React, from designing the MySQL database and REST APIs to creating a clean, responsive interface.",
    x: 4.3,
    y: -0.3,
    z: -8,
    rotY: -9,
    rotZ: 1.5,
  },
  {
    id: "backend",
    title: "Backend & REST APIs",
    desc: "Secure Laravel and PHP backends with well-structured MySQL schemas and clean REST APIs.",
    x: -4.7,
    y: -1.5,
    z: -15,
    rotY: 9,
    rotZ: -2,
  },
  {
    id: "realtime",
    title: "Real-time Systems",
    desc: "Live chat, events and calling with Laravel Reverb, WebSockets and WebRTC.",
    x: 4.4,
    y: 1.5,
    z: -22,
    rotY: -9,
    rotZ: 1.5,
  },
  {
    id: "payments",
    title: "SaaS & Invoicing Platforms",
    desc: "I build SaaS-style products such as invoicing platforms, covering the full stack from the database and REST APIs to the user interface. Sanctum authentication and role-based access control who can see and do what.",
    x: -2.8,
    y: 0.7,
    z: -29,
    rotY: 9,
    rotZ: -1.5,
  },
];

export const cameraPath = [
  [0, 0, 6],
  [0.6, 0.2, -2],
  [-0.6, -0.1, -8],
  [0.6, 0.1, -14],
  [-0.3, 0, -18],
  [0, 0, -21.5],
];

// 6. SKILLS SECTION
export const SKILLS_ROW_1 = [
  { name: "Laravel", icon: "laravel", accent: "#ff5c8a" },
  { name: "React.js", icon: "react", accent: "#a78bfa" },
  { name: "PHP", icon: "php", accent: "#ff6a3d" },
  { name: "MySQL", icon: "mysql", accent: "#a78bfa" },
  { name: "REST APIs", icon: "api", accent: "#ff5c8a" },
  { name: "Sanctum Authentication", icon: "sanctum", accent: "#ff6a3d" },
  { name: "Stripe Payments", icon: "stripe", accent: "#a78bfa" },
  { name: "Git & GitHub", icon: "github", accent: "#ff5c8a" },
  { name: "Postman", icon: "postman", accent: "#ff6a3d" },
];

export const SKILLS_ROW_2 = [
  { name: "Laravel Reverb", icon: "realtime", accent: "#ff5c8a" },
  { name: "WebSockets", icon: "realtime", accent: "#a78bfa" },
  { name: "Laravel Echo", icon: "realtime", accent: "#ff6a3d" },
  { name: "WebRTC", icon: "realtime", accent: "#a78bfa" },
  { name: "JavaScript", icon: "javascript", accent: "#ff5c8a" },
  { name: "Blade", icon: "blade", accent: "#ff6a3d" },
  { name: "AJAX", icon: "api", accent: "#a78bfa" },
  { name: "Eloquent ORM", icon: "database", accent: "#ff5c8a" },
  { name: "MVC Architecture", icon: "layers", accent: "#ff6a3d" },
];

export const SKILLS = [...SKILLS_ROW_1, ...SKILLS_ROW_2];

// 7. PROJECTS SECTION (5 originals in requested order)
export const PROJECTS = [
  {
    id: 1,
    theme: "red",
    badge: "SAAS",
    title: "Multi-Tenant SaaS Invoicing",
    desc: "A full-stack, multi-tenant SaaS invoicing system built with Laravel, where multiple businesses use one platform with their own separate data.",
    tags: ["Laravel", "Multi-tenant", "SaaS", "Invoicing"],
    live: "",
    repo: "https://github.com/Mudasir-ali1/multi-tenant-saas-invoicing",
  },
  {
    id: 2,
    theme: "amber",
    badge: "E-COMMERCE",
    title: "Zenda E-Commerce Platform",
    desc: "An e-commerce platform with a product catalog, shopping cart and order management.",
    tags: ["Laravel", "MySQL", "REST APIs"],
    live: "",
    repo: "https://github.com/Mudasir-ali1/zenda-ecommerce",
  },
  {
    id: 3,
    theme: "blue",
    badge: "BOOKING",
    title: "BookEasy",
    desc: "A barbershop booking system with conflict-free time slots handled by a dedicated SlotService, and Stripe payments.",
    tags: ["Laravel", "MySQL", "Stripe", "Blade"],
    live: "",
    repo: "https://github.com/Mudasir-ali1/bookeasy-barber-booking",
  },
  {
    id: 4,
    theme: "red",
    badge: "REAL-TIME",
    title: "MT Connect",
    desc: "A real-time chat app with WhatsApp-style delivery ticks, user presence, and WebRTC audio/video calling.",
    tags: ["Laravel 12", "Laravel Reverb", "WebSockets", "Laravel Echo", "WebRTC"],
    live: "",
    repo: "https://github.com/Mudasir-ali1/Real-time-chat-app-",
  },
  {
    id: 5,
    theme: "amber",
    badge: "REST API",
    title: "Blog CMS API",
    desc: "A REST API for a blog CMS with Sanctum authentication and Admin, Editor and Viewer roles.",
    tags: ["Laravel", "MySQL", "Sanctum", "RBAC"],
    live: "",
    repo: "https://github.com/Mudasir-ali1/blog-cms-api",
  },
];

// 8. EXPERIENCE & EDUCATION SECTION
export const GROUPS = [
  {
    label: "EXPERIENCE",
    items: [
      {
        role: "Laravel Developer",
        company: "XCL Technologies",
        place: "Hyderabad",
        period: "Sep 2026 — Present",
        points: [
          "Own Laravel modules and features for live client projects, from planning to delivery.",
          "Design and optimize MySQL schemas and queries; build and test REST APIs with Postman.",
          "Debug and improve existing codebases, and work with senior developers on architecture decisions.",
        ],
        stack: ["Laravel", "MySQL", "REST APIs", "Postman"],
      },
      {
        role: "Laravel Developer Intern",
        company: "XCL Technologies",
        place: "Hyderabad",
        period: "Jun 2026 — Aug 2026",
        points: [
          "Worked with a senior developer on live Laravel projects for real clients.",
          "Built Laravel features and modules, MySQL tables and REST APIs from client requirements.",
          "Fixed bugs and helped with frontend tasks in HTML, CSS and JavaScript.",
        ],
        stack: ["Laravel", "MySQL", "REST APIs", "Postman"],
      },
      {
        role: "PHP Developer Intern",
        company: "Management Institute of Technology",
        place: "Hyderabad",
        period: "Sep 2025 — Nov 2025",
        points: [
          "Built backend features for the institute's internal web system in PHP with MySQL.",
          "Used AJAX for live search and form submissions without page refresh.",
          "Tested API endpoints with Postman and used Git and GitHub for version control.",
        ],
        stack: ["PHP", "MySQL", "AJAX", "Git"],
      },
    ],
  },
  {
    label: "EDUCATION",
    items: [
      {
        role: "B.S. Software Engineering",
        company: "University of Sindh",
        place: "Jamshoro",
        period: "2024 — Present",
        points: [],
        stack: ["Software Engineering"],
      },
      {
        role: "Web Development Training (PHP, Laravel, MySQL)",
        company: "Management Institute of Technology",
        place: "Hyderabad",
        period: "2025 — May 2026",
        points: [],
        stack: ["PHP", "Laravel", "MySQL"],
      },
      {
        role: "Certifications & Courses",
        company: "Professional Certifications",
        place: "",
        period: "",
        points: [
          "PHP, MySQL, Laravel & OOP (Management Institute of Technology)",
          "Core PHP Certificate (Management Institute of Technology)",
          "Certified Database Administrator (PITP, Mehran University, 2 months)",
          "Certified Python Developer (PITP, Mehran University, 2 months)",
        ],
        stack: [],
      },
    ],
  },
];

// 9. CONTACT SECTION DATA
export const contactData = {
  label: "CONTACT",
  headline: "Let's build something <em>remarkable</em>.",
  bio: "Full Stack Developer building web applications with Laravel and React: REST APIs, real-time systems, secure authentication and Stripe payments.",
  email: "mudasiralikorejo@gmail.com",
  emailDisplay: "mudasiralikorejo@gmail.com",
  phone: "+92-301-3570938",
  phoneDisplay: "+92-301-3570938",
  location: "Hyderabad, Pakistan",
  github: "https://github.com/Mudasir-ali1",
  githubDisplay: "github.com/Mudasir-ali1",
  linkedin: "https://www.linkedin.com/in/mudasir-ali-678032275/",
  linkedinDisplay: "linkedin.com/in/mudasir-ali",
  topics: [
    "Full-Stack Web App",
    "Laravel & REST APIs",
    "Real-time Systems",
    "Just saying hi",
  ],
};

// 10. FOOTER DATA
export const FOOTER_BRAND = {
  tagline: "Building reliable full-stack web applications, real-time systems, and secure REST APIs with Laravel and React.",
};

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/Mudasir-ali1",
    icon: "github",
    accent: "#ff6a3d",
    isMailto: false,
  },
  {
    name: "Email",
    href: "mailto:mudasiralikorejo@gmail.com",
    icon: "email",
    accent: "#ff5c8a",
    isMailto: true,
  },
  {
    name: "Phone",
    href: "tel:+923013570938",
    icon: "phone",
    accent: "#ff6a3d",
    isMailto: false,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mudasir-ali-678032275/",
    icon: "linkedin",
    accent: "#0a66c2",
    isMailto: false,
  },
];
