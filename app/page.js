import Link from "next/link";
import { Button } from "@/components/ui/Button";

const features = [
  {
    icon: "🎯",
    title: "Aprendizaje Personalizado",
    description: "IA que adapta el contenido a tu nivel y estilo de aprendizaje. Cada leccion se ajusta a tu progreso.",
  },
  {
    icon: "🏆",
    title: "Gamificacion Completa",
    description: "Sube de nivel, gana EXP, monedas y desbloquea logros. Convierte el estudio en una aventura epica.",
  },
  {
    icon: "📊",
    title: "Progreso Visual",
    description: "Mapas de niveles, barras de progreso y estadisticas detalladas. Ve tu evolucion en tiempo real.",
  },
  {
    icon: "🎮",
    title: "Escenarios Inmersivos",
    description: "Aplica lo aprendido en situaciones reales: mercado, hospital, banco, transporte y mas.",
  },
];

const howItWorks = [
  { step: "01", title: "Diagnostico Inicial", description: "Realiza un examen rapido para detectar tu nivel actual en cada materia." },
  { step: "02", title: "Ruta Personalizada", description: "Recibe un plan de estudios adaptado a tus fortalezas y debilidades." },
  { step: "03", title: "Aprende Jugando", description: "Completa lecciones interactivas, gana recompensas y desbloquea nuevos niveles." },
  { step: "04", title: "Domina la Materia", description: "Alcanza el nivel 5 y certifica tus conocimientos con examenes finales." },
];

const gamificationFeatures = [
  { icon: "⭐", title: "Sistema de EXP", desc: "Gana experiencia por cada ejercicio completado y sube de nivel." },
  { icon: "💰", title: "Monedas Virtuales", desc: "Canjea monedas por skins, accesorios y potenciadores en la tienda." },
  { icon: "🏅", title: "Logros y Medallas", desc: "Desbloquea mas de 50 logros por hitos, rachas y maestria." },
  { icon: "📦", title: "Cofres de Recompensa", desc: "Abre cofres diarios, semanales y por logros especiales." },
  { icon: "👕", title: "Personalizacion", desc: "Personaliza tu avatar con skins, marcos, fondos y efectos unicos." },
  { icon: "🔥", title: "Rachas Diarias", desc: "Manten tu racha de estudio y gana bonificaciones exponenciales." },
];

const subjects = [
  { name: "Matematicas", icon: "🔢", color: "from-blue-500 to-cyan-500", topics: "Algebra, Geometria, Calculo, Estadistica" },
  { name: "Ingles", icon: "🇬🇧", color: "from-green-500 to-emerald-500", topics: "Gramatica, Vocabulario, Reading, Listening" },
  { name: "Biologia", icon: "🧬", color: "from-pink-500 to-rose-500", topics: "Celulas, Genetica, Ecologia, Anatomia" },
  { name: "Ciencias Sociales", icon: "🌍", color: "from-amber-500 to-orange-500", topics: "Historia, Geografia, Economia, Politica" },
];

