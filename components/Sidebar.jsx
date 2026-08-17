"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/components/AuthProvider";

const sidebarItems = [
  { href: "/dashboard", label: "Panel Principal", icon: "🏠", badge: null },
  { href: "/learn", label: "Materias", icon: "📚", badge: "4" },
  { href: "/diagnostic", label: "Examen Diagnóstico", icon: "📝", badge: null },
  { href: "/lesson", label: "Lecciones", icon: "🎯", badge: "3" },
  { href: "/profile?tab=achievements", label: "Logros", icon: "🏆", badge: "12" },
  { href: "/profile?tab=shop", label: "Tienda", icon: "🛍️", badge: null },
  { href: "/settings", label: "Ajustes", icon: "⚙️", badge: null },
];

export function Sidebar({ collapsed = false, onToggle }) {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isAuthenticated) {
    return (
      <aside
        className={`fixed left-0 top-16 bottom-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-700 transition-all duration-300 ease-out ${collapsed ? "w-20" : "w-72"}`}
        aria-label="Navegación lateral"
      >
        <div className="flex flex-col h-full">
          <div className={`flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700 ${collapsed ? "justify-center" : ""}`}>
            {!collapsed && (
              <Link href="/" className="flex items-center gap-3" aria-label="StudyGuide Home">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">SG</span>
                </div>
                <span className="font-bold text-xl text-zinc-900 dark:text-white">StudyGuide</span>
              </Link>
            )}
            <button
              onClick={onToggle}
              className={`p-2 rounded-xl transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 flex-shrink-0 ${collapsed ? "mx-auto" : "ml-auto"}`}
              aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
              aria-expanded={!collapsed}
            >
              <svg className={`w-5 h-5 text-zinc-600 dark:text-zinc-400 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m14 0l-7-7m7 7l-7 7m-7 7H3" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Menú principal">
            <Link
              href="/auth"
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 ${collapsed ? "justify-center" : ""}`}
              title={collapsed ? "Iniciar sesión" : undefined}
            >
              <span className="text-xl flex-shrink-0">🔐</span>
              {!collapsed && <span className="font-medium truncate">Iniciar sesión</span>}
            </Link>
            <Link
              href="/auth?mode=register"
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 ${collapsed ? "justify-center" : ""}`}
              title={collapsed ? "Registrarse" : undefined}
            >
              <span className="text-xl flex-shrink-0">✨</span>
              {!collapsed && <span className="font-medium truncate">Crear cuenta</span>}
            </Link>
          </nav>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-700 transition-all duration-300 ease-out ${collapsed ? "w-20" : "w-72"}`}
      aria-label="Navegación lateral"
    >
      <div className="flex flex-col h-full">
        <div className={`flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700 ${collapsed ? "justify-center" : ""}`}>
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-3" aria-label="StudyGuide Home">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">SG</span>
              </div>
              <span className="font-bold text-xl text-zinc-900 dark:text-white">StudyGuide</span>
            </Link>
          )}
          <button
            onClick={onToggle}
            className={`p-2 rounded-xl transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 flex-shrink-0 ${collapsed ? "mx-auto" : "ml-auto"}`}
            aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
            aria-expanded={!collapsed}
          >
            <svg className={`w-5 h-5 text-zinc-600 dark:text-zinc-400 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m14 0l-7-7m7 7l-7 7m-7 7H3" />
            </svg>
          </button>
        </div>

        {!collapsed && (
          <div className="p-4 space-y-3 border-b border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-3">
              <Avatar size="lg" fallback={getInitials(user?.name)} alt={user?.name || "Usuario"} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-zinc-900 dark:text-white truncate">{user?.name || "Usuario"}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Nivel {user?.level || 1} • Explorador</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
              {[
                { label: "EXP Total", value: user?.exp?.toLocaleString() || "0", icon: "⭐", color: "text-yellow-500" },
                { label: "Monedas", value: user?.coins?.toLocaleString() || "0", icon: "💰", color: "text-amber-500" },
                { label: "Nivel", value: user?.level || 1, icon: "📈", color: "text-emerald-500" },
                { label: "Racha", value: `${user?.streak || 0} días`, icon: "🔥", color: "text-orange-500" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className={`${stat.color} text-lg`}>{stat.icon}</span>
                  </div>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Menú principal">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href.split("?")[0]));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${isActive
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"} ${collapsed ? "justify-center" : ""}`}
                aria-current={isActive ? "page" : undefined}
                title={collapsed ? item.label : undefined}
              >
                <span className="text-xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
                {!collapsed && (
                  <div className="flex-1 min-w-0 flex items-center justify-between">
                    <span className="font-medium truncate">{item.label}</span>
                    {item.badge && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="p-3 border-t border-zinc-200 dark:border-zinc-700">
            <Link
              href="/profile?tab=premium"
              className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium transition-all duration-200 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25"
            >
              <span className="text-xl">✨</span>
              <span>Premium</span>
              <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-white/20 rounded-full">Pro</span>
            </Link>
          </div>
        )}

        {collapsed && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20">
            <button
              onClick={onToggle}
              className="w-full p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Expandir menú"
            >
              <svg className="w-5 h-5 mx-auto rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m14 0l-7-7m7 7l-7 7m-7 7H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}