// ===== DATA (Proyectos) =====
const projects = [
  {
    id: "red-escolar",
    titleES: "Infraestructura de Red Escolar",
    titleEN: "School Network Infrastructure",
    category: "infra",
    summaryES: "Diseño e implementación de red LAN/WLAN para campus educativo de alta densidad.",
    summaryEN: "Design and deployment of LAN/WLAN infrastructure for high-density educational campus.",
    tags: ["Cisco", "VLANs", "Cableado Estructurado", "Mikrotik"],
    thumb: "/assets/images/network.png",
    detailES: `
      <h3>🚧 El Reto</h3>
      <p>La institución sufría de desconexiones constantes y lentitud debido a una red obsoleta no segmentada, afectando a más de 500 usuarios simultáneos (alumnos y administrativos).</p>
      
      <h3>🛠️ Solución Técnica</h3>
      <p>Se diseñó una topología de red jerárquica (Core, Distribución, Acceso) implementando segmentación lógica mediante <strong>VLANs</strong> para separar tráfico administrativo, académico y de invitados.</p>
      
      <h3>🚀 Desarrollo e Implementación</h3>
      <ul>
        <li><strong>Fase 1 - Auditoría:</strong> Mapeo físico de puertos y análisis de tráfico con Wireshark.</li>
        <li><strong>Fase 2 - Cableado:</strong> Instalación de cableado estructurado Cat6 certificado.</li>
        <li><strong>Fase 3 - Configuración:</strong> Configuración de Routers Mikrotik para balanceo de carga y gestión de ancho de banda (QoS).</li>
        <li><strong>Fase 4 - Seguridad:</strong> Implementación de filtrado MAC y portal cautivo para invitados.</li>
      </ul>

      <h3>📈 Impacto</h3>
      <p>Se logró una <strong>estabilidad del 99.9%</strong> en la red y una reducción del 70% en tickets de soporte relacionados con conectividad.</p>
    `,
    detailEN: `
      <h3>🚧 The Challenge</h3>
      <p>The institution suffered from constant disconnections and latency due to an obsolete flat network, affecting over 500 concurrent users.</p>
      
      <h3>🛠️ Technical Solution</h3>
      <p>Designed a hierarchical network topology implementing logical segmentation using <strong>VLANs</strong> to separate administrative, academic, and guest traffic.</p>
      
      <h3>🚀 Development & Deployment</h3>
      <ul>
        <li><strong>Phase 1 - Audit:</strong> Physical port mapping and traffic analysis using Wireshark.</li>
        <li><strong>Phase 2 - Cabling:</strong> Installation of certified Cat6 structured cabling.</li>
        <li><strong>Phase 3 - Config:</strong> Configuration of Mikrotik Routers for load balancing and QoS.</li>
        <li><strong>Phase 4 - Security:</strong> MAC filtering implementation and captive portal for guests.</li>
      </ul>

      <h3>📈 Impact</h3>
      <p>Achieved <strong>99.9% network uptime</strong> and a 70% reduction in connectivity-related support tickets.</p>
    `,
    demo: "", repo: ""
  },
  {
    id: "sistema-calificaciones",
    titleES: "Core de Datos Académicos",
    titleEN: "Academic Data Core",
    category: "db",
    summaryES: "Administración y optimización de base de datos SQL para sistema crítico de calificaciones.",
    summaryEN: "SQL database administration and optimization for critical grading system.",
    tags: ["SQL Server", "Integridad de Datos", "Stored Procedures"],
    thumb: "/assets/images/grading.png",
    detailES: `
      <h3>🚧 El Reto</h3>
      <p>El sistema anterior presentaba inconsistencias en los historiales académicos y tiempos de consulta lentos durante los periodos de evaluación final.</p>
      
      <h3>💻 Ingeniería de Datos</h3>
      <p>Se normalizó la base de datos para eliminar redundancias y se implementaron <strong>Stored Procedures</strong> para la lógica de negocio compleja, asegurando transaccionalidad ACID.</p>
      
      <h3>⚙️ Desarrollo</h3>
      <ul>
        <li>Optimización de índices para acelerar consultas de reportes (de 30s a <2s).</li>
        <li>Implementación de triggers para auditoría de cambios en calificaciones.</li>
        <li>Desarrollo de scripts de backup automatizados y plan de recuperación ante desastres (DRP).</li>
      </ul>

      <h3>🛡️ Resultados</h3>
      <p>Integridad de datos al 100% garantizada y generación de boletas automatizada en tiempo récord.</p>
    `,
    detailEN: `
      <h3>🚧 The Challenge</h3>
      <p>The legacy system had inconsistencies in academic records and slow query times during final evaluation periods.</p>
      
      <h3>💻 Data Engineering</h3>
      <p>Normalized the database to remove redundancy and implemented <strong>Stored Procedures</strong> for complex business logic, ensuring ACID transactions.</p>
      
      <h3>⚙️ Development</h3>
      <ul>
        <li>Index optimization to speed up report queries (from 30s to <2s).</li>
        <li>Trigger implementation for auditing grade changes.</li>
        <li>Development of automated backup scripts and Disaster Recovery Plan (DRP).</li>
      </ul>

      <h3>🛡️ Results</h3>
      <p>100% data integrity guaranteed and automated report card generation in record time.</p>
    `,
    demo: "", repo: ""
  },
  {
    id: "plataforma-virtual",
    titleES: "LMS Plataforma Virtual",
    titleEN: "Virtual LMS Platform",
    category: "web",
    summaryES: "Desarrollo y despliegue de plataforma personalizada de aprendizaje durante la contingencia.",
    summaryEN: "Development and deploying of custom learning platform during contingency.",
    tags: ["Vue.js", "PHP", "MySQL", "UX/UI"],
    thumb: "/assets/images/platform.png",
    detailES: `
      <h3>🚧 El Reto</h3>
      <p>Necesidad urgente de migrar 100% clases presenciales a remoto sin perder la capacidad de seguimiento académico personalizado.</p>
      
      <h3>🎨 Diseño y Arquitectura</h3>
      <p>Se optó por una arquitectura <strong>SPA (Single Page Application)</strong> con Vue.js para una experiencia fluida, consumiendo una API RESTful en PHP.</p>
      
      <h3>👨‍💻 Stack y Desarrollo</h3>
      <ul>
        <li><strong>Frontend:</strong> Vue.js + Vuex para gestión de estado (sesiones, cursos).</li>
        <li><strong>Backend:</strong> PHP nativo optimizado para alta concurrencia.</li>
        <li><strong>DB:</strong> MySQL con diseño relacional eficiente para foros, tareas y exámenes.</li>
      </ul>

      <h3>🌟 Logro Clave</h3>
      <p>Despliegue en 3 semanas, soportando +1000 usuarios activos diarios sin caídas del servicio.</p>
    `,
    detailEN: `
      <h3>🚧 The Challenge</h3>
      <p>Urgent need to migrate 100% of classes to remote without losing personalized academic tracking capabilities.</p>
      
      <h3>🎨 Design & Architecture</h3>
      <p>Chose a <strong>SPA (Single Page Application)</strong> architecture with Vue.js for a fluid experience, consuming a PHP RESTful API.</p>
      
      <h3>👨‍💻 Stack & Development</h3>
      <ul>
        <li><strong>Frontend:</strong> Vue.js + Vuex for state management.</li>
        <li><strong>Backend:</strong> Native PHP optimized for high concurrency.</li>
        <li><strong>DB:</strong> MySQL with efficient relational design for forums, tasks, and exams.</li>
      </ul>

      <h3>🌟 Key Achievement</h3>
      <p>Deployed in 3 weeks, supporting +1000 daily active users with zero downtime.</p>
    `,
    demo: "", repo: ""
  },
  {
    id: "vps-ubuntu",
    titleES: "Despliegue VPS Linux",
    titleEN: "Linux VPS Deployment",
    category: "infra",
    summaryES: "Orquestación de servicios en servidor Vultr/DigitalOcean para alojamiento web.",
    summaryEN: "Service orchestration on Vultr/DigitalOcean servers for web hosting.",
    tags: ["Ubuntu Server", "Nginx", "SSL/Certbot", "Bash"],
    thumb: "/assets/images/vps.png",
    detailES: `
      <h3>🚧 El Reto</h3>
      <p>Migrar aplicaciones de hosting compartido lento a una infraestructura dedicada, escalable y segura.</p>
      
      <h3>🐧 Implementación SysAdmin</h3>
      <ul>
        <li>Provisionamiento de Droplets/Instancias en la nube.</li>
        <li>Hardening de seguridad: Configuración de firewall UFW, deshabilitación de root login, SSH keys.</li>
        <li>Configuración de stack LEMP (Linux, Nginx, MySQL, PHP).</li>
        <li>Automatización de certificados SSL gratuitos con <strong>Certbot (Let's Encrypt)</strong>.</li>
      </ul>

      <h3>⚡ Resultado</h3>
      <p>Mejora del 300% en tiempos de respuesta del servidor (TTFB) y control total sobre la configuración del entorno.</p>
    `,
    detailEN: `
      <h3>🚧 The Challenge</h3>
      <p>Migrate applications from slow shared hosting to dedicated, scalable, and secure infrastructure.</p>
      
      <h3>🐧 SysAdmin Implementation</h3>
      <ul>
        <li>Provisioning of Cloud Droplets/Instances.</li>
        <li>Security Hardening: UFW firewall config, disable root login, SSH keys.</li>
        <li>LEMP Stack Configuration (Linux, Nginx, MySQL, PHP).</li>
        <li>Automated free SSL certificates with <strong>Certbot (Let's Encrypt)</strong>.</li>
      </ul>

      <h3>⚡ Result</h3>
      <p>300% improvement in Time to First Byte (TTFB) and full control over environment configuration.</p>
    `,
    demo: "", repo: ""
  },
  {
    id: "iot-embedded",
    titleES: "Prototipado IoT/Electrónica",
    titleEN: "IoT/Electronics Prototyping",
    category: "iot",
    summaryES: "Integración de hardware y software para soluciones de automatización simples.",
    summaryEN: "Hardware and software integration for simple automation solutions.",
    tags: ["C++", "Arduino/ESP32", "Sensores", "MQTT"],
    thumb: "/assets/images/iot.png",
    detailES: `
      <h3>🚧 El Proyecto</h3>
      <p>Desarrollo de sistemas de monitoreo ambiental y control de acceso utilizando microcontroladores de bajo costo.</p>
      
      <h3>🔌 Desarrollo Técnico</h3>
      <ul>
        <li>Programación de firmware en C++ para ESP8266/ESP32.</li>
        <li>Diseño de circuitos impresos (PCB) básicos y soldadura de componentes.</li>
        <li>Comunicación vía protocolo <strong>MQTT</strong> para enviar telemetría a un dashboard web central.</li>
        <li>Modelado e impresión 3D de carcasas para los dispositivos.</li>
      </ul>

      <h3>💡 Aplicación</h3>
      <p>Demostración práctica de la convergencia entre el mundo físico y digital (Sistemas Ciberfísicos).</p>
    `,
    detailEN: `
      <h3>🚧 The Project</h3>
      <p>Development of environmental monitoring and access control systems using low-cost microcontrollers.</p>
      
      <h3>🔌 Technical Development</h3>
      <ul>
        <li>C++ firmware programming for ESP8266/ESP32.</li>
        <li>Basic PCB design and component soldering.</li>
        <li>Communication via <strong>MQTT</strong> protocol to send telemetry to a central web dashboard.</li>
        <li>3D modeling and printing of device enclosures.</li>
      </ul>

      <h3>💡 Application</h3>
      <p>Practical demonstration of the convergence between the physical and digital worlds (Cyber-Physical Systems).</p>
    `,
    demo: "", repo: ""
  }
];

