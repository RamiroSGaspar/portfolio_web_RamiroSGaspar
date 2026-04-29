"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Language = "es" | "en"

type Dictionary = Record<string, string>

const es: Dictionary = {
  // Header / profile
  "profile.role": "Data Scientist",
  "profile.tagline": "Análisis de datos & pensamiento crítico",
  "profile.location": "Salta, Argentina",
  "profile.university": "UCASAL",
  "profile.cta.contact": "Contactar",
  "profile.cta.cv": "Descargar CV",
  "profile.email.copied": "Correo copiado",
  "profile.availability": "Abierto a oportunidades interesantes",

  // Section tabs
  "section.about": "Sobre Mí",
  "section.skills": "Habilidades",
  "section.experience": "Experiencia",
  "section.education": "Educación",
  "section.contact": "Contacto",

  // About copy
  "about.p1.prefix": "Estudio ",
  "about.p1.field": "Ciencia de Datos",
  "about.p1.in": " en la ",
  "about.p1.uni": "UCASAL",
  "about.p1.tools": ". Trabajo principalmente con ",
  "about.p1.python": "Python",
  "about.p1.sep1": ", ",
  "about.p1.sql": "SQL",
  "about.p1.sep2": " y ",
  "about.p1.pandas": "Pandas",
  "about.p1.body":
    ", pero lo técnico es solo una parte. También aplico pensamiento analítico, diseño metodológico y criterio propio para decidir qué preguntar y cómo responderlo.",
  "about.p2":
    "Lo que más me interesa no son las herramientas sino las preguntas que puedo responder con ellas. Me atraen los temas que generan debate, los que merecen ser mirados con datos y no solo con opiniones.",
  "about.p3":
    "Cuando algo no me cierra, quiero ver qué dicen los números, y si me contradicen, mejor, porque de eso se aprende. Estoy construyendo mis primeros proyectos con esa mentalidad.",
  "about.p4":
    "Puedo tomar un problema, diseñar cómo recopilar los datos, limpiarlos, analizarlos y comunicar resultados claros a personas técnicas y no técnicas. Busco oportunidades donde pueda aportar eso desde el día uno.",

  // Skills
  "skills.languages": "Lenguajes de Programación",
  "skills.analysis": "Análisis y Visualización",
  "skills.tools": "Herramientas",
  "skills.languagesSpoken": "Idiomas",
  "skills.spanish": "Español",
  "skills.spanish.level": "Nativo",
  "skills.english": "Inglés",
  "skills.english.level": "Competitivo",

  // Experience
  "experience.bewise.role": "Programador Backend",
  "experience.bewise.company": "Bewise Argentina · Pasantía (Remoto)",
  "experience.bewise.dates": "Agosto - Noviembre 2024",
  "experience.bewise.b1": "Desarrollo y mantenimiento de soluciones backend",
  "experience.bewise.b2": "Uso de Java con Spring Boot y bases de datos SQL",
  "experience.bewise.b3": "Trabajo remoto con metodologías ágiles",
  "experience.museo.role": "Programador",
  "experience.museo.company": "Museo Güemes · Pasantía",
  "experience.museo.dates": "Mayo - Agosto 2024",
  "experience.museo.b1": "Sistema multimedia con Python y Raspberry Pi",
  "experience.museo.b2": "Configuración de Debian y protocolos UDP/TCP",
  "experience.museo.b3": "Presentación ante directivos y documentación",

  // Education
  "edu.ucasal.title": "Licenciatura en Ciencia de Datos",
  "edu.ucasal.org": "Universidad Católica de Salta (UCASAL)",
  "edu.ucasal.status": "En curso · Modalidad online (2025)",
  "edu.tec3.title": "Técnico Informático Profesional y Personal",
  "edu.tec3.org": "Escuela de Educación Técnica N° 3139 \"Gral. M. M. de Güemes\"",
  "edu.tec3.status": "Finalizado (2021 - 2024)",

  // Contact
  "contact.linkedin": "Perfil de LinkedIn",

  // Blog
  "blog.title": "Blog & Actualizaciones",
  "blog.subtitle": "Proyectos, eventos y experiencias",
  "blog.filter.all": "Todos",
  "blog.filter.projects": "Proyectos",
  "blog.filter.events": "Eventos",
  "blog.filter.experiences": "Experiencias",
  "blog.empty": "No hay publicaciones con esta etiqueta aún.",
  "blog.note":
    "Pronto estaré publicando contenido sobre proyectos, eventos y experiencias. Mantente atento a las actualizaciones.",
  "blog.readMore": "Leer más",

  // Tags
  "tag.project": "Proyecto",
  "tag.event": "Evento",
  "tag.experience": "Experiencia",

  // Modals - shared
  "modal.close": "Cerrar",

  // Project modal
  "modal.project.start": "Inicio",
  "modal.project.inProgress": "En Curso",
  "modal.project.completed": "Completado",
  "modal.project.viewGithub": "Ver en GitHub",
  "modal.project.viewDemo": "Ver Demo",
  "modal.project.preview": "Vista del Proyecto",
  "modal.project.stack": "Stack Tecnológico",
  "modal.project.versions": "Historial de Versiones",
  "modal.project.timeline": "Línea de Tiempo",
  "modal.project.challenges": "Desafíos y Soluciones",
  "modal.project.learnings": "Aprendizajes Clave",
  "modal.project.future": "Próximas Actualizaciones",

  // Event modal
  "modal.event.about": "Sobre el Evento",
  "modal.event.gallery": "Galería de Fotos",
  "modal.event.highlights": "Puntos Destacados",
  "modal.event.social": "Publicaciones en Redes",
  "modal.event.viewOn": "Ver en",
  "modal.event.learnings": "Lo que Aprendí",
  "modal.event.networking": "Networking",

  // Experience modal
  "modal.exp.description": "Descripción",
  "modal.exp.responsibilities": "Responsabilidades",
  "modal.exp.achievements": "Logros Destacados",
  "modal.exp.skills": "Habilidades",
  "modal.exp.gallery": "Fotos del Trabajo",
}

