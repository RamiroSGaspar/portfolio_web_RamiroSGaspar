"use client"

import { useState, useRef, useEffect } from "react"
import portfolioData from "@/data/portfolio.json"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Mail,
  MapPin,
  GraduationCap,
  Github,
  Linkedin,
  Download,
  Code2,
  BookOpen,
  Calendar,
  ArrowRight,
  ImageIcon,
  Tag,
  X,
  ExternalLink,
  Clock,
  Award,
  Code,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  History,
  AlertCircle,
  Lightbulb,
  Rocket,
  Circle,
} from "lucide-react"

// Componente de fondo animado con redes neuronales
function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const nodes: { x: number; y: number; vx: number; vy: number }[] = []
    const nodeCount = 50

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      })
    }

    function animate() {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node, i) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        ctx.beginPath()
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(251, 146, 60, 0.4)"
        ctx.fill()

        nodes.forEach((otherNode, j) => {
          if (i === j) return

          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            const opacity = (1 - distance / 150) * 0.2
            ctx.strokeStyle = `rgba(251, 146, 60, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const contentRef = useRef<HTMLDivElement>(null)
  const [blogFilter, setBlogFilter] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)

  const [selectedStudy, setSelectedStudy] = useState<number | null>(null)
  const [selectedPost, setSelectedPost] = useState<any>(null) // Para gestionar la visualización de post individuales
  const [isProfileImageOpen, setIsProfileImageOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("gapsar.sebastian@gmail.com")
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  const sections = {
    about: {
      title: "Sobre Mí",
      icon: <GraduationCap className="w-4 h-4" />,
      content: (
        <div className="space-y-4 text-justify">
          <p className="text-muted-foreground leading-relaxed">
            Mi interés por la <span className="text-orange-500 font-semibold">Ciencia de Datos</span> surgió a partir 
            de mi formación técnica en informática, donde descubrí que lo que más me motivaba era trabajar con 
            <span className="text-orange-500 font-semibold"> datos</span> y entender sus relaciones en un contexto real. 
            Disfruto escribir y optimizar consultas <span className="text-orange-500 font-semibold">SQL</span>, estructurar 
            programas en <span className="text-orange-500 font-semibold">Python</span> y analizar resultados, buscando 
            siempre que los datos obtenidos sean correctos, útiles y bien interpretados.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Actualmente estudio la Licenciatura en Ciencias de Datos y continúo formándome en 
            <span className="text-orange-500 font-semibold"> SQL</span>, 
            <span className="text-orange-500 font-semibold"> NumPy</span> y 
            <span className="text-orange-500 font-semibold"> Pandas</span>, con el objetivo de desarrollar proyectos 
            de análisis de datos que aporten valor y ayuden a la <span className="text-orange-500 font-semibold">toma de decisiones</span>.
          </p>
        </div>
      ),
    },
    skills: {
      title: "Habilidades",
      icon: <Code2 className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Lenguajes de Programación</h4>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/50 border border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                  alt="Python"
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium text-zinc-200">Python</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/50 border border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
                  alt="SQL"
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium text-zinc-200">SQL</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/50 border border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                  alt="JavaScript"
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium text-zinc-200">JavaScript</span>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold mb-3">Análisis y Visualización</h4>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/50 border border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg"
                  alt="Pandas"
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium text-zinc-200">Pandas</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/50 border border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg"
                  alt="NumPy"
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium text-zinc-200">NumPy</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/50 border border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg"
                  alt="Matplotlib"
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium text-zinc-200">Matplotlib</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/50 border border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300">
                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M28 4H10C8.9 4 8 4.9 8 6V42C8 43.1 8.9 44 10 44H38C39.1 44 40 43.1 40 42V16L28 4Z"
                    fill="#21A366"
                  />
                  <path d="M28 4V16H40L28 4Z" fill="#107C41" />
                  <path d="M16 22L20 28L16 34H24L28 28L24 22H16Z" fill="white" />
                  <path opacity="0.5" d="M16 22L20 28L16 34H24L28 28L24 22H16Z" fill="#107C41" />
                </svg>
                <span className="text-sm font-medium text-zinc-200">Excel</span>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold mb-3">Herramientas</h4>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/50 border border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                  alt="GitHub"
                  className="w-5 h-5 invert"
                />
                <span className="text-sm font-medium text-zinc-200">GitHub</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/50 border border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" fill="#DD4814" />
                  <circle cx="5.5" cy="12" r="2.2" fill="white" />
                  <circle cx="18.5" cy="12" r="2.2" fill="white" />
                  <circle cx="12" cy="5.5" r="2.2" fill="white" />
                  <path d="M12 7.7C12 8.4 11.4 9 10.7 9L9.5 12H14.5L13.3 9C12.6 9 12 8.4 12 7.7Z" fill="white" />
                  <path d="M7.7 12C8.4 12 9 12.6 9 13.3L12 14.5V9.5L9 10.7C9 11.4 8.4 12 7.7 12Z" fill="white" />
                  <path
                    d="M16.3 12C15.6 12 15 11.4 15 10.7L12 9.5V14.5L15 13.3C15 12.6 15.6 12 16.3 12Z"
                    fill="white"
                  />
                  <circle cx="12" cy="12" r="1.8" fill="white" />
                </svg>
                <span className="text-sm font-medium text-zinc-200">Ubuntu</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    experience: {
      title: "Experiencia",
      icon: <Briefcase className="w-4 h-4" />, // Changed icon to Briefcase for consistency
      content: (
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <img
                src="/bewise-logo.jpeg"
                alt="Bewise Logo"
                className="w-12 h-12 rounded-lg object-cover border border-orange-500/30"
              />
              <div className="flex-1">
                <h4 className="font-semibold">Programador Backend</h4>
                <p className="text-sm text-muted-foreground">Bewise Argentina - Pasantía (Remoto)</p>
                <p className="text-xs text-muted-foreground">Agosto - Noviembre 2024</p>
              </div>
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground ml-4">
              <li>• Desarrollo y mantenimiento de soluciones backend</li>
              <li>• Uso de Java con Spring Boot y bases de datos SQL</li>
              <li>• Trabajo remoto con metodologías ágiles</li>
            </ul>
          </div>
          <Separator />
          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <img
                src="/museo-guemes.jpeg"
                alt="Museo Güemes"
                className="w-12 h-12 rounded-lg object-cover border border-orange-500/30"
              />
              <div className="flex-1">
                <h4 className="font-semibold">Programador</h4>
                <p className="text-sm text-muted-foreground">Museo Güemes - Pasantía</p>
                <p className="text-xs text-muted-foreground">Mayo - Agosto 2024</p>
              </div>
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground ml-4">
              <li>• Sistema multimedia con Python y Raspberry Pi</li>
              <li>• Configuración de Debian y protocolos UDP/TCP</li>
              <li>• Presentación ante directivos y documentación</li>
            </ul>
          </div>
        </div>
      ),
    },
    certifications: {
      title: "Educación",
      icon: <GraduationCap className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white">
              <img src="/ucasal-logo.jpg" alt="UCASAL Logo" className="w-full h-full object-contain p-1" />
            </div>
            <div>
              <h4 className="font-semibold">Licenciatura en Ciencia de Datos</h4>
              <p className="text-sm text-muted-foreground">Universidad Católica de Salta (UCASAL)</p>
              <p className="text-xs text-muted-foreground">En curso - Modalidad online (2025)</p>
            </div>
          </div>
          <Separator />
          <div className="flex gap-4 items-start">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white">
              <img
                src="/tec3-logo.jpeg"
                alt="Escuela Técnica N° 3139 Logo"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div>
              <h4 className="font-semibold">Técnico Informático Profesional y Personal</h4>
              <p className="text-sm text-muted-foreground">
                Escuela de Educación Técnica N° 3139 "Gral. M. M. de Güemes"
              </p>
              <p className="text-xs text-muted-foreground">Finalizado (2021 - 2024)</p>
            </div>
          </div>
        </div>
      ),
    },
    contact: {
      title: "Contacto",
      icon: <Mail className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <a
                href="mailto:gapsar.sebastian@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                gapsar.sebastian@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-muted-foreground" />
              <a
                href="https://github.com/RamiroSGaspar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                github.com/RamiroSGaspar
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Linkedin className="w-5 h-5 text-muted-foreground" />
              <a
                href="https://www.linkedin.com/in/ramiro-sebastian-gaspar-b41697317"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
          <Separator />
          <form className="space-y-4">
            <div>
              <Input placeholder="Tu nombre" />
            </div>
            <div>
              <Input type="email" placeholder="Tu email" />
            </div>
            <div>
              <Textarea placeholder="Tu mensaje" rows={4} />
            </div>
            <Button className="w-full">Enviar Mensaje</Button>
          </form>
        </div>
      ),
    },
  }

  const handleContactClick = () => {
    setActiveSection("contact")
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  // Datos importados desde el archivo JSON
  const projectsData = portfolioData.projects
  const blogPosts = portfolioData.blogPosts
  const eventsData = portfolioData.events
  const experiencesData = portfolioData.experiences
  const studiesData = portfolioData.learning

  const selectedStudyData = studiesData.find((study: any) => study.id === selectedStudy)

  // Ajuste para filtrar por la nueva etiqueta "Aprendizaje" y manejar el caso de selectedPost
  const filteredPosts = blogFilter === "all" ? blogPosts : blogPosts.filter((post) => post.tags.includes(blogFilter))

  const handlePostClick = (post: (typeof blogPosts)[0]) => {
    setSelectedPost(post) // Guarda el post completo para poder acceder a sus tags y contenido

    if (post.tags.includes("Proyecto")) {
      const project = projectsData.find((p) => p.id === post.id)
      if (project) setSelectedProject(project.id)
    } else if (post.tags.includes("Evento")) {
      const event = eventsData.find((e) => e.id === post.id)
      if (event) setSelectedEvent(event.id)
    } else if (post.tags.includes("Experiencia")) {
      const experience = experiencesData.find((exp) => exp.id === post.id)
      if (experience) setSelectedExperience(experience.id)
    } else if (post.tags.includes("Aprendizaje")) {
      const learning = studiesData.find((s: any) => s.id === post.id)
      if (learning) setSelectedStudy(learning.id)
    }
  }

  const closeModal = () => {
    setSelectedProject(null)
    setSelectedEvent(null)
    setSelectedStudy(null)
    setSelectedExperience(null) // Limpia la experiencia seleccionada
    setSelectedPost(null) // Limpia el post seleccionado
  }

  const currentProject = projectsData.find((p) => p.id === selectedProject)
  const currentEvent = eventsData.find((e) => e.id === selectedEvent)
  // Actualizando la variable currentExperience
  const currentExperience = experiencesData.find((exp) => exp.id === selectedExperience)

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Proyecto":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Evento":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "Experiencia":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Estudio": // Para mantener el estilo de "Estudio" si se usa internamente
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "Aprendizaje": // Color para la nueva etiqueta
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
    }
  }

  const filterButtons = [
    { label: "Todos", value: "all", color: "orange" },
    { label: "Proyectos", value: "Proyecto", color: "blue" },
    { label: "Eventos", value: "Evento", color: "purple" },
    { label: "Experiencias", value: "Experiencia", color: "green" },
    { label: "Aprendizajes", value: "Aprendizaje", color: "orange" }, // Cambiado de "Estudio" a "Aprendizaje"
  ]

  const getFilterButtonColor = (filter: string) => {
    if (blogFilter === filter) {
      switch (filter) {
        case "all":
          return "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 border-0 text-white shadow-[0_0_10px_rgba(251,146,60,0.3)]"
        case "Proyecto":
          return "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 border-0 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]"
        case "Evento":
          return "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 border-0 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]"
        case "Experiencia":
          return "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 border-0 text-white shadow-[0_0_10px_rgba(34,197,94,0.3)]"
        case "Aprendizaje": // Color para el filtro de "Aprendizaje"
          return "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 border-0 text-white shadow-[0_0_10px_rgba(251,146,60,0.3)]"
        default:
          return "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 border-0 text-white shadow-[0_0_10px_rgba(251,146,60,0.3)]"
      }
    }
    return "hover:bg-orange-500/10 border-orange-500/25 hover:border-orange-500/40 text-zinc-400 hover:text-orange-400 hover:shadow-[0_0_8px_rgba(251,146,60,0.15)] transition-all duration-300"
  }

  return (
    <div className="dark min-h-screen bg-black relative overflow-x-hidden">
      <NeuralNetworkBackground />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl space-y-6">
        <Card className="border-orange-500/20 backdrop-blur-xl bg-zinc-950/95 shadow-[0_0_30px_-12px_rgba(251,146,60,0.25)] hover:shadow-[0_0_40px_-12px_rgba(251,146,60,0.35)] transition-shadow duration-300">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative cursor-pointer group" onClick={() => setIsProfileImageOpen(true)}>
                <div className="absolute inset-0 rounded-full bg-orange-500 blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                <Avatar className="relative w-32 h-32 border-4 border-orange-500/60 shadow-[0_0_20px_rgba(251,146,60,0.3)] group-hover:border-orange-400 group-hover:shadow-[0_0_25px_rgba(251,146,60,0.4)] transition-all">
                  <AvatarImage src="/profile.jpeg" alt="Ramiro Sebastian Gaspar" />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white text-3xl font-bold">
                    RG
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(251,146,60,0.4)]">
                  Ramiro Sebastian Gaspar
                </h1>
                <p className="text-xl md:text-2xl text-orange-400 font-semibold">Data Scientist</p>
                <p className="text-sm text-zinc-500">Estudiante de Ciencia de Datos</p>
              </div>

              <div className="flex flex-col items-center gap-2 text-sm text-zinc-500">
                <div className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                  <GraduationCap className="w-4 h-4" />
                  <span>UCASAL</span>
                </div>
                <div className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span>Salta, Argentina</span>
                </div>
              </div>

              <div className="flex flex-wrap w-full">
                <Button
                  onClick={handleContactClick}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 shadow-[0_0_15px_rgba(251,146,60,0.3)] hover:shadow-[0_0_20px_rgba(251,146,60,0.4)] transition-all duration-300 border-0 font-semibold text-white"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contactar
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-zinc-900/50 border-orange-500/40 hover:border-orange-400 hover:bg-orange-500/10 hover:shadow-[0_0_12px_rgba(251,146,60,0.25)] transition-all duration-300 text-orange-400 hover:text-orange-300"
                  asChild
                >
                  <a href="/api/download-cv" download="CV_RamiroSebastianGaspar.pdf">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar CV
                  </a>
                </Button>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-orange-500/10 hover:shadow-[0_0_10px_rgba(251,146,60,0.2)] hover:text-orange-400 transition-all duration-300"
                  asChild
                >
                  <a href="https://github.com/RamiroSGaspar" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-orange-500/10 hover:shadow-[0_0_10px_rgba(251,146,60,0.2)] hover:text-orange-400 transition-all duration-300"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/ramiro-sebastian-gaspar-b41697317"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-orange-500/10 hover:shadow-[0_0_10px_rgba(251,146,60,0.2)] hover:text-orange-400 transition-all duration-300"
                    onClick={copyEmailToClipboard}
                  >
                    <Mail className="w-5 h-5" />
                  </Button>
                  {emailCopied && (
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 animate-in fade-in slide-in-from-top-2 duration-300 pointer-events-none">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-4 py-2 rounded-lg shadow-lg whitespace-nowrap font-medium backdrop-blur-sm border border-orange-400/30">
                        ✓ Correo copiado
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          ref={contentRef}
          className="border-orange-500/15 backdrop-blur-xl bg-zinc-950/95 shadow-[0_0_25px_-12px_rgba(251,146,60,0.2)] hover:shadow-[0_0_35px_-12px_rgba(251,146,60,0.25)] transition-shadow duration-300"
        >
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.entries(sections).map(([key, section]) => (
                <Button
                  key={key}
                  variant={activeSection === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveSection(key)}
                  className={
                    activeSection === key
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 shadow-[0_0_10px_rgba(59,130,246,0.3)] hover:shadow-[0_0_15px_rgba(251,146,60,0.4)] transition-all duration-300 border-0 text-white font-semibold text-xs px-3"
                      : "hover:bg-orange-500/10 border-orange-500/25 hover:border-orange-500/40 text-zinc-400 hover:text-orange-400 hover:shadow-[0_0_8px_rgba(251,146,60,0.15)] transition-all duration-300 text-xs px-3"
                  }
                >
                  {section.icon}
                  <span className="ml-1.5">{section.title}</span>
                </Button>
              ))}
            </div>

            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold mb-4 text-zinc-100">
                {sections[activeSection as keyof typeof sections].title}
              </h2>
              <div className="text-zinc-200">{sections[activeSection as keyof typeof sections].content}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/15 backdrop-blur-xl bg-zinc-950/95 shadow-[0_0_25px_-12px_rgba(251,146,60,0.2)] hover:shadow-[0_0_35px_-12px_rgba(251,146,60,0.25)] transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.2)]">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-zinc-100">Blog & Actualizaciones</h2>
                <p className="text-sm text-zinc-500">Proyectos, eventos y aprendizajes</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {filterButtons.map((btn) => (
                <Button
                  key={btn.value}
                  variant={blogFilter === btn.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBlogFilter(btn.value)}
                  className={`text-xs px-3 ${getFilterButtonColor(btn.value)}`}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {btn.label}
                </Button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(251,146,60,0.15)] cursor-pointer"
                  onClick={() => handlePostClick(post)} // Usar handlePostClick para gestionar la lógica
                >
                  <div className="aspect-video w-full bg-gradient-to-br from-orange-500/20 to-zinc-900 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-orange-500/40" />
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <h3 className="font-semibold text-zinc-200 group-hover:text-orange-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-zinc-500 line-clamp-2">{post.description}</p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${getTagColor(tag)}`}
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-orange-400 font-medium pt-2">
                      <span>Leer más</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="mt-6 p-8 rounded-lg border border-orange-500/20 bg-orange-500/5 text-center">
                <p className="text-zinc-400">No hay publicaciones con esta etiqueta aún.</p>
              </div>
            )}

            <div className="mt-6 p-4 rounded-lg border border-orange-500/20 bg-orange-500/5 text-center">
              <p className="text-sm text-zinc-400">
                Pronto estaré publicando contenido sobre proyectos, eventos y aprendizajes. Mantente atento a las
                actualizaciones.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* // Mejorando el modal de proyectos con más detalles */}
      {currentProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-blue-500/30 rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10"
              onClick={closeModal}
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium border border-blue-500/40 bg-blue-500/10 text-blue-400"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">{currentProject.title}</h2>

                <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Inicio: {currentProject.timeline[0].date}
                  </span>
                  {currentProject.timeline.some((t) => t.status === "in-progress") ? (
                    <span className="flex items-center gap-2 text-blue-400">
                      <Clock className="w-4 h-4" />
                      En Curso
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-green-400">
                      <CheckCircle2 className="w-4 h-4" />
                      Completado: {currentProject.timeline[currentProject.timeline.length - 1].date}
                    </span>
                  )}
                </div>

                <p className="text-lg text-zinc-400">{currentProject.fullDescription}</p>

                <div className="flex gap-3">
                  {currentProject.githubUrl && (
                    <Button
                      variant="outline"
                      className="border-blue-500/40 hover:border-blue-400 hover:bg-blue-500/10 text-blue-400 bg-transparent"
                      asChild
                    >
                      <a href={currentProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Ver en GitHub
                      </a>
                    </Button>
                  )}
                  {currentProject.demoUrl && (
                    <Button
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500"
                      asChild
                    >
                      <a href={currentProject.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <Separator className="bg-blue-500/20" />

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-blue-400" />
                  Vista del Proyecto
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProject.images.slice(0, 2).map((img, idx) => (
                    <img
                      key={idx}
                      src={img || "/placeholder.svg"}
                      alt={`${currentProject.title} screenshot ${idx + 1}`}
                      className="w-full rounded-lg border border-blue-500/20 hover:border-blue-400/40 transition-colors"
                    />
                  ))}
                </div>
              </div>

              {/* Tecnologías con logos */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  Stack Tecnológico
                </h3>
                <div className="flex flex-wrap gap-3">
                  {currentProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm font-medium text-blue-400 hover:bg-blue-500/20 transition-colors"
                    >
                      <i className={`devicon-${tech.toLowerCase()}-plain text-lg`}></i>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-400" />
                  Historial de Versiones
                </h3>
                <div className="space-y-3">
                  {currentProject.updateHistory.map((update, idx) => (
                    <div key={idx} className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-blue-400">{update.version}</span>
                        <span className="text-sm text-zinc-500">{update.date}</span>
                      </div>
                      <ul className="space-y-1">
                        {update.changes.map((change, changeIdx) => (
                          <li key={changeIdx} className="flex items-start gap-2 text-sm text-zinc-300">
                            <span className="text-blue-400">•</span>
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Línea de tiempo */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  Línea de Tiempo
                </h3>
                <div className="space-y-4">
                  {currentProject.timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 mt-1">
                        {item.status === "completed" && <CheckCircle2 className="w-6 h-6 text-green-400" />}
                        {item.status === "in-progress" && <Clock className="w-6 h-6 text-blue-400 animate-pulse" />}
                        {item.status === "pending" && <Circle className="w-6 h-6 text-zinc-600" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-zinc-100">{item.phase}</h4>
                          <span className="text-xs text-zinc-500">{item.date}</span>
                        </div>
                        <p className="text-sm text-zinc-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desafíos y Soluciones */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-400" />
                  Desafíos y Soluciones
                </h3>
                <div className="space-y-4">
                  {currentProject.challenges.map((item, idx) => (
                    <div key={idx} className="p-4 bg-zinc-900 border border-blue-500/20 rounded-lg space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-zinc-300 flex items-start gap-2">
                            <span className="text-red-400 flex-shrink-0">⚠</span>
                            {item.challenge}
                          </p>
                          <span className="text-xs text-zinc-500 whitespace-nowrap">{item.challengeDate}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm text-zinc-400 flex items-start gap-2">
                            <span className="text-green-400 flex-shrink-0">✓</span>
                            {item.solution}
                          </p>
                          <span className="text-xs text-zinc-500 whitespace-nowrap">{item.solutionDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aprendizajes */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-400" />
                  Aprendizajes Clave
                </h3>
                <ul className="space-y-2">
                  {currentProject.learnings.map((learning, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-zinc-300 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg"
                    >
                      <span className="text-blue-400">💡</span>
                      {learning}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Próximas actualizaciones (solo si está en progreso) */}
              {currentProject.timeline.some((t) => t.status === "in-progress" || t.status === "pending") && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-blue-400" />
                    Próximas Actualizaciones
                  </h3>
                  <p className="text-zinc-300 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                    {currentProject.futureUpdates}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {currentEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-purple-500/30 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-zinc-400 hover:text-purple-400 hover:bg-purple-500/10"
              onClick={closeModal}
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="p-8 space-y-6">
              {/* Header con logo del evento */}
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-purple-500/30 bg-zinc-900/50 flex items-center justify-center flex-shrink-0">
                  <img
                    src={currentEvent.eventLogo || "/placeholder.svg"}
                    alt={currentEvent.eventName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {currentEvent.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium border ${getTagColor(tag)}`}
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-3xl font-bold text-zinc-100">{currentEvent.eventName}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {currentEvent.eventDate}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {currentEvent.location}
                    </span>
                  </div>
                </div>
              </div>

              <Separator className="bg-purple-500/20" />

              {/* Descripción */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100">Sobre el Evento</h3>
                <p className="text-zinc-300 leading-relaxed">{currentEvent.fullDescription}</p>
              </div>

              <Separator className="bg-purple-500/20" />

              {/* Galería de fotos */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-purple-400" />
                  Galería de Fotos
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {currentEvent.photos.map((photo, idx) => (
                    <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-purple-500/20">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`${currentEvent.eventName} foto ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-purple-500/20" />

              {/* Highlights */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100">Puntos Destacados</h3>
                <ul className="space-y-2">
                  {currentEvent.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-zinc-300">
                      <span className="text-purple-400 text-lg">✨</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator className="bg-purple-500/20" />

              {/* Publicaciones en redes sociales */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-purple-400" />
                  Publicaciones en Redes
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {currentEvent.socialPosts.map((post, idx) => (
                    <a
                      key={idx}
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square rounded-lg overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                    >
                      <img
                        src={post.preview || "/placeholder.svg"}
                        alt={`${post.platform} post`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white font-medium flex items-center gap-2">
                          Ver en {post.platform}
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <Separator className="bg-purple-500/20" />

              {/* Aprendizajes */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  Lo que Aprendí
                </h3>
                <div className="p-4 rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent">
                  <p className="text-zinc-300 leading-relaxed">{currentEvent.learnings}</p>
                </div>
              </div>

              <Separator className="bg-purple-500/20" />

              {/* Conexiones */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                  <Linkedin className="w-5 h-5 text-purple-400" />
                  Networking
                </h3>
                <div className="p-4 rounded-lg border border-purple-500/20 bg-zinc-900/30">
                  <p className="text-zinc-300">{currentEvent.connections}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Agregando modal de experiencia después del modal de eventos */}
      {currentExperience && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-green-500/30 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-zinc-400 hover:text-green-400 hover:bg-green-500/10"
              onClick={closeModal}
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="p-8 space-y-6">
              {/* Header con logo y título */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img
                  src={currentExperience.image || "/placeholder.svg"}
                  alt={currentExperience.company}
                  className="w-24 h-24 rounded-lg object-cover border-2 border-green-500/30"
                />
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium border border-green-500/40 bg-green-500/10 text-green-400">
                      <Briefcase className="w-3 h-3" />
                      {currentExperience.type}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-zinc-100">{currentExperience.title}</h2>
                  <div className="space-y-1 text-zinc-400">
                    <p className="text-lg font-medium text-zinc-300">{currentExperience.company}</p>
                    <p className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      {currentExperience.location}
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      {currentExperience.startDate} - {currentExperience.endDate} · {currentExperience.duration}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="bg-green-500/20" />

              {/* Descripción */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100">Descripción</h3>
                <p className="text-zinc-300 leading-relaxed">{currentExperience.description}</p>
              </div>

              {/* Responsabilidades */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  Responsabilidades
                </h3>
                <ul className="space-y-2">
                  {currentExperience.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-zinc-300">
                      <span className="text-green-400 mt-1">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Logros */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Logros Destacados
                </h3>
                <ul className="space-y-2">
                  {currentExperience.achievements.map((achievement, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-zinc-300 p-3 bg-green-500/5 border border-green-500/20 rounded-lg"
                    >
                      <Award className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Habilidades utilizadas */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {currentExperience.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg text-sm font-medium text-green-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedStudy &&
        studiesData.find((s) => s.id === selectedStudy && s.tags.includes("Aprendizaje")) &&
        (() => {
          const currentStudy = studiesData.find((s) => s.id === selectedStudy)!
          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={closeModal}
            >
              <div
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-orange-500/30 rounded-2xl shadow-[0_0_50px_rgba(249,115,22,0.3)]"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 text-zinc-400 hover:text-orange-400 hover:bg-orange-500/10"
                  onClick={closeModal}
                >
                  <X className="w-5 h-5" />
                </Button>

                <div className="p-8 space-y-6">
                  {/* Header con badge del certificado */}
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-orange-500/30 bg-zinc-900/50 flex items-center justify-center flex-shrink-0">
                      <Award className="w-12 h-12 text-orange-500" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {currentStudy.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium border ${getTagColor(tag)}`}
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-3xl font-bold text-zinc-100">{currentStudy.title}</h2>
                      <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                        <span className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          {currentStudy.institution}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {currentStudy.completionDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-orange-500/20" />

                  {/* Descripción */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-zinc-100">Sobre el Certificado</h3>
                    <p className="text-zinc-300 leading-relaxed">{currentStudy.description}</p>
                  </div>

                  {currentStudy.certificateLink && (
                    <>
                      <Separator className="bg-orange-500/20" />
                      {/* Enlace al certificado */}
                      <div className="space-y-3">
                        <a
                          href={currentStudy.certificateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Ver Certificado
                        </a>
                      </div>
                    </>
                  )}

                  {currentStudy.skills && currentStudy.skills.length > 0 && (
                    <>
                      <Separator className="bg-orange-500/20" />
                      {/* Habilidades adquiridas */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                          <Code className="w-5 h-5 text-orange-400" />
                          Habilidades Adquiridas
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {currentStudy.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 rounded-md text-sm bg-orange-500/10 border border-orange-500/30 text-orange-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {currentStudy.keyLearnings && currentStudy.keyLearnings.length > 0 && (
                    <>
                      <Separator className="bg-orange-500/20" />
                      {/* Aprendizajes clave */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-orange-400" />
                          Aprendizajes Clave
                        </h3>
                        <ul className="space-y-2">
                          {currentStudy.keyLearnings.map((learning, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-zinc-300">
                              <span className="text-orange-400 text-lg">📚</span>
                              <span>{learning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  {currentStudy.projects && currentStudy.projects.length > 0 && (
                    <>
                      <Separator className="bg-orange-500/20" />
                      {/* Proyectos realizados */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-zinc-100">Proyectos Realizados</h3>
                        <ul className="space-y-2">
                          {currentStudy.projects.map((project, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-zinc-300">
                              <span className="text-orange-400 text-lg">🔨</span>
                              <span>{project}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  {currentStudy.duration && (
                    <>
                      <Separator className="bg-orange-500/20" />
                      {/* Duración */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-orange-400" />
                          Duración
                        </h3>
                        <div className="p-4 rounded-lg border border-orange-500/20 bg-zinc-900/30">
                          <p className="text-zinc-300">{currentStudy.duration}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })()}

      {/* Modal de imagen de perfil maximizada */}
      {isProfileImageOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setIsProfileImageOpen(false)}
        >
          <button
            onClick={() => setIsProfileImageOpen(false)}
            className="absolute top-6 right-6 z-[110] w-10 h-10 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-orange-500 border border-zinc-700 transition-all duration-200 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative w-auto h-auto max-w-md" onClick={(e) => e.stopPropagation()}>
            <img
              src="/profile.jpeg"
              alt="Ramiro Sebastian Gaspar"
              className="w-full h-auto rounded-lg shadow-[0_0_50px_rgba(251,146,60,0.3)] border-2 border-orange-500/30"
            />
          </div>
        </div>
      )}
    </div>
  )
}