// ===== i18n Dictionary =====
const i18n = {
  es: {
    brandName: "Iván Carapia Barajas",
    brandRole: "Infraestructura TI · Desarrollo Web",
    statusReady: "Disponible para nuevos proyectos",
    kpiYears: "Años de experiencia",
    kpiFocus: "Infraestructura / Web",
    kpiImpact: "Optimización (caso)",
    kpiNetwork: "Implementación red",
    heroTitle: "Iván Carapia Barajas",
    heroSubtitle: "Administrador de Infraestructura TI y Sistemas · Desarrollo Web",
    ctaCV: "Descargar CV",
    ctaPortfolio: "Ver Portafolio",
    ctaContact: "Contáctame",
    skillsTitle: "Habilidades",
    skillsDesc: "Resumen técnico por dominios.",
    portTitle: "Portafolio destacado",
    cvTitle: "Curriculum Vitae",
    cvDownload: "Descargar PDF",
    copyBtn: "Copiar",
    modalDescLabel: "Descripción del Proyecto",
    modalTechLabel: "Tecnologías"
  },
  en: {
    brandName: "Iván Carapia Barajas",
    brandRole: "IT Infrastructure · Web Development",
    statusReady: "Available for new projects",
    kpiYears: "Years of experience",
    kpiFocus: "Infrastructure / Web",
    kpiImpact: "Impact (case study)",
    kpiNetwork: "Network deployment",
    heroTitle: "Iván Carapia Barajas",
    heroSubtitle: "IT Infrastructure & Systems Administrator · Web Dev",
    ctaCV: "Download Resume",
    ctaPortfolio: "View Portfolio",
    ctaContact: "Contact Me",
    skillsTitle: "Skills",
    skillsDesc: "Technical domain summary.",
    portTitle: "Featured Portfolio",
    cvTitle: "Professional Resume",
    cvDownload: "Download PDF",
    copyBtn: "Copy",
    modalDescLabel: "Project Description",
    modalTechLabel: "Tech Stack"
  }
};

