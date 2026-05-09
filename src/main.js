import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

const STORAGE_KEY = "siddesh-naik-portfolio-profile";
const CODE_KEY = "siddesh-naik-portfolio-code";
const THEME_KEY = "siddesh-naik-portfolio-theme";
const PROFILE_API = "/api/profile";
const UPLOAD_API = "/api/upload";
const DEFAULT_CODE = "23";

const DEVICON_MAP = {
  ai: "",
  aiml: "",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  tensorflow: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  pytorch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  opencv: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  numpy: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  sql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  linux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  fastapi: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg"
};

const DEFAULT_PROFILE = {
  tagline: "CSE (AIML) Engineering Student",
  name: "Siddesh Naik",
  role: "AI/ML focused coder, engineering student, and project builder.",
  summary:
    "I design clean software, learn machine learning by building, and turn engineering concepts into practical web, data, and AI projects.",
  focus: "Artificial Intelligence + Machine Learning",
  stackShort: "Python, Java, Web, ML",
  status: "Open to projects",
  about:
    "I am a Computer Science Engineering student specializing in AIML. My portfolio highlights coding practice, machine learning experiments, academic work, and projects that connect theory with real usable products.",
  location: "India",
  email: "siddesh@example.com",
  phone: "+91 00000 00000",
  resumeUrl: "/resume.pdf",
  profilePhoto: "",
  contactNote:
    "Please contact me directly by email or drop your info here for internships, coding projects, AI/ML ideas, or college tech work.",
  socials: [
    { label: "GitHub", url: "https://github.com/corsal2006" },
    { label: "LinkedIn", url: "https://linkedin.com/in/siddesh-naik2" },
    { label: "Email", url: "siddeshnaik292006@gmail.com" }
  ],
  info: [
    { label: "Degree", value: "B.E CSE (AIML)" },
    { label: "Primary Language", value: "Python" },
    { label: "Interests", value: "ML, DSA, Web Apps" },
    { label: "Learning", value: "Deep Learning + Cloud" }
  ],
  skills: [
    {
      name: "Python",
      category: "Coding",
      level: 88,
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      note: "Core scripting, problem solving, automation, and AI notebooks."
    },
    {
      name: "Java + DSA",
      category: "Coding",
      level: 74,
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      note: "Data structures, algorithms, OOP, and placement practice."
    },
    {
      name: "Machine Learning",
      category: "AIML",
      level: 78,
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      note: "Regression, classification, model evaluation, and pipelines."
    },
    {
      name: "Deep Learning",
      category: "AIML",
      level: 64,
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
      note: "Neural networks, CNN ideas, TensorFlow/PyTorch exploration."
    },
    {
      name: "Frontend",
      category: "Web",
      level: 82,
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      note: "Responsive interfaces with HTML, CSS, JavaScript, and animation."
    },
    {
      name: "React",
      category: "Web",
      level: 70,
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      note: "Component thinking, state handling, and modern UI patterns."
    },
    {
      name: "Databases",
      category: "Engineering",
      level: 68,
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      note: "SQL fundamentals, schema thinking, and project persistence."
    },
    {
      name: "Git + Linux",
      category: "Engineering",
      level: 72,
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      note: "Version control, CLI workflows, and developer environment basics."
    }
  ],
  experience: [
    {
      title: "CSE (AIML) Engineering Student",
      company: "MGM COLLEGE OF ENGINEERING AND TECHNOLOGY, KAMOTHE",
      period: "2024 - Present",
      bullets:
        "Studying core computer science, AI, machine learning, data structures, databases, and software engineering.\nBuilding academic and self-learning projects to convert concepts into working products.\nPracticing coding problems and improving engineering fundamentals.",
      tech: "Python, Java, SQL, Git"
    },
    {
      title: "AI/ML Project Builder",
      company: "Independent Learning",
      period: "2025 - Present",
      bullets:
        "Created mini projects around NLP, study assistants, dashboards, and computer-vision concepts.\nExperimented with model evaluation, data preprocessing, and simple deployment-friendly interfaces.",
      tech: "Python, TensorFlow, NumPy, Pandas"
    },
    {
      title: "Frontend + Portfolio Developer",
      company: "Personal Projects",
      period: "2026",
      bullets:
        "Designed responsive portfolio interfaces with animation, 3D visuals, and editable content.\nFocused on clean sections, smooth interactions, and student-friendly presentation.",
      tech: "JavaScript, HTML, CSS, Three.js"
    }
  ],
  projects: [
    {
      title: "International Space Station Tracker",
      type: "Project",
      year: "2024",
      description:
        "I created a real-time International Space Station (ISS) tracker using Python, Flask, and Google Maps API./n🔹 The app fetches live ISS coordinates from Open Notify API./n🔹 Displays it on an interactive Google Map (satellite view)./n🔹 Uses a marker that moves every few seconds as the station orbits Earth./nWhat’s amazing is watching the ISS fly over different continents in real time — from coding to space exploration in one project! 🛰️",
      tech: "Python, NLP, Web",
      link: "",
      image: ""
    },
    {
      title: "Smart Attendance Dashboard",
      type: "Engineering",
      year: "2025",
      description:
        "A dashboard idea for tracking attendance, subject performance, and alerts with a clean student interface.",
      tech: "JavaScript, Charts, Storage",
      link: "",
      image: ""
    },
    {
      title: "Portfolio Neural Interface",
      type: "Web",
      year: "2026",
      description:
        "This animated portfolio with owner edit mode, autosave, and a 3D engineering-inspired scene.",
      tech: "Three.js, HTML, CSS",
      link: "",
      image: ""
    },
    {
      title: "ML Model Playground",
      type: "AIML",
      year: "2026",
      description:
        "A practice space for trying datasets, comparing metrics, and learning model behavior visually.",
      tech: "Python, NumPy, Pandas",
      link: "",
      image: ""
    },
    {
      title: "DSA Tracker",
      type: "Coding",
      year: "2025",
      description:
        "A structured tracker for coding practice, topic revision, and placement preparation progress.",
      tech: "Java, DSA, Web",
      link: "",
      image: ""
    },
    {
      title: "Mini Vision Lab",
      type: "Computer Vision",
      year: "2026",
      description:
        "Small experiments with image preprocessing, feature detection, and camera-based interaction ideas.",
      tech: "Python, OpenCV, AI",
      link: "",
      image: ""
    }
  ],
  achievements: [
    {
      title: "Project Builder",
      detail: "Created portfolio-ready academic and self-learning projects."
    },
    {
      title: "Consistent Learner",
      detail: "Practicing coding, AIML concepts, and engineering fundamentals."
    },
    {
      title: "Engineering Mindset",
      detail: "Focused on clean UI, useful features, and practical problem solving."
    }
  ]
};

