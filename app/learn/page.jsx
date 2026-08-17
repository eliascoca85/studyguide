"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const user = {
  name: "Juan Delgado",
  level: 12,
  exp: 12450,
  coins: 1250,
};

const availableSubjects = [
  {
    id: "math",
    name: "Matemáticas",
    icon: "🔢",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    description: "Domina álgebra, geometría, cálculo y estadística paso a paso.",
    totalLessons: 52,
    completedLessons: 34,
    currentLevel: 3,
    levels: [
      { num: 1, name: "Fundamentos", desc: "Números, operaciones básicas y propiedades", progress: 100, status: "completed", lessons: 8 },
      { num: 2, name: "Álgebra Básica", desc: "Ecuaciones lineales, inecuaciones y sistemas", progress: 100, status: "completed", lessons: 10 },
      { num: 3, name: "Álgebra Avanzada", desc: "Ecuaciones cuadráticas, polinomios y funciones", progress: 65, status: "in-progress", lessons: 12 },
      { num: 4, name: "Geometría y Trigonometría", desc: "Ángulos, triángulos, círculos y funciones trigonométricas", progress: 0, status: "locked", lessons: 11 },
      { num: 5, name: "Cálculo y Estadística", desc: "Límites, derivadas, integrales y probabilidad", progress: 0, status: "locked", lessons: 11 },
    ],
  },
  {
    id: "english",
    name: "Inglés",
    icon: "🇬🇧",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    borderColor: "border-green-200 dark:border-green-800",
    description: "Gramática, vocabulario, reading y listening para certificar tu nivel.",
    totalLessons: 48,
    completedLessons: 19,
    currentLevel: 2,
    levels: [
      { num: 1, name: "Principiante (A1)", desc: "Presentaciones, presente simple, vocabulario básico", progress: 100, status: "completed", lessons: 10 },
      { num: 2, name: "Elemental (A2)", desc: "Pasado simple, futuro, comparativos, phrasal verbs", progress: 40, status: "in-progress", lessons: 12 },
      { num: 3, name: "Intermedio (B1)", desc: "Perfectos, condicionales, reported speech", progress: 0, status: "locked", lessons: 10 },
      { num: 4, name: "Intermedio Alto (B2)", desc: "Voz pasiva, wish/if only, collocations avanzadas", progress: 0, status: "locked", lessons: 8 },
      { num: 5, name: "Avanzado (C1)", desc: "Inversión, cleft sentences, matices formales", progress: 0, status: "locked", lessons: 8 },
    ],
  },
  {
    id: "biology",
    name: "Biología",
    icon: "🧬",
    color: "from-pink-500 to-rose-500",
    bgColor: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
    borderColor: "border-pink-200 dark:border-pink-800",
    description: "Explora la vida: desde células hasta ecosistemas completos.",
    totalLessons: 45,
    completedLessons: 7,
    currentLevel: 1,
    levels: [
      { num: 1, name: "Célula y Bioquímica", desc: "Organelas, membrana, metabolismo, ADN/ARN", progress: 15, status: "in-progress", lessons: 9 },
      { num: 2, name: "Genética y Herencia", desc: "Mendel, cromosomas, mutaciones, ingeniería genética", progress: 0, status: "locked", lessons: 8 },
      { num: 3, name: "Evolución y Diversidad", desc: "Selección natural, especiación, filogenia", progress: 0, status: "locked", lessons: 8 },
      { num: 4, name: "Ecología y Ecosistemas", desc: "Ciclos biogeoquímicos, poblaciones, biomas", progress: 0, status: "locked", lessons: 10 },
      { num: 5, name: "Fisiología y Anatomía", desc: "Sistemas del cuerpo humano, homeostasis", progress: 0, status: "locked", lessons: 10 },
    ],
  },
  {
    id: "social",
    name: "Ciencias Sociales",
    icon: "🌍",
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    description: "Historia, geografía, economía y política para entender el mundo.",
    totalLessons: 50,
    completedLessons: 42,
    currentLevel: 4,
    levels: [
      { num: 1, name: "Historia Antigua", desc: "Mesopotamia, Egipto, Grecia, Roma, civilizaciones", progress: 100, status: "completed", lessons: 10 },
      { num: 2, name: "Edad Media y Moderna", desc: "Feudalismo, renacimiento, revoluciones, imperios", progress: 100, status: "completed", lessons: 10 },
      { num: 3, name: "Historia Contemporánea", desc: "Guerras mundiales, guerra fría, globalización", progress: 100, status: "completed", lessons: 10 },
      { num: 4, name: "Geografía y Economía", desc: "Climas, recursos, comercio, desarrollo sostenible", progress: 85, status: "in-progress", lessons: 10 },
      { num: 5, name: "Ciencia Política", desc: "Sistemas políticos, derechos humanos, organizaciones internacionales", progress: 0, status: "locked", lessons: 10 },
    ],
  },
];

