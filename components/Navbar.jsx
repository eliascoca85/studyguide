"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/components/AuthProvider";

const navItems = [
  { href: "/dashboard", label: "Panel", icon: "🏠" },
  { href: "/learn", label: "Aprender", icon: "📚" },
  { href: "/profile", label: "Perfil", icon: "👤" },
  { href: "/settings", label: "Ajustes", icon: "⚙️" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/auth");
    router.refresh();
  };

  if (!isAuthenticated) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-700">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2" aria-label="StudyGuide Home">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">SG</span>
              </div>
              <span className="font-bold text-xl text-zinc-900 dark:text-white">StudyGuide</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/auth" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                Iniciar sesión
              </Link>
              <Link href="/auth?mode=register">
                <Button size="md">Comenzar gratis</Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-700">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2" aria-label="StudyGuide Home">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">SG</span>
              </div>
              <span className="font-bold text-xl text-zinc-900 dark:text-white hidden sm:block">StudyGuide</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span aria-hidden="true">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200 dark:border-indigo-800">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                <span className="text-lg">⭐</span>
                <span>{user?.exp?.toLocaleString() || 0}</span>
              </span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-amber-700 dark:text-amber-300 ml-2 pl-2 border-l border-indigo-200 dark:border-indigo-800">
                <span className="text-lg">💰</span>
                <span>{user?.coins?.toLocaleString() || 0}</span>
              </span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300 ml-2 pl-2 border-l border-indigo-200 dark:border-indigo-800">
                <span className="text-lg">📈</span>
                <span>Nivel {user?.level || 1}</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative group">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Link href="/profile" className="flex items-center gap-2">
                    <Avatar size="sm" fallback={getInitials(user?.name)} alt={user?.name} />
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{user?.name?.split(" ")[0] || "Usuario"}</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="sm:hidden">
                  <Avatar size="sm" fallback={getInitials(user?.name)} alt={user?.name} />
                </Button>
                
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <span>👤</span> Mi perfil
                  </Link>
                  <Link href="/profile?tab=achievements" className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <span>🏆</span> Logros
                  </Link>
                  <Link href="/profile?tab=shop" className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <span>🛍️</span> Tienda
                  </Link>
                  <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <span>⚙️</span> Ajustes
                  </Link>
                  <hr className="my-2 border-zinc-200 dark:border-zinc-700" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left"
                  >
                    <span>🚪</span> Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}