const editorSections = ["Profile", "Links", "Info", "Stack", "Experience", "Projects", "Wins", "Access"];

let profile = clone(DEFAULT_PROFILE);
let activeSkillCategory = "All";
let activeEditorSection = "Profile";
let isUnlocked = false;
let saveTimer = 0;
let serverSaveTimer = 0;
let serverPersistence = false;
let keyCount = 0;
let revealObserver;

const qs = (selector, parent = document) => parent.querySelector(selector);
const qsa = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function deepMerge(base, saved) {
  const output = clone(base);
  if (!saved || typeof saved !== "object") return output;

  for (const [key, value] of Object.entries(saved)) {
    if (Array.isArray(value)) {
      output[key] = value;
    } else if (value && typeof value === "object" && typeof output[key] === "object") {
      output[key] = deepMerge(output[key], value);
    } else {
      output[key] = value;
    }
  }

  return output;
}

function loadLocalProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return deepMerge(DEFAULT_PROFILE, saved);
  } catch {
    return clone(DEFAULT_PROFILE);
  }
}

async function loadProfile() {
  try {
    const response = await fetch(PROFILE_API, {
      cache: "no-store"
    });

    if (response.ok) {
      const data = await response.json();

      serverPersistence = data.permanent !== false;

      if (data.profile) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(data.profile)
        );

        return deepMerge(DEFAULT_PROFILE, data.profile);
      }
    }
  } catch {
    serverPersistence = false;
  }

  return loadLocalProfile();
}

function saveProfile() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));

  window.clearTimeout(saveTimer);

  saveTimer = window.setTimeout(() => {
    const status = qs("#save-status");

    if (status) {
      status.textContent = serverPersistence
        ? "Saving for everyone..."
        : "Saved in this browser";
    }
  }, 120);

  window.clearTimeout(serverSaveTimer);

  // FORCE cloud save always
  serverSaveTimer = window.setTimeout(async () => {
    await saveProfileToServer();
  }, 520);
}

async function saveProfileToServer() {
  const status = qs("#save-status");

  try {
    const response = await fetch(PROFILE_API, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Owner-Code": ownerCode()
      },
      body: JSON.stringify({ profile })
    });

    if (!response.ok) {
      throw new Error("Server save failed");
    }

    if (status) {
      status.textContent = `Saved for everyone ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }
  } catch {
    serverPersistence = false;
    if (status) {
      status.textContent = "Saved in this browser only";
    }
  }
}

function ownerCode() {
  return localStorage.getItem(CODE_KEY) || DEFAULT_CODE;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error || new Error("Could not read file")));
    reader.readAsDataURL(file);
  });
}

function uploadKindForPath(path) {
  if (path === "resumeUrl") return "resume";
  if (path === "profilePhoto") return "profile-photo";
  return "project-image";
}

async function uploadEditorFile(input) {
  const file = input.files?.[0];
  if (!file) return;

  const path = input.dataset.uploadPath;
  const kind = input.dataset.uploadKind || uploadKindForPath(path);
  const status = qs("#save-status");
  if (status) status.textContent = "Uploading...";

  try {
    const dataUrl = await fileToDataUrl(file);
    const response = await fetch(UPLOAD_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Owner-Code": ownerCode()
      },
      body: JSON.stringify({
        kind,
        fileName: file.name,
        contentType: file.type,
        dataUrl
      })
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.url) {
      throw new Error(data.error || "Upload failed");
    }

    setByPath(path, data.url);
    saveProfile();
    renderSite();
    renderEditor();
    const nextStatus = qs("#save-status");
    if (nextStatus) nextStatus.textContent = kind === "resume" ? "Resume uploaded" : "Image uploaded";
  } catch (error) {
    if (status) status.textContent = error.message || "Upload failed";
  } finally {
    input.value = "";
  }
}

function getByPath(path) {
  return path.split(".").reduce((target, key) => target?.[key], profile);
}

function setByPath(path, value) {
  const parts = path.split(".");
  let target = profile;
  while (parts.length > 1) {
    const part = parts.shift();
    target = target[part];
  }
  target[parts[0]] = value;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeUrl(url) {
  const trimmed = String(url || "").trim();
  if (!trimmed) return "";
  if (/^(https?:|mailto:|tel:|blob:)/i.test(trimmed)) return trimmed;
  if (/^(\/|\.\/|#)/.test(trimmed)) return trimmed;
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) return `mailto:${trimmed}`;
  return `https://${trimmed}`;
}