const comingSoonSubjects = [
  { id: "language", name: "Lenguaje", icon: "📖", color: "from-purple-500 to-violet-500", desc: "Gramática, ortografía, redacción y literatura" },
  { id: "physics", name: "Física", icon: "⚛️", color: "from-indigo-500 to-blue-500", desc: "Mecánica, termodinámica, electromagnetismo, óptica" },
  { id: "chemistry", name: "Química", icon: "🧪", color: "from-teal-500 to-cyan-500", desc: "Tabla periódica, enlaces, reacciones, estequiometría" },
];

const statusConfig = {
  completed: { label: "Completado", variant: "completed", icon: "✅" },
  "in-progress": { label: "En progreso", variant: "inProgress", icon: "🔄" },
  locked: { label: "Bloqueado", variant: "locked", icon: "🔒" },
};

export default function LearnPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [view, setView] = useState("subjects"); // subjects, levels

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setView("levels");
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setView("subjects");
  };

  if (view === "levels" && selectedSubject) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
        <Navbar user={user} />
        <div className="flex">
          <Sidebar user={user} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <main className={`flex-1 pt-16 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-72"}`}>
            <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
              <Button variant="ghost" size="sm" onClick={handleBackToSubjects} className="mb-6 flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Volver a materias
              </Button>

              <div className="mb-8 animate-slide-up">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${selectedSubject.color}`}>
                    {selectedSubject.icon}
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">{selectedSubject.name}</h1>
                    <p className="text-zinc-600 dark:text-zinc-400">{selectedSubject.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="primary" size="md">{selectedSubject.completedLessons}/{selectedSubject.totalLessons} lecciones</Badge>
                  <Badge variant="success" size="md" dot>Nivel actual: {selectedSubject.currentLevel}</Badge>
                  <Badge variant="premium" size="md">⭐ {Math.round(selectedSubject.completedLessons/selectedSubject.totalLessons*100)}% completado</Badge>
                </div>
              </div>

              <div className="relative animate-slide-up" style={{ animationDelay: "100ms" }}>
                <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-gradient-to-r from-zinc-200 dark:from-zinc-700 via-zinc-200 dark:via-zinc-700 to-zinc-200 dark:to-zinc-700" />
                
                <div className="relative flex items-center justify-between px-2">
                  {selectedSubject.levels.map((level, index) => (
                    <div key={level.num} className="relative flex flex-col items-center z-10">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                        level.status === "completed" 
                          ? "bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/30"
                          : level.status === "in-progress"
                          ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30 animate-pulse-soft ring-4 ring-indigo-500/20"
                          : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500"
                      }`}>
                        {level.status === "completed" ? "✓" : level.num}
                      </div>
                      
                      {index < selectedSubject.levels.length - 1 && (
                        <div className="absolute top-8 left-1/2 w-full h-1 -translate-x-1/2 bg-gradient-to-r from-zinc-200 dark:from-zinc-700 to-zinc-200 dark:to-zinc-700 z-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 space-y-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
                {selectedSubject.levels.map((level, index) => (
                  <Card 
                    key={level.num} 
                    variant={level.status === "in-progress" ? "gradient" : level.status === "completed" ? "default" : "outlined"} 
                    hover={level.status !== "locked"}
                    className="group"
                  >
                    <CardContent className="flex flex-col sm:flex-row sm:items-center gap-4 p-5">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 ${
                        level.status === "completed" 
                          ? "bg-gradient-to-br from-emerald-500 to-green-500 text-white"
                          : level.status === "in-progress"
                          ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white"
                          : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400"
                      }`}>
                        {level.status === "completed" ? "✓" : level.num}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                            Nivel {level.num}: {level.name}
                          </h3>
                          <Badge 
                            variant={statusConfig[level.status].variant} 
                            size="sm" 
                            icon={statusConfig[level.status].icon}
                          >
                            {statusConfig[level.status].label}
                          </Badge>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-3">{level.desc}</p>
                        <div className="flex items-center gap-4">
                          <ProgressBar value={level.progress} max={100} size="md" variant={level.status === "completed" ? "success" : "default"} className="flex-1 max-w-xs" />
                          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 w-20 text-right">
                            {level.progress}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 sm:ml-auto">
                        <span className="text-sm text-zinc-500 dark:text-zinc-400 hidden sm:block">
                          {level.lessons} lecciones
                        </span>
                        {level.status !== "locked" && (
                          <Link href={selectedSubject.id === "biology" ? "/game/biology" : `/lesson?subject=${selectedSubject.id}&level=${level.num}`}>
                            <Button 
                              size="sm" 
                              variant={level.status === "in-progress" ? "primary" : "outline"}
                              className="whitespace-nowrap"
                            >
                              {level.status === "in-progress" ? "Continuar" : level.status === "completed" ? "Repasar" : "Comenzar"}
                            </Button>
                          </Link>
                        )}
                        {level.status === "locked" && (
                          <Button variant="ghost" size="sm" disabled className="whitespace-nowrap opacity-50">
                            🔒 Bloqueado
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navbar user={user} />
      <div className="flex">
        <Sidebar user={user} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className={`flex-1 pt-16 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-72"}`}>
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="mb-8 animate-slide-up">
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                Elige tu <span className="gradient-text">materia</span>
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                Cada materia tiene 5 niveles progresivos. Completa lecciones, gana EXP y desbloquea el siguiente nivel.
              </p>
            </div>

            <section className="mb-12 animate-slide-up" style={{ animationDelay: "100ms" }} aria-labelledby="available-heading">
              <h2 id="available-heading" className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-8 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
                Materias Disponibles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {availableSubjects.map((subject, index) => (
                  <Card 
                    key={subject.id} 
                    variant="default" 
                    hover 
                    className={`relative overflow-hidden ${subject.borderColor}`}
                    onClick={() => handleSelectSubject(subject)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${subject.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <CardContent className="relative p-6 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${subject.color}`}>
                          {subject.icon}
                        </div>
                        <Badge variant="primary" size="sm">Nivel {subject.currentLevel}</Badge>
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{subject.name}</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 flex-1">{subject.description}</p>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-500 dark:text-zinc-400">Progreso global</span>
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                            {Math.round(subject.completedLessons/subject.totalLessons*100)}%
                          </span>
                        </div>
                        <ProgressBar 
                          value={subject.completedLessons} 
                          max={subject.totalLessons} 
                          size="sm" 
                          variant="default" 
                        />
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                        <span>📚</span>
                        <span>{subject.completedLessons}/{subject.totalLessons} lecciones</span>
                      </div>
                      
                      <Link href={subject.id === "biology" ? "/game/biology" : "/learn"}>
                        <Button className="w-full" variant={subject.currentLevel > 1 ? "primary" : "outline"}>
                          {subject.currentLevel > 1 ? "Continuar" : "Comenzar"} →
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="animate-slide-up" style={{ animationDelay: "200ms" }} aria-labelledby="coming-heading">
              <h2 id="coming-heading" className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-8 rounded-full bg-gradient-to-b from-amber-500 to-orange-500" />
                Próximamente
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {comingSoonSubjects.map((subject, index) => (
                  <Card variant="outlined" className="opacity-70" key={subject.id}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl bg-gradient-to-br ${subject.color} mx-auto mb-4`}>
                        {subject.icon}
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{subject.name}</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">{subject.desc}</p>
                      <Badge variant="locked" size="md">En desarrollo</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}