let lang = "es";
let filter = "all";

// ===== UI Logic =====
function applyI18n() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  document.getElementById("btnES").classList.toggle("active", lang === "es");
  document.getElementById("btnEN").classList.toggle("active", lang === "en");
  renderProjects();
}

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  const term = (document.getElementById("q").value || "").toLowerCase();
  const list = projects.filter(p => {
    const matchFilter = (filter === "all") || (p.category === filter);
    const title = (lang === "es" ? p.titleES : p.titleEN).toLowerCase();
    return matchFilter && title.includes(term);
  });

  grid.innerHTML = list.map(p => `
        <article class="project tilt-card" data-cat="${p.category}">
            <div class="thumb" aria-hidden="true">
                ${p.thumb ? `<img src="${p.thumb}" alt="thumb" style="width:100%; height:100%; object-fit:cover; border-radius:14px;">` : ''}
            </div>
            <h4>${lang === "es" ? p.titleES : p.titleEN}</h4>
            <p>${lang === "es" ? p.summaryES : p.summaryEN}</p>
            <div class="tags">${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}</div>
            <div class="projActions">
                <button class="linkBtn" type="button" onclick="openModalById('${p.id}')">
                    ${lang === "es" ? "Caso de estudio" : "Case study"}
                </button>
            </div>
        </article>
    `).join("");
  initTilt();
}

