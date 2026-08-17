import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "StudyGuide - Aprende Jugando",
  description: "Plataforma educativa gamificada para aprender matemáticas, inglés, biología y más. Sube de nivel, gana recompensas y domina cada materia.",
  keywords: ["educación", "gamificación", "aprendizaje", "matemáticas", "inglés", "biología", "ciencias"],
  authors: [{ name: "StudyGuide" }],
  openGraph: {
    title: "StudyGuide - Aprende Jugando",
    description: "Plataforma educativa gamificada para aprender jugando",
    type: "website",
    locale: "es_ES",
    siteName: "StudyGuide",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}