import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ramirosgaspar.vercel.app"),
  title: "Ramiro Sebastian Gaspar | Data Scientist Portfolio",
  description:
    "Portfolio de Ramiro Sebastian Gaspar — Data Scientist en Salta, Argentina. Análisis de datos, pensamiento crítico y proyectos basados en datos reales.",
  keywords: [
    "Data Scientist",
    "Ciencia de Datos",
    "Análisis de Datos",
    "Python",
    "Power BI",
    "Jupyter",
    "Salta",
    "Argentina",
    "UCASAL",
    "Ramiro Gaspar",
  ],
  authors: [{ name: "Ramiro Sebastian Gaspar" }],
  creator: "Ramiro Sebastian Gaspar",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Ramiro Sebastian Gaspar | Data Scientist Portfolio",
    description:
      "Análisis de datos & pensamiento crítico. Abierto a oportunidades.",
    url: "https://ramirosgaspar.vercel.app",
    siteName: "Ramiro Gaspar Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Ramiro Sebastian Gaspar — Data Scientist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramiro Sebastian Gaspar | Data Scientist Portfolio",
    description:
      "Análisis de datos & pensamiento crítico. Abierto a oportunidades.",
    images: ["/og.jpg"],
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