const en: Dictionary = {
  "profile.role": "Data Scientist",
  "profile.tagline": "Data analysis & critical thinking",
  "profile.location": "Salta, Argentina",
  "profile.university": "UCASAL",
  "profile.cta.contact": "Get in touch",
  "profile.cta.cv": "Download CV",
  "profile.email.copied": "Email copied",
  "profile.availability": "Open to interesting opportunities",

  "section.about": "About",
  "section.skills": "Skills",
  "section.experience": "Experience",
  "section.education": "Education",
  "section.contact": "Contact",

  "about.p1.prefix": "I'm studying ",
  "about.p1.field": "Data Science",
  "about.p1.in": " at ",
  "about.p1.uni": "UCASAL",
  "about.p1.tools": ". I mostly work with ",
  "about.p1.python": "Python",
  "about.p1.sep1": ", ",
  "about.p1.sql": "SQL",
  "about.p1.sep2": " and ",
  "about.p1.pandas": "Pandas",
  "about.p1.body":
    ", but tooling is only part of the picture. I also bring analytical thinking, methodological design and judgment to decide what to ask and how to answer it.",
  "about.p2":
    "What interests me most is not the tools but the questions I can answer with them. I'm drawn to topics that spark debate — the ones worth looking at with data, not just opinions.",
  "about.p3":
    "When something doesn't add up, I want to see what the numbers say. If they contradict me, even better — that's where the learning happens. I'm building my first projects with that mindset.",
  "about.p4":
    "I can take a problem, design how to collect the data, clean it, analyze it and communicate clear results to both technical and non-technical audiences. I'm looking for opportunities where I can contribute that from day one.",

  "skills.languages": "Programming Languages",
  "skills.analysis": "Analysis & Visualization",
  "skills.tools": "Tools",
  "skills.languagesSpoken": "Languages",
  "skills.spanish": "Spanish",
  "skills.spanish.level": "Native",
  "skills.english": "English",
  "skills.english.level": "Professional working",

  "experience.bewise.role": "Backend Developer",
  "experience.bewise.company": "Bewise Argentina · Internship (Remote)",
  "experience.bewise.dates": "August - November 2024",
  "experience.bewise.b1": "Backend solutions development and maintenance",
  "experience.bewise.b2": "Java with Spring Boot and SQL databases",
  "experience.bewise.b3": "Remote work with agile methodologies",
  "experience.museo.role": "Developer",
  "experience.museo.company": "Güemes Museum · Internship",
  "experience.museo.dates": "May - August 2024",
  "experience.museo.b1": "Multimedia system with Python and Raspberry Pi",
  "experience.museo.b2": "Debian setup and UDP/TCP protocols",
  "experience.museo.b3": "Presentation to stakeholders and documentation",

  "edu.ucasal.title": "B.Sc. in Data Science",
  "edu.ucasal.org": "Catholic University of Salta (UCASAL)",
  "edu.ucasal.status": "Ongoing · Online (2025)",
  "edu.tec3.title": "Professional & Personal IT Technician",
  "edu.tec3.org": "Technical School Nº 3139 \"Gral. M. M. de Güemes\"",
  "edu.tec3.status": "Completed (2021 - 2024)",

  "contact.linkedin": "LinkedIn Profile",

  "blog.title": "Blog & Updates",
  "blog.subtitle": "Projects, events and experiences",
  "blog.filter.all": "All",
  "blog.filter.projects": "Projects",
  "blog.filter.events": "Events",
  "blog.filter.experiences": "Experiences",
  "blog.empty": "No posts under this tag yet.",
  "blog.note":
    "I'll be publishing content about projects, events and experiences soon. Stay tuned for updates.",
  "blog.readMore": "Read more",

  "tag.project": "Project",
  "tag.event": "Event",
  "tag.experience": "Experience",

  "modal.close": "Close",

  "modal.project.start": "Start",
  "modal.project.inProgress": "In progress",
  "modal.project.completed": "Completed",
  "modal.project.viewGithub": "View on GitHub",
  "modal.project.viewDemo": "View Demo",
  "modal.project.preview": "Project preview",
  "modal.project.stack": "Tech Stack",
  "modal.project.versions": "Version history",
  "modal.project.timeline": "Timeline",
  "modal.project.challenges": "Challenges & Solutions",
  "modal.project.learnings": "Key learnings",
  "modal.project.future": "Upcoming updates",

  "modal.event.about": "About the event",
  "modal.event.gallery": "Photo gallery",
  "modal.event.highlights": "Highlights",
  "modal.event.social": "Social posts",
  "modal.event.viewOn": "View on",
  "modal.event.learnings": "What I learned",
  "modal.event.networking": "Networking",

  "modal.exp.description": "Description",
  "modal.exp.responsibilities": "Responsibilities",
  "modal.exp.achievements": "Highlights",
  "modal.exp.skills": "Skills",
  "modal.exp.gallery": "Workplace photos",
}

const dictionaries: Record<Language, Dictionary> = { es, en }

type LanguageContextValue = {
  lang: Language
  setLang: (l: Language) => void
  t: (key: keyof typeof es) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "portfolio.lang"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("es")

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null
      if (stored === "es" || stored === "en") {
        setLangState(stored)
        return
      }
      const browser = window.navigator.language?.toLowerCase() ?? ""
      if (browser.startsWith("en")) setLangState("en")
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
      document.documentElement.lang = lang
    } catch {
      // ignore
    }
  }, [lang])

  const setLang = (l: Language) => setLangState(l)
  const t = (key: keyof typeof es) => dictionaries[lang][key] ?? dictionaries.es[key] ?? String(key)

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider")
  return ctx
}