function splitList(value) {
  return String(value || "")
    .split(/,|\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function initialsFromName(name) {
  return String(name || "SN")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function iconFor(label, explicit = "") {
  if (explicit) return safeUrl(explicit);
  const clean = String(label || "")
    .toLowerCase()
    .replace(/\.js/g, "")
    .replace(/[^a-z0-9]+/g, "");
  return DEVICON_MAP[clean] || "";
}

function badgeMarkup(label) {
  const icon = iconFor(label);
  const image = icon ? `<img src="${escapeHtml(icon)}" alt="" />` : "";
  return `<span class="tech-badge">${image}<span>${escapeHtml(label)}</span></span>`;
}

function socialIcon(label, url = "") {
  const key = `${label} ${url}`.toLowerCase();
  const common = 'class="social-icon" aria-hidden="true" viewBox="0 0 24 24"';

  if (key.includes("github")) {
    return `<svg ${common}><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/></svg>`;
  }

  if (key.includes("linkedin")) {
    return `<svg ${common}><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V8.98h3.42v1.57h.05a3.75 3.75 0 0 1 3.37-1.85c3.61 0 4.27 2.38 4.27 5.47v6.28ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z"/></svg>`;
  }

  if (key.includes("mail") || key.includes("email") || key.includes("mailto:")) {
    return `<svg ${common}><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m22 8-10 7L2 8"/></svg>`;
  }

  if (key.includes("resume") || key.includes(".pdf")) {
    return `<svg ${common}><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M6 2h8l4 4v16H6z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M14 2v5h5M9 13h6M9 17h4"/></svg>`;
  }

  return `<svg ${common}><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L10.9 5.03"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 11a5 5 0 0 0-7.07 0L4.81 13.12a5 5 0 0 0 7.07 7.07l1.22-1.22"/></svg>`;
}

function bindText() {
  qsa("[data-bind]").forEach((node) => {
    const key = node.dataset.bind;
    node.textContent = profile[key] || "";
  });
}

function renderActions() {
  const links = [
    ...profile.socials,
    ...(profile.resumeUrl ? [{ label: "Resume", url: profile.resumeUrl, primary: true }] : [])
  ].filter((link) => link.label && link.url);

  const markup = links
    .map((link, index) => {
      const href = safeUrl(link.url);
      const primaryClass = link.primary || index === 0 ? " primary" : "";
      return `<a class="command-link cursor-can-hover${primaryClass}" href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${socialIcon(link.label, link.url)}<span>${escapeHtml(link.label)}</span></a>`;
    })
    .join("");

  qs("#hero-actions").innerHTML = markup;
  qs("#contact-actions").innerHTML = markup;
}

function renderPhoto() {
  const photo = qs("#profile-photo");
  const avatar = qs("#initials-avatar");
  const photoUrl = safeUrl(profile.profilePhoto);

  if (photoUrl) {
    photo.src = photoUrl;
    photo.hidden = false;
    avatar.hidden = true;
  } else {
    photo.removeAttribute("src");
    photo.hidden = true;
    avatar.hidden = false;
  }
  avatar.textContent = initialsFromName(profile.name);
}

function renderInfo() {
  qs("#info-list").innerHTML = profile.info
    .map(
      (item) => `
        <div>
          <dt>${escapeHtml(item.label)}</dt>
          <dd>${escapeHtml(item.value)}</dd>
        </div>
      `
    )
    .join("");
}

function renderSkills() {
  const tabs = qs("#skill-tabs");
  const grid = qs("#skills-grid");
  const categories = ["All", ...new Set(profile.skills.map((skill) => skill.category || "General"))];
  if (!categories.includes(activeSkillCategory)) activeSkillCategory = "All";

  tabs.innerHTML = categories
    .map(
      (category) => `
        <button type="button" role="tab" aria-selected="${category === activeSkillCategory}" data-skill-tab="${escapeHtml(category)}">
          ${escapeHtml(category)}
        </button>
      `
    )
    .join("");

  const visibleSkills =
    activeSkillCategory === "All"
      ? profile.skills
      : profile.skills.filter((skill) => skill.category === activeSkillCategory);

  grid.innerHTML = visibleSkills
    .map((skill) => {
      const icon = iconFor(skill.name, skill.icon);
      const fallback = initialsFromName(skill.name || "AI");
      const image = icon ? `<img src="${escapeHtml(icon)}" alt="" />` : "";
      return `
        <article class="skill-card reveal" data-skill-card>
          <div class="skill-top">
            <div class="skill-icon">${image}<span${image ? " hidden" : ""}>${escapeHtml(fallback)}</span></div>
            <span class="skill-level">${Math.max(0, Math.min(Number(skill.level) || 0, 100))}%</span>
          </div>
          <h3>${escapeHtml(skill.name)}</h3>
          <p>${escapeHtml(skill.note)}</p>
          <div class="meter" aria-label="${escapeHtml(skill.name)} level">
            <span style="width: ${Math.max(0, Math.min(Number(skill.level) || 0, 100))}%"></span>
          </div>
        </article>
      `;
    })
    .join("");

  qsa("[data-skill-tab]", tabs).forEach((button) => {
    button.addEventListener("click", () => {
      activeSkillCategory = button.dataset.skillTab;
      renderSkills();
      observeReveals();
    });
  });
}

function renderExperience() {
  qs("#experience-list").innerHTML = profile.experience
    .map((item) => {
      const bullets = String(item.bullets || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      return `
        <article class="experience-card reveal">
          <div class="experience-head">
            <div>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.company)}</p>
            </div>
            <span class="period-pill">${escapeHtml(item.period)}</span>
          </div>
          <ul>${bullets.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
          <div class="badge-row">${splitList(item.tech).map(badgeMarkup).join("")}</div>
        </article>
      `;
    })
    .join("");
}

function renderProjects() {
  qs("#project-grid").innerHTML = profile.projects
    .map((project) => {
      const tags = splitList(project.tech);
      const imageUrl = safeUrl(project.image || project.imageUrl || "");
      const title = project.link
        ? `<a href="${escapeHtml(safeUrl(project.link))}" target="_blank" rel="noreferrer">${escapeHtml(project.title)}</a>`
        : escapeHtml(project.title);
      const visual = imageUrl
        ? `<div class="project-visual has-image"><img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(project.title)} project preview" loading="lazy" /></div>`
        : `<div class="project-visual" aria-hidden="true"><div class="project-lines"><span></span><span></span><span></span></div></div>`;
      return `
        <article class="project-card reveal">
          ${visual}
          <div class="project-body">
            <div class="project-meta">
              <span>${escapeHtml(project.type)}</span>
              <span>${escapeHtml(project.year)}</span>
            </div>
            <h3>${title}</h3>
            <p>${escapeHtml(project.description)}</p>
            <div class="tag-list">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderAchievements() {
  qs("#achievement-list").innerHTML = profile.achievements
    .map(
      (item) => `
        <article class="achievement-card">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.detail)}</p>
        </article>
      `
    )
    .join("");
}

function renderFooter() {
  qs("#footer-copy").textContent = `${new Date().getFullYear()} ${profile.name}. All rights reserved.`;
  qs("#footer-links").innerHTML = profile.socials
    .filter((link) => link.label && link.url)
    .slice(0, 4)
    .map((link) => `<a href="${escapeHtml(safeUrl(link.url))}" target="_blank" rel="noreferrer">${socialIcon(link.label, link.url)}<span>${escapeHtml(link.label)}</span></a>`)
    .join("");
}

function renderSite() {
  bindText();
  renderActions();
  renderPhoto();
  renderInfo();
  renderSkills();
  renderExperience();
  renderProjects();
  renderAchievements();
  renderFooter();
  observeReveals();
}

function inputField(label, path, type = "text", full = false) {
  const value = getByPath(path) ?? "";
  return `
    <div class="field${full ? " full" : ""}">
      <label for="${path}">${label}</label>
      <input id="${path}" data-path="${path}" type="${type}" value="${escapeHtml(value)}" />
    </div>
  `;
}

function textAreaField(label, path, full = true) {
  const value = getByPath(path) ?? "";
  return `
    <div class="field${full ? " full" : ""}">
      <label for="${path}">${label}</label>
      <textarea id="${path}" data-path="${path}">${escapeHtml(value)}</textarea>
    </div>
  `;
}

function repeatedInput(label, path, value, type = "text", full = false) {
  return `
    <div class="field${full ? " full" : ""}">
      <label for="${path}">${label}</label>
      <input id="${path}" data-path="${path}" type="${type}" value="${escapeHtml(value ?? "")}" />
    </div>
  `;
}

function repeatedTextarea(label, path, value, full = true) {
  return `
    <div class="field${full ? " full" : ""}">
      <label for="${path}">${label}</label>
      <textarea id="${path}" data-path="${path}">${escapeHtml(value ?? "")}</textarea>
    </div>
  `;
}

function uploadField(label, path, accept, kind, full = true) {
  const id = `${path}-upload`.replaceAll(".", "-");
  return `
    <div class="field${full ? " full" : ""}">
      <label for="${id}">${label}</label>
      <input id="${id}" data-upload-path="${path}" data-upload-kind="${kind}" type="file" accept="${accept}" />
    </div>
  `;
}

function repeatCard(title, fields, removeAction) {
  return `
    <div class="repeat-card">
      <div class="repeat-card-top">
        <h3>${escapeHtml(title)}</h3>
        <button class="mini-button" type="button" data-remove="${removeAction}">Remove</button>
      </div>
      <div class="field-grid">${fields}</div>
    </div>
  `;
}

function renderEditorTabs() {
  const tabs = qs("#editor-tabs");
  tabs.innerHTML = editorSections
    .map(
      (section) => `
        <button type="button" role="tab" aria-selected="${section === activeEditorSection}" data-editor-tab="${section}">
          ${section}
        </button>
      `
    )
    .join("");

  qsa("[data-editor-tab]", tabs).forEach((button) => {
    button.addEventListener("click", () => {
      activeEditorSection = button.dataset.editorTab;
      renderEditor();
    });
  });
}

function renderProfileEditor() {
  return `
    <div class="field-grid">
      ${inputField("Name", "name")}
      ${inputField("Tagline", "tagline")}
      ${inputField("Role", "role", "text", true)}
      ${textAreaField("Hero Summary", "summary")}
      ${textAreaField("About", "about")}
      ${inputField("Focus", "focus")}
      ${inputField("Short Stack", "stackShort")}
      ${inputField("Status", "status")}
      ${inputField("Location", "location")}
      ${inputField("Email", "email", "email")}
      ${inputField("Phone", "phone", "tel")}
      ${inputField("Resume PDF URL", "resumeUrl", "url")}
      ${uploadField("Upload Resume PDF", "resumeUrl", "application/pdf", "resume")}
      ${inputField("Profile Photo URL", "profilePhoto", "url", true)}
      ${uploadField("Upload Profile Photo", "profilePhoto", "image/png,image/jpeg,image/webp,image/gif", "profile-photo")}
      ${textAreaField("Contact Note", "contactNote")}
    </div>
  `;
}

function renderLinksEditor() {
  const cards = profile.socials
    .map((item, index) =>
      repeatCard(
        item.label || `Link ${index + 1}`,
        `
          ${repeatedInput("Label", `socials.${index}.label`, item.label)}
          ${repeatedInput("URL", `socials.${index}.url`, item.url, "url")}
        `,
        `socials:${index}`
      )
    )
    .join("");
  return `<div class="repeat-list">${cards}<button class="add-button" type="button" data-add="socials">Add Link</button></div>`;
}

function renderInfoEditor() {
  const cards = profile.info
    .map((item, index) =>
      repeatCard(
        item.label || `Detail ${index + 1}`,
        `
          ${repeatedInput("Label", `info.${index}.label`, item.label)}
          ${repeatedInput("Value", `info.${index}.value`, item.value)}
        `,
        `info:${index}`
      )
    )
    .join("");
  return `<div class="repeat-list">${cards}<button class="add-button" type="button" data-add="info">Add Detail</button></div>`;
}

function renderSkillsEditor() {
  const cards = profile.skills
    .map((item, index) =>
      repeatCard(
        item.name || `Skill ${index + 1}`,
        `
          ${repeatedInput("Name", `skills.${index}.name`, item.name)}
          ${repeatedInput("Category", `skills.${index}.category`, item.category)}
          ${repeatedInput("Level", `skills.${index}.level`, item.level, "number")}
          ${repeatedInput("Icon URL", `skills.${index}.icon`, item.icon, "url", true)}
          ${repeatedTextarea("Note", `skills.${index}.note`, item.note)}
        `,
        `skills:${index}`
      )
    )
    .join("");
  return `<div class="repeat-list">${cards}<button class="add-button" type="button" data-add="skills">Add Skill</button></div>`;
}

function renderExperienceEditor() {
  const cards = profile.experience
    .map((item, index) =>
      repeatCard(
        item.title || `Experience ${index + 1}`,
        `
          ${repeatedInput("Title", `experience.${index}.title`, item.title)}
          ${repeatedInput("Company / Place", `experience.${index}.company`, item.company)}
          ${repeatedInput("Period", `experience.${index}.period`, item.period)}
          ${repeatedInput("Tech", `experience.${index}.tech`, item.tech, "text", true)}
          ${repeatedTextarea("Bullet Points", `experience.${index}.bullets`, item.bullets)}
        `,
        `experience:${index}`
      )
    )
    .join("");
  return `<div class="repeat-list">${cards}<button class="add-button" type="button" data-add="experience">Add Experience</button></div>`;
}

function renderProjectsEditor() {
  const cards = profile.projects
    .map((item, index) =>
      repeatCard(
        item.title || `Project ${index + 1}`,
        `
          ${repeatedInput("Title", `projects.${index}.title`, item.title)}
          ${repeatedInput("Type", `projects.${index}.type`, item.type)}
          ${repeatedInput("Year", `projects.${index}.year`, item.year)}
          ${repeatedInput("Tech", `projects.${index}.tech`, item.tech)}
          ${repeatedInput("Link", `projects.${index}.link`, item.link, "url", true)}
          ${repeatedInput("Image URL", `projects.${index}.image`, item.image || "", "url", true)}
          ${uploadField("Upload Project Image", `projects.${index}.image`, "image/png,image/jpeg,image/webp,image/gif", "project-image")}
          ${repeatedTextarea("Description", `projects.${index}.description`, item.description)}
        `,
        `projects:${index}`
      )
    )
    .join("");
  return `<div class="repeat-list">${cards}<button class="add-button" type="button" data-add="projects">Add Project</button></div>`;
}

function renderAchievementsEditor() {
  const cards = profile.achievements
    .map((item, index) =>
      repeatCard(
        item.title || `Achievement ${index + 1}`,
        `
          ${repeatedInput("Title", `achievements.${index}.title`, item.title)}
          ${repeatedTextarea("Detail", `achievements.${index}.detail`, item.detail)}
        `,
        `achievements:${index}`
      )
    )
    .join("");
  return `<div class="repeat-list">${cards}<button class="add-button" type="button" data-add="achievements">Add Achievement</button></div>`;
}

function renderAccessEditor() {
  return `
    <div class="field-grid">
      <div class="field full">
        <label for="new-owner-code">Special Code</label>
        <input id="new-owner-code" data-code-input type="password" value="${escapeHtml(ownerCode())}" inputmode="numeric" autocomplete="new-password" />
      </div>
    </div>
  `;
}

function renderEditor() {
  renderEditorTabs();
  const form = qs("#editor-form");
  const renderers = {
    Profile: renderProfileEditor,
    Links: renderLinksEditor,
    Info: renderInfoEditor,
    Stack: renderSkillsEditor,
    Experience: renderExperienceEditor,
    Projects: renderProjectsEditor,
    Wins: renderAchievementsEditor,
    Access: renderAccessEditor
  };

  form.innerHTML = renderers[activeEditorSection]();
  bindEditorEvents();
}

function addItem(collection) {
  const templates = {
    socials: { label: "New Link", url: "" },
    info: { label: "New Detail", value: "" },
    skills: { name: "New Skill", category: "Coding", level: 50, icon: "", note: "" },
    experience: { title: "New Experience", company: "", period: "", bullets: "", tech: "" },
    projects: { title: "New Project", type: "Web", year: "2026", description: "", tech: "", link: "", image: "" },
    achievements: { title: "New Achievement", detail: "" }
  };
  profile[collection].push(clone(templates[collection]));
  saveAndRefreshEditor();
}

function removeItem(action) {
  const [collection, index] = action.split(":");
  profile[collection].splice(Number(index), 1);
  saveAndRefreshEditor();
}

function saveAndRefreshEditor() {
  saveProfile();
  renderSite();
  renderEditor();
}

function bindEditorEvents() {
  qsa("[data-path]", qs("#editor-form")).forEach((input) => {
    input.addEventListener("input", () => {
      const value = input.type === "number" ? Number(input.value) : input.value;
      setByPath(input.dataset.path, value);
      saveProfile();
      renderSite();
    });
  });

  qsa("[data-upload-path]", qs("#editor-form")).forEach((input) => {
    input.addEventListener("change", () => uploadEditorFile(input));
  });

  qsa("[data-add]", qs("#editor-form")).forEach((button) => {
    button.addEventListener("click", () => addItem(button.dataset.add));
  });

  qsa("[data-remove]", qs("#editor-form")).forEach((button) => {
    button.addEventListener("click", () => removeItem(button.dataset.remove));
  });

  const codeInput = qs("[data-code-input]", qs("#editor-form"));
  if (codeInput) {
    codeInput.addEventListener("input", () => {
      localStorage.setItem(CODE_KEY, codeInput.value || DEFAULT_CODE);
      const status = qs("#save-status");
      if (status) status.textContent = "Code saved";
    });
  }
}

function openEditor() {
  const editor = qs("#editor");
  editor.classList.add("is-open");
  editor.setAttribute("aria-hidden", "false");
  window.setTimeout(() => qs(isUnlocked ? "#editor-form input, #editor-form textarea" : "#owner-code")?.focus(), 80);
}

function closeEditor() {
  const editor = qs("#editor");
  editor.classList.remove("is-open");
  editor.setAttribute("aria-hidden", "true");
}

function unlockEditor() {
  isUnlocked = true;

  const unlockForm = qs("#unlock-form");
  const workspace = qs("#editor-workspace");

  if (unlockForm) {
    unlockForm.style.display = "none";
    unlockForm.hidden = true;
  }

  if (workspace) {
    workspace.hidden = false;
    workspace.style.display = "grid";
  }

  qs("#editor-title").textContent = "Edit Portfolio";

  renderEditor();

  const status = qs("#save-status");

  if (status) {
    status.textContent = serverPersistence
      ? "Server autosave ready"
      : "Browser autosave ready";
  }
}

function bindEditorShell() {
  qs("#edit-toggle").addEventListener("click", openEditor);
  qs("#close-editor").addEventListener("click", closeEditor);

  qs("#editor").addEventListener("click", (event) => {
    if (event.target.id === "editor") closeEditor();
  });

  qs("#unlock-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = qs("#owner-code");
    const status = qs("#unlock-status");
    if (input.value === ownerCode() || input.value === DEFAULT_CODE) {
      localStorage.setItem(CODE_KEY, input.value || DEFAULT_CODE);
      status.textContent = "";
      unlockEditor();
    } else {
      status.textContent = "Code did not match";
    }
  });

  qs("#reset-profile").addEventListener("click", () => {
    if (!window.confirm("Reset portfolio details?")) return;
    profile = clone(DEFAULT_PROFILE);
    saveProfile();
    renderSite();
    renderEditor();
    qs("#save-status").textContent = "Defaults restored";
  });
}

function applyTheme() {
  const theme = localStorage.getItem(THEME_KEY) || "dark";
  document.body.classList.toggle("light", theme === "light");
}

function bindShell() {
  const header = qs("#site-header");
  const menuButton = qs("#menu-toggle");
  const themeButton = qs("#theme-toggle");

  applyTheme();

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  });

  menuButton.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  qsa("#menu-panel a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  themeButton.addEventListener("click", () => {
    const next = document.body.classList.contains("light") ? "dark" : "light";
    localStorage.setItem(THEME_KEY, next);
    applyTheme();
  });

  qs("#contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    qs("#form-status").textContent = "Message captured here. Use the email link to send it directly.";
    event.currentTarget.reset();
  });
}

function bindKeyboardPlay() {
  const panel = qs("#keyboard-panel");
  const count = qs("#key-count");
  const ignoredTags = new Set(["INPUT", "TEXTAREA", "SELECT"]);

  window.addEventListener("keydown", (event) => {
    if (ignoredTags.has(document.activeElement?.tagName)) return;
    const key = event.key === " " ? "Space" : event.key.slice(0, 8);
    if (!key || key === "Shift" || key === "Control" || key === "Alt" || key === "Meta") return;

    keyCount += 1;
    count.textContent = String(keyCount);

    const keyNode = document.createElement("span");
    keyNode.textContent = key.length === 1 ? key.toUpperCase() : key;
    keyNode.className = "key-pop";
    panel.prepend(keyNode);
    qsa("span", panel)
      .slice(10)
      .forEach((node) => node.remove());

    const cards = qsa("[data-skill-card]");
    const card = cards[keyCount % Math.max(cards.length, 1)];
    if (card) {
      card.classList.remove("is-pulsing");
      void card.offsetWidth;
      card.classList.add("is-pulsing");
    }

    window.dispatchEvent(new CustomEvent("portfolio:key"));
  });
}

function observeReveals() {
  if (!("IntersectionObserver" in window)) {
    qsa(".reveal").forEach((node) => node.classList.add("in-view"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );
  }

  qsa(".reveal:not(.in-view)").forEach((node) => revealObserver.observe(node));
}

function initCursor() {
  const ring = qs("#cursor-ring");
  const dot = qs("#cursor-dot");
  if (!ring || !dot) return;

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let ringX = targetX;
  let ringY = targetY;

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    dot.style.transform = `translate3d(${targetX - 4}px, ${targetY - 4}px, 0)`;
  });

  document.addEventListener("mouseover", (event) => {
    document.body.classList.toggle("cursor-hover", Boolean(event.target.closest("a, button, input, textarea, .cursor-can-hover")));
  });

  function animateCursor() {
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX - 25}px, ${ringY - 25}px, 0)`;
    requestAnimationFrame(animateCursor);
  }

  requestAnimationFrame(animateCursor);
}

function createTextSprite(text, color = "#39e6cf") {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(5, 8, 8, 0.76)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(240, 255, 252, 0.24)";
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
  ctx.fillStyle = color;
  ctx.font = "700 34px Consolas, monospace";
  ctx.fillText(text, 28, 76);
  const texture = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.78
    })
  );
  sprite.scale.set(2.6, 0.65, 1);
  return sprite;
}