function openModalById(id) {
  const p = projects.find(x => x.id === id);
  if (!p) return;

  document.getElementById("modalTitle").textContent = lang === "es" ? p.titleES : p.titleEN;
  document.getElementById("modalImageArea").innerHTML = p.thumb ? `<img src="${p.thumb}" style="width:100%; height:100%; object-fit:cover;">` : "";
  document.getElementById("modalMeta").innerHTML = (p.tags || []).map(t => `<span class="modalTechTag">${t}</span>`).join("");
  document.getElementById("modalText").innerHTML = lang === "es" ? p.detailES : p.detailEN;

  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ===== Interactive Effects =====
function animateCounters() {
  document.querySelectorAll(".counter").forEach(counter => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    if (count < target) {
      counter.innerText = Math.ceil(count + (target / 30));
      setTimeout(animateCounters, 30);
    } else {
      counter.innerText = target;
    }
  });
}

function initTilt() {
  document.querySelectorAll(".tilt-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y - (rect.height / 2)) / 10;
      const rotateY = ((rect.width / 2) - x) / 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener("mouseleave", () => card.style.transform = "none");
  });
}

// Glow
document.addEventListener("mousemove", (e) => {
  const glow = document.getElementById("mouseGlow");
  if (glow) {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }
});

// Scroll Progress
window.addEventListener("scroll", () => {
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  document.getElementById("scrollProgress").style.width = scrolled + "%";
});

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      if (entry.target.classList.contains("hero")) animateCounters();
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal, .timeline-item").forEach(el => observer.observe(el));

// Toast & Copy
function showToast(msg) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = msg;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

document.querySelectorAll("[data-copy]").forEach(btn => {
  btn.addEventListener("click", async () => {
    const text = document.querySelector(btn.dataset.copy)?.innerText.trim();
    if (text) {
      await navigator.clipboard.writeText(text);
      showToast(lang === "es" ? "¡Copiado!" : "Copied!");
    }
  });
});

// Prefs
// Prefs
function savePrefs() { localStorage.setItem("cv_prefs", JSON.stringify({ lang })); }
function loadPrefs() {
  const saved = localStorage.getItem("cv_prefs");
  if (saved) {
    const p = JSON.parse(saved);
    lang = p.lang || "es";
    applyI18n();
  }
}

// Init
document.getElementById("btnES").onclick = () => { lang = "es"; applyI18n(); savePrefs(); };
document.getElementById("btnEN").onclick = () => { lang = "en"; applyI18n(); savePrefs(); };
// Theme button removed
document.getElementById("modalClose").onclick = closeModal;
document.getElementById("modalClose").onclick = closeModal;
document.getElementById("q").oninput = renderProjects;

document.getElementById("year").textContent = new Date().getFullYear();
loadPrefs();
if (!localStorage.getItem("cv_prefs")) applyI18n();
window.openModalById = openModalById; // Export for onclick

// ===== Mobile Hamburger Menu =====
const hamburger = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });
}