const comingSoon = [
  { name: "Lenguaje", icon: "📖", color: "from-purple-500 to-violet-500" },
  { name: "Fisica", icon: "⚛️", color: "from-indigo-500 to-blue-500" },
  { name: "Quimica", icon: "🧪", color: "from-teal-500 to-cyan-500" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-700">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navegacion principal">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2" aria-label="StudyGuide Home">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">SG</span>
              </div>
              <span className="font-bold text-xl text-zinc-900 dark:text-white">StudyGuide</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/auth" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                Iniciar sesion
              </Link>
              <Link href="/auth?tab=register">
                <Button size="md">Comenzar a aprender</Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-900/20 dark:via-transparent dark:to-purple-900/20" />
          <div className="absolute inset-0 bg-grid-pattern opacity-50" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-6 animate-slide-up">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Nueva version 2.0: IA Educativa + Gamificacion Total
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
                Aprende <span className="gradient-text">Jugando</span>, Domina <span className="gradient-text">Cualquier Materia</span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "200ms" }}>
                La plataforma educativa que combina IA personalizada, gamificacion profunda y escenarios inmersivos para que aprender sea tan adictivo como tu juego favorito.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "300ms" }}>
                <Link href="/auth?tab=register">
                  <Button size="xl" className="w-full sm:w-auto">
                    <span>Comenzar Gratis</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </Button>
                </Link>
                <Link href="/learn">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    <span>Explorar Materias</span>
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400 animate-slide-up" style={{ animationDelay: "400ms" }}>
                Sin tarjeta de credito • Cancela cuando quieras • 150,000+ estudiantes activos
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28 bg-white dark:bg-zinc-950" aria-labelledby="features-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                Todo lo que necesitas para <span className="gradient-text">aprender de verdad</span>
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300">
                Hemos disenado cada caracteristica pensando en como aprende realmente el cerebro humano.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <article
                  key={feature.title}
                  className="group relative p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{feature.description}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28 bg-zinc-50 dark:bg-zinc-900" aria-labelledby="how-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 id="how-heading" className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                Como funciona en <span className="gradient-text">4 pasos simples</span>
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300">
                De principiante a experto en tu ritmo, con la guia perfecta en cada paso.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((step, index) => (
                <article
                  key={step.step}
                  className="relative p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-indigo-500/20 dark:text-indigo-500/20">{step.step}</span>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{step.description}</p>
                  {index < 3 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 hidden md:block">
                      <svg className="w-full h-full text-zinc-300 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28 bg-white dark:bg-zinc-950" aria-labelledby="gamification-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 id="gamification-heading" className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                Gamificacion que <span className="gradient-text">te engancha</span>
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300">
                No son solo puntos. Es un sistema completo de progresion, recompensas y personalizacion.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gamificationFeatures.map((feature, index) => (
                <article
                  key={feature.title}
                  className="group p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-2xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{feature.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28 bg-zinc-50 dark:bg-zinc-900" aria-labelledby="subjects-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 id="subjects-heading" className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                Materias <span className="gradient-text">disponibles</span>
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300">
                Cada materia tiene 5 niveles progresivos, desde fundamentos hasta nivel experto.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {subjects.map((subject, index) => (
                <Link
                  key={subject.name}
                  href="/learn"
                  className="group relative p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${subject.color}`}>
                      {subject.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{subject.name}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">5 Niveles • 50+ Lecciones</p>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 relative">{subject.topics}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </div>
            <div className="text-center mb-12">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Proximamente</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {comingSoon.map((subject, index) => (
                  <article
                    key={subject.name}
                    className="p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border-2 border-dashed border-zinc-300 dark:border-zinc-600 opacity-70 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${subject.color} mb-3`}>
                      {subject.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{subject.name}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">En desarrollo</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28 relative overflow-hidden" aria-labelledby="cta-heading">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl" />
          
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative text-center">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 animate-slide-up">
              ¿Listo para <span className="text-yellow-300">empezar tu aventura</span>?
            </h2>
            <p className="text-lg sm:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "100ms" }}>
              Unete a mas de 150,000 estudiantes que ya estan aprendiendo de forma divertida y efectiva. Gratis para siempre.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Link href="/auth?tab=register">
                <Button size="xl" variant="secondary" className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-indigo-50">
                  <span>Crear Cuenta Gratis</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Button>
              </Link>
              <Link href="/learn">
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <span>Ver Demo</span>
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-indigo-200 text-sm animate-slide-up" style={{ animationDelay: "300ms" }}>
              Sin tarjeta de credito • Configuracion en 30 segundos • Acceso inmediato
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-16" role="contentinfo">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4" aria-label="StudyGuide Home">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SG</span>
                </div>
                <span className="font-bold text-xl text-zinc-900 dark:text-white">StudyGuide</span>
              </Link>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                La plataforma educativa gamificada que hace que aprender sea tan divertido como jugar.
              </p>
            </div>
            <nav aria-label="Producto">
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li><Link href="/learn" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Materias</Link></li>
                <li><Link href="/diagnostic" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Diagnostico</Link></li>
                <li><Link href="/profile?tab=shop" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Tienda</Link></li>
                <li><Link href="/settings" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Premium</Link></li>
              </ul>
            </nav>
            <nav aria-label="Empresa">
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Sobre Nosotros</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Carreras</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contacto</Link></li>
              </ul>
            </nav>
            <nav aria-label="Legal">
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacidad</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terminos</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Cookies</Link></li>
              </ul>
            </nav>
          </div>
          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} StudyGuide. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" aria-label="Discord">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.618-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.675 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.084.084 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 01.046-.037c.193-.024.389-.037.583-.037.195 0 .39.013.582.037a.075.075 0 01.047.037 14.45 14.45 0 001.179 1.947.077.077 0 00.085.028 19.839 19.839 0 006.04-3.03.077.077 0 00.032-.054c.382-4.132-.59-8.617-3.65-13.694a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333 1.007-2.417 2.157-2.417 1.171 0 2.156 1.094 2.156 2.417 0 1.343-1.008 2.42-2.156 2.42zm7.975 0c-1.183 0-2.167-1.085-2.167-2.419 0-1.333 1.017-2.417 2.178-2.417 1.16 0 2.16 1.094 2.149 2.417 0 1.343-1.002 2.42-2.16 2.42z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}