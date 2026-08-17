"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

const subjectsInProgress = [
  { name: "Matemáticas", icon: "🔢", color: "from-blue-500 to-cyan-500", level: 3, progress: 65, nextLevel: "Álgebra Avanzada", status: "active" },
  { name: "Inglés", icon: "🇬🇧", color: "from-green-500 to-emerald-500", level: 2, progress: 40, nextLevel: "Past Perfect", status: "active" },
  { name: "Biología", icon: "🧬", color: "from-pink-500 to-rose-500", level: 1, progress: 15, nextLevel: "Células", status: "new" },
  { name: "Ciencias Sociales", icon: "🌍", color: "from-amber-500 to-orange-500", level: 4, progress: 85, nextLevel: "Historia Moderna", status: "active" },
];

const quickActions = [
  { href: "/learn", label: "Materias", icon: "📚", color: "from-indigo-500 to-purple-500" },
  { href: "/profile?tab=profile", label: "Perfil", icon: "👤", color: "from-pink-500 to-rose-500" },
  { href: "/profile?tab=achievements", label: "Logros", icon: "🏆", color: "from-amber-500 to-orange-500" },
  { href: "/profile?tab=shop", label: "Tienda", icon: "🛍️", color: "from-green-500 to-emerald-500" },
  { href: "/settings", label: "Ajustes", icon: "⚙️", color: "from-zinc-500 to-zinc-600" },
  { href: "/diagnostic", label: "Diagnóstico", icon: "📝", color: "from-blue-500 to-cyan-500" },
];

const recentActivity = [
  { type: "lesson", title: "Completaste: Ecuaciones Cuadráticas", subject: "Matemáticas", exp: 150, time: "Hace 2 horas", icon: "✅" },
  { type: "achievement", title: "Logro desbloqueado: Matemático Novato", subject: "", exp: 50, time: "Hace 5 horas", icon: "🏅" },
  { type: "streak", title: "Racha de 7 días mantenida", subject: "", exp: 100, time: "Ayer", icon: "🔥" },
  { type: "lesson", title: "Completaste: Verbos Irregulares", subject: "Inglés", exp: 120, time: "Ayer", icon: "✅" },
  { type: "chest", title: "Cofre semanal abierto", subject: "", exp: 0, time: "Hace 2 días", icon: "📦" },
];

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const expPercentage = user.expToNext ? (user.exp / user.expToNext) * 100 : 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navbar />
      
      <div className="flex">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        <main className={`flex-1 pt-16 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-72"}`}>
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-8 animate-slide-up">
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                ¡Hola, {user.name?.split(" ")[0] || "Usuario"}! 👋
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                Continúa tu aventura de aprendizaje. Estás a {user.expToNext ? user.expToNext - user.exp : 1000} EXP del nivel {user.level + 1}.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card variant="gradient" padding="lg" className="col-span-1 lg:col-span-2 animate-slide-up">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="premium" size="sm">Nivel {user.level}</Badge>
                      <Badge variant="success" size="sm" dot>Racha: {user.streak} días</Badge>
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Progreso Global</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl">
                      🎯
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/50 dark:bg-zinc-800/50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                      {user.exp.toLocaleString()}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">EXP Total</p>
                  </div>
                  <div className="bg-white/50 dark:bg-zinc-800/50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                      {user.coins.toLocaleString()}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Monedas</p>
                  </div>
                  <div className="bg-white/50 dark:bg-zinc-800/50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
                      {user.level}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Nivel Actual</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Hacia el nivel {user.level + 1}</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{Math.round(expPercentage)}%</span>
                  </div>
                  <ProgressBar value={user.exp} max={user.expToNext || 1000} size="lg" variant="exp" animated stripe />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/learn">
                    <Button size="md">
                      <span>Continuar Aprendiendo</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </Button>
                  </Link>
                  <Link href="/diagnostic">
                    <Button variant="outline" size="md">Nuevo Diagnóstico</Button>
                  </Link>
                  <Link href="/profile?tab=shop">
                    <Button variant="ghost" size="md">Tienda ({user.coins} 💰)</Button>
                  </Link>
                </div>
              </Card>

              <Card variant="elevated" padding="lg" className="animate-slide-up" style={{ animationDelay: "100ms" }}>
                <CardHeader title="Accesos Rápidos" />
                <CardContent>
                  <div className="space-y-2">
                    {quickActions.map((action) => (
                      <Link
                        key={action.href}
                        href={action.href}
                        className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${action.color} group-hover:scale-110 transition-transform`}>
                          {action.icon}
                        </div>
                        <span className="font-medium text-zinc-900 dark:text-white">{action.label}</span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card variant="elevated" padding="lg" className="animate-slide-up" style={{ animationDelay: "200ms" }}>
                <CardHeader 
                  title="Materias en Progreso" 
                  action={
                    <Link href="/learn" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                      Ver todas
                    </Link>
                  }
                />
                <CardContent>
                  <div className="space-y-4">
                    {subjectsInProgress.map((subject) => (
                      <div key={subject.name} className="group relative">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${subject.color}`}>
                            {subject.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-zinc-900 dark:text-white truncate pr-2">{subject.name}</h4>
                              <Badge variant={subject.status === "new" ? "default" : "inProgress"} size="xs">
                                Nivel {subject.level}
                              </Badge>
                            </div>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Siguiente: {subject.nextLevel}</p>
                          </div>
                        </div>
                        <ProgressBar value={subject.progress} max={100} size="md" variant="default" showLabel />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated" padding="lg" className="animate-slide-up" style={{ animationDelay: "300ms" }}>
                <CardHeader 
                  title="Actividad Reciente" 
                  action={
                    <Link href="/profile?tab=activity" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                      Ver todo
                    </Link>
                  }
                />
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 flex items-center justify-center text-xl flex-shrink-0">
                          {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-zinc-900 dark:text-white">{activity.title}</p>
                          {activity.subject && (
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">{activity.subject}</p>
                          )}
                          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{activity.time}</p>
                        </div>
                        {activity.exp > 0 && (
                          <div className="flex items-center gap-1 text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-1 rounded-lg">
                            <span>⭐</span>
                            <span>+{activity.exp}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: "400ms" }}>
              <Card variant="elevated" padding="lg">
                <CardHeader title="Objetivos de la Semana" />
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: "Lecciones completadas", current: 3, target: 7, icon: "📖", color: "from-indigo-500 to-purple-500" },
                      { label: "EXP ganada", current: 2450, target: 5000, icon: "⭐", color: "from-yellow-500 to-amber-500" },
                      { label: "Días de racha", current: 7, target: 7, icon: "🔥", color: "from-orange-500 to-red-500" },
                    ].map((goal) => (
                      <div key={goal.label} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${goal.color}`}>
                            {goal.icon}
                          </div>
                          <div>
                            <p className="font-medium text-zinc-900 dark:text-white">{goal.label}</p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                              {typeof goal.current === "number" && goal.current > 100 
                                ? `${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}`
                                : `${goal.current} / ${goal.target}`}
                            </p>
                          </div>
                        </div>
                        <ProgressBar 
                          value={goal.current} 
                          max={goal.target} 
                          size="sm" 
                          variant={goal.current >= goal.target ? "success" : "default"} 
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}