function initThreeScene() {
  const canvas = qs("#neural-scene");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 1.1, 9);

  const group = new THREE.Group();
  scene.add(group);

  const ambient = new THREE.AmbientLight(0xffffff, 0.62);
  const key = new THREE.PointLight(0x39e6cf, 2.7, 28);
  key.position.set(3, 4, 5);
  const warm = new THREE.PointLight(0xf59e0b, 2.2, 30);
  warm.position.set(-5, -1, 3);
  scene.add(ambient, key, warm);

  const chipMaterial = new THREE.MeshStandardMaterial({
    color: 0x101817,
    metalness: 0.72,
    roughness: 0.28,
    emissive: 0x102d29,
    emissiveIntensity: 0.48
  });
  const chip = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.22, 2.4), chipMaterial);
  chip.rotation.x = -0.45;
  chip.rotation.z = 0.16;
  group.add(chip);

  const chipEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(chip.geometry),
    new THREE.LineBasicMaterial({ color: 0x39e6cf, transparent: true, opacity: 0.72 })
  );
  chip.add(chipEdges);

  const pinMaterial = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.65,
    roughness: 0.4,
    emissive: 0x33210a,
    emissiveIntensity: 0.25
  });
  for (let side = -1; side <= 1; side += 2) {
    for (let index = -5; index <= 5; index += 1) {
      const pinA = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.42), pinMaterial);
      pinA.position.set(index * 0.2, -0.02, side * 1.45);
      pinA.rotation.x = -0.45;
      group.add(pinA);

      const pinB = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.06, 0.08), pinMaterial);
      pinB.position.set(side * 1.45, -0.02, index * 0.2);
      pinB.rotation.x = -0.45;
      group.add(pinB);
    }
  }

  const keycaps = [];
  const keycapMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a2220,
    metalness: 0.25,
    roughness: 0.48,
    emissive: 0x071513,
    emissiveIntensity: 0.2
  });
  const capLabels = ["AI", "ML", "DSA", "WEB", "SQL", "PY"];
  capLabels.forEach((label, index) => {
    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.16, 0.42), keycapMaterial.clone());
    cap.position.set(-1.38 + index * 0.55, 0.28 + Math.sin(index) * 0.06, 0.18 + (index % 2) * 0.44);
    cap.rotation.x = -0.45;
    cap.rotation.z = 0.16;
    group.add(cap);
    keycaps.push(cap);
  });

  const nodeGeometry = new THREE.SphereGeometry(0.045, 12, 12);
  const nodeMaterial = new THREE.MeshStandardMaterial({
    color: 0x9cff6d,
    emissive: 0x2c7b24,
    emissiveIntensity: 0.8
  });
  const nodes = [];
  for (let index = 0; index < 52; index += 1) {
    const angle = index * 0.72;
    const radius = 2.45 + Math.sin(index * 1.7) * 0.82;
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    node.position.set(
      Math.cos(angle) * radius,
      Math.sin(index * 0.9) * 1.05 + 0.45,
      Math.sin(angle) * radius * 0.54
    );
    nodes.push(node);
    group.add(node);
  }

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x39e6cf,
    transparent: true,
    opacity: 0.22
  });
  const linePoints = [];
  nodes.forEach((node, index) => {
    const next = nodes[(index + 7) % nodes.length];
    linePoints.push(node.position, next.position);
  });
  const graphLines = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(linePoints), lineMaterial);
  group.add(graphLines);

  const traceMaterial = new THREE.LineBasicMaterial({
    color: 0xf59e0b,
    transparent: true,
    opacity: 0.22
  });
  const tracePoints = [];
  for (let i = -12; i <= 12; i += 1) {
    tracePoints.push(new THREE.Vector3(i * 0.42, -1.25, -2.6), new THREE.Vector3(i * 0.42, -1.25, 2.6));
    tracePoints.push(new THREE.Vector3(-4.7, -1.25, i * 0.24), new THREE.Vector3(4.7, -1.25, i * 0.24));
  }
  const traces = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(tracePoints), traceMaterial);
  traces.rotation.x = -0.35;
  group.add(traces);

  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 660;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let index = 0; index < particleCount; index += 1) {
    particlePositions[index * 3] = (Math.random() - 0.5) * 15;
    particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 8;
    particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 7;
  }
  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  const particles = new THREE.Points(
    particlesGeometry,
    new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.018,
      transparent: true,
      opacity: 0.56
    })
  );
  scene.add(particles);

  const snippets = [
    ["model.fit(x_train)", "#39e6cf"],
    ["loss.backward()", "#f59e0b"],
    ["class NeuralNet", "#9cff6d"],
    ["for epoch in range()", "#fb7185"],
    ["npm run dev", "#ffffff"]
  ].map(([text, color], index) => {
    const sprite = createTextSprite(text, color);
    sprite.position.set(Math.cos(index * 1.25) * 3.9, 1.2 + index * 0.14, Math.sin(index * 1.25) * 1.9);
    group.add(sprite);
    return sprite;
  });

  const pointer = { x: 0, y: 0 };
  let keyBoost = 0;
  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
  });
  window.addEventListener("portfolio:key", () => {
    keyBoost = 1;
  });

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const mobile = width < 760;
    group.position.set(mobile ? 0.8 : 2.35, mobile ? -0.48 : -0.08, 0);
    group.scale.setScalar(mobile ? 0.72 : 1);
  }

  function animate(time) {
    const t = time * 0.001;
    keyBoost *= 0.92;
    group.rotation.y = t * 0.15 + pointer.x * 0.08;
    group.rotation.x = -0.08 + pointer.y * 0.04;
    group.scale.multiplyScalar(1);
    chip.rotation.y = Math.sin(t * 0.5) * 0.16;
    chip.material.emissiveIntensity = 0.48 + keyBoost * 0.42;
    graphLines.rotation.y = -t * 0.08;
    traces.position.y = -1.12 + Math.sin(t * 1.4) * 0.05;
    particles.rotation.y = t * 0.026;
    particles.rotation.x = Math.sin(t * 0.2) * 0.04;
    nodes.forEach((node, index) => {
      node.scale.setScalar(1 + Math.sin(t * 2.2 + index) * 0.24 + keyBoost * 0.4);
    });
    keycaps.forEach((cap, index) => {
      cap.position.y = 0.28 + Math.sin(t * 1.8 + index) * 0.06 + keyBoost * (index % 2 ? 0.16 : 0.08);
      cap.material.emissiveIntensity = 0.2 + keyBoost * 0.55;
    });
    snippets.forEach((sprite, index) => {
      sprite.position.y += Math.sin(t + index) * 0.0008;
      sprite.material.opacity = 0.55 + Math.sin(t * 1.5 + index) * 0.18 + keyBoost * 0.16;
      sprite.lookAt(camera.position);
    });
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(animate);
}

profile = await loadProfile();
renderSite();
bindShell();
bindEditorShell();
bindKeyboardPlay();
initCursor();
initThreeScene();
