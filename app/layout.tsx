import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Inter, DM_Sans as V0_Font_DM_Sans, Space_Mono as V0_Font_Space_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _dmSans = V0_Font_DM_Sans({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900","1000"] })
const _spaceMono = V0_Font_Space_Mono({ subsets: ['latin'], weight: ["400","700"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Ramiro Sebastian Gaspar | Portfolio",
  description: "Portfolio profesional - Ciencia de datos, análisis de datos y desarrollo técnico. Proyectos, experiencia y certificaciones en Python, análisis de datos y backend development.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Ramiro Sebastian Gaspar | Portfolio",
    description: "Portfolio profesional - Ciencia de datos, análisis de datos y desarrollo técnico",
    url: "https://ramirosgaspar.vercel.app",
    siteName: "Ramiro Gaspar Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ramiro Sebastian Gaspar - Portfolio",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramiro Sebastian Gaspar | Portfolio",
    description: "Portfolio profesional - Ciencia de datos, análisis de datos y desarrollo técnico",
    images: ["/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
