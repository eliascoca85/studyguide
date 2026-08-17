"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Tabs, TabList, TabTrigger, TabPanel } from "@/components/ui/Tabs";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

const user = {
  name: "Juan Delgado",
  email: "juan@estudio.com",
  level: 12,
  exp: 12450,
  coins: 1250,
  streak: 7,
  avatar: null,
  isPremium: false,
};

export default function SettingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("settings");
  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    streakReminder: true,
    weeklyReport: true,
    achievements: true,
  });
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showProgress: true,
    showAchievements: true,
    showLeaderboard: false,
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePrivacy = (key) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const premiumBenefits = [
    { icon: "⚡", title: "Doble Progreso", desc: "Gana 2x EXP y monedas en todas las lecciones y exámenes" },
    { icon: "📦", title: "Cofres Ilimitados", desc: "Abre cofres diarios sin espera y cofres semanales gratis" },
    { icon: "👑", title: "Skins Exclusivas", desc: "Acceso a 15+ skins premium y accesorios legendarios" },
    { icon: "🎯", title: "Diagnósticos Avanzados", desc: "Exámenes detallados con IA y rutas de aprendizaje personalizadas" },
    { icon: "📊", title: "Estadísticas Profundas", desc: "Análisis de fortalezas, debilidades y predicción de nivel" },
    { icon: "🚫", title: "Sin Anuncios", desc: "Experiencia completamente libre de publicidad" },
    { icon: "☁️", title: "Sincronización en la Nube", desc: "Progreso guardado automáticamente en todos tus dispositivos" },
    { icon: "🎓", title: "Certificados Oficiales", desc: "Genera certificados verificables al completar cada nivel" },
    { icon: "👨‍🏫", title: "Tutor IA Personal", desc: "Asistente educativo 24/7 con explicaciones paso a paso" },
    { icon: "🏆", title: "Modo Competitivo", desc: "Ligas semanales, torneos y tablas de clasificación globales" },
    { icon: "🎨", title: "Temas Personalizados", desc: "Interfaz completamente personalizable con temas exclusivos" },
    { icon: "⏰", title: "Recordatorios Inteligentes", desc: "Notificaciones adaptativas basadas en tus hábitos de estudio" },
  ];

  const plans = [
    { name: "Mensual", price: "9.99", period: "/mes", original: "9.99", popular: false, features: ["Acceso Premium completo", "Cancelar en cualquier momento"] },
    { name: "Anual", price: "79.99", period: "/año", original: "119.88", popular: true, features: ["Ahorra 33% (equivale a $6.67/mes)", "Acceso Premium completo", "Skin exclusiva 'Fundador'", "Soporte prioritario"] },
    { name: "Vitalicio", price: "299.99", period: "pago único", original: "—", popular: false, features: ["Acceso Premium para siempre", "Todas las futuras actualizaciones", "Skin legendaria 'Leyenda'", "Soporte VIP directo", "Acceso anticipado a betas"] },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navbar user={user} />
      <div className="flex">
        <Sidebar user={user} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className={`flex-1 pt-16 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-72"}`}>
          <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
            <div className="mb-8 animate-slide-up">
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">Ajustes</h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1">Personaliza tu experiencia en StudyGuide</p>
            </div>

            <Tabs defaultValue={activeTab} onChange={setActiveTab} variant="segment" className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              <TabList>
                <TabTrigger value="settings">⚙️ Ajustes</TabTrigger>
                <TabTrigger value="premium">✨ Premium</TabTrigger>
              </TabList>

              <TabPanel value="settings">
                <div className="space-y-6">
                  <Card variant="elevated" padding="lg">
                    <CardHeader title="Cuenta" subtitle="Información de tu perfil y credenciales" />
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                          <Avatar size="xl" fallback={user.name.substring(0,2).toUpperCase()} alt={user.name} />
                          <div>
                            <h4 className="font-semibold text-zinc-900 dark:text-white">{user.name}</h4>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm">{user.email}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Nivel {user.level} • {user.exp.toLocaleString()} EXP</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center md:justify-end">
                          <Button variant="outline" size="sm">Editar Perfil</Button>
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Nombre completo" name="name" value={user.name} placeholder="Juan Delgado" />
                        <Input label="Correo electrónico" name="email" type="email" value={user.email} placeholder="juan@estudio.com" />
                        <Input label="Contraseña actual" name="currentPassword" type="password" placeholder="••••••••" />
                        <Input label="Nueva contraseña" name="newPassword" type="password" placeholder="••••••••" hint="Mínimo 8 caracteres" />
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button size="md">Guardar Cambios</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card variant="elevated" padding="lg">
                    <CardHeader title="Apariencia" subtitle="Personaliza cómo se ve StudyGuide" />
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Tema de color</label>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { value: "light", label: "Claro", icon: "☀️", desc: "Siempre modo claro" },
                              { value: "dark", label: "Oscuro", icon: "🌙", desc: "Siempre modo oscuro" },
                              { value: "system", label: "Sistema", icon: "💻", desc: "Sigue la configuración del SO" },
                            ].map((t) => (
                              <button
                                key={t.value}
                                onClick={() => setTheme(t.value)}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${
                                  theme === t.value
                                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 ring-2 ring-indigo-500/20"
                                    : "border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{t.icon}</span>
                                  <div>
                                    <p className="font-semibold text-zinc-900 dark:text-white">{t.label}</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.desc}</p>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-700">
                          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Densidad de la interfaz</label>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { value: "compact", label: "Compacta", desc: "Más contenido en pantalla" },
                              { value: "comfortable", label: "Confortable", desc: "Equilibrio perfecto" },
                              { value: "spacious", label: "Espaciosa", desc: "Más aire y legibilidad" },
                            ].map((d) => (
                              <button className={`p-4 rounded-xl border-2 text-center transition-all border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-700`}>
                                <p className="font-semibold text-zinc-900 dark:text-white">{d.label}</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">{d.desc}</p>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-700">
                          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Animaciones</label>
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500" />
                              <span className="text-zinc-700 dark:text-zinc-300">Animaciones de transición</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500" />
                              <span className="text-zinc-700 dark:text-zinc-300">Efectos de partículas</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500" />
                              <span className="text-zinc-700 dark:text-zinc-300">Reducir movimiento (accesibilidad)</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card variant="elevated" padding="lg">
                    <CardHeader title="Notificaciones" subtitle="Configura qué notificaciones recibir" />
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { key: "email", label: "Notificaciones por email", desc: "Resúmenes semanales, logros y recordatorios" },
                          { key: "push", label: "Notificaciones push", desc: "Alertas en tiempo real en el navegador" },
                          { key: "streakReminder", label: "Recordatorio de racha", desc: "Aviso si vas a perder tu racha diaria" },
                          { key: "weeklyReport", label: "Informe semanal", desc: "Resumen de tu progreso cada lunes" },
                          { key: "achievements", label: "Logros desbloqueados", desc: "Notificación instantánea al conseguir logros" },
                        ].map((notif) => (
                          <div key={notif.key} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                            <div className="flex-1">
                              <p className="font-medium text-zinc-900 dark:text-white">{notif.label}</p>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">{notif.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                defaultChecked={notifications[notif.key]}
                                onChange={() => toggleNotification(notif.key)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-zinc-300 peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-zinc-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card variant="elevated" padding="lg">
                    <CardHeader title="Privacidad" subtitle="Controla quién ve tu información" />
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { key: "profilePublic", label: "Perfil público", desc: "Otros usuarios pueden ver tu perfil y estadísticas" },
                          { key: "showProgress", label: "Mostrar progreso", desc: "Tu progreso en materias visible para otros" },
                          { key: "showAchievements", label: "Mostrar logros", desc: "Tus logros desbloqueados visibles en tu perfil" },
                          { key: "showLeaderboard", label: "Aparecer en rankings", desc: "Incluirte en tablas de clasificación globales" },
                        ].map((priv) => (
                          <div key={priv.key} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                            <div className="flex-1">
                              <p className="font-medium text-zinc-900 dark:text-white">{priv.label}</p>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">{priv.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                defaultChecked={privacy[priv.key]}
                                onChange={() => togglePrivacy(priv.key)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-zinc-300 peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-zinc-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card variant="elevated" padding="lg" className="border-red-200 dark:border-red-800">
                    <CardHeader title="Zona de Peligro" subtitle="Acciones irreversibles" />
                    <CardContent>
                      <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                        <div>
                          <p className="font-semibold text-red-800 dark:text-red-300">Eliminar cuenta</p>
                          <p className="text-sm text-red-700 dark:text-red-400">Eliminar permanentemente tu cuenta y todos tus datos</p>
                        </div>
                        <Button variant="danger" size="sm">Eliminar Cuenta</Button>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                        <div>
                          <p className="font-semibold text-amber-800 dark:text-amber-300">Restablecer progreso</p>
                          <p className="text-sm text-amber-700 dark:text-amber-400">Volver al nivel 1, perder todo el progreso pero mantener la cuenta</p>
                        </div>
                        <Button variant="warning" size="sm">Restablecer</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabPanel>

              <TabPanel value="premium">
                <div className="space-y-6">
                  {!user.isPremium && (
                    <Card variant="premium" padding="xl" className="text-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
                      <div className="absolute top-4 right-4">
                        <Badge variant="premium" size="sm">ACTUALIZAR AHORA</Badge>
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <span className="text-4xl">✨</span>
                          <h2 className="text-3xl font-bold">StudyGuide Premium</h2>
                          <Badge variant="premium" size="sm">PRO</Badge>
                        </div>
                        <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
                          Desbloquea todo el potencial de tu aprendizaje. Progreso 2x más rápido, 
                          contenido exclusivo, tutor IA personal y mucho más.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                          {plans.map((plan) => (
                            <div 
                              key={plan.name} 
                              className={`relative p-6 rounded-2xl text-center transition-all ${
                                plan.popular 
                                  ? "bg-white dark:bg-zinc-900 ring-2 ring-amber-500 shadow-xl shadow-amber-500/20 scale-105 z-10"
                                  : "bg-white/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:border-amber-300 dark:hover:border-amber-700"
                              }`}
                            >
                              {plan.popular && (
                                <Badge variant="premium" size="xs" className="absolute -top-2 left-1/2 -translate-x-1/2">MÁS POPULAR</Badge>
                              )}
                              <h4 className="font-bold text-zinc-900 dark:text-white mb-2">{plan.name}</h4>
                              <div className="mb-3">
                                <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">${plan.price}</span>
                                <span className="text-zinc-500 dark:text-zinc-400">{plan.period}</span>
                              </div>
                              {plan.original !== "—" && plan.original !== plan.price && (
                                <p className="text-sm line-through text-zinc-500 dark:text-zinc-400 mb-3">${plan.original} {plan.period}</p>
                              )}
                              <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2 mb-6 text-left">
                                {plan.features.map((f) => (
                                  <li key={f} className="flex items-center gap-2">
                                    <span className="text-emerald-500">✓</span>
                                    {f}
                                  </li>
                                ))}
                              </ul>
                              <Button 
                                variant={plan.popular ? "secondary" : "outline"} 
                                size="md" 
                                className="w-full"
                              >
                                {plan.popular ? "Elegir Anual" : "Elegir"}
                              </Button>
                            </div>
                          ))}
                        </div>
                        
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Todos los planes incluyen prueba gratis de 7 días. Cancela en cualquier momento.
                        </p>
                      </div>
                    </Card>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card variant="elevated" padding="lg">
                      <CardHeader title="Beneficios Premium" subtitle="Todo lo que desbloqueas" />
                      <CardContent>
                        <div className="space-y-3">
                          {premiumBenefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-lg flex-shrink-0">
                                {benefit.icon}
                              </div>
                              <div>
                                <h4 className="font-semibold text-zinc-900 dark:text-white">{benefit.title}</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{benefit.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card variant="elevated" padding="lg">
                      <CardHeader title="Comparación" subtitle="Gratis vs Premium" />
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                                <th className="text-left p-3 font-semibold text-zinc-900 dark:text-white">Característica</th>
                                <th className="text-center p-3 font-semibold text-zinc-900 dark:text-white">Gratis</th>
                                <th className="text-center p-3 font-semibold text-amber-600 dark:text-amber-400">Premium</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                              {[
                                { feature: "Acceso a todas las materias", free: true, premium: true },
                                { feature: "Lecciones ilimitadas", free: true, premium: true },
                                { feature: "Exámenes diagnósticos", free: "3/mes", premium: "Ilimitados" },
                                { feature: "EXP y monedas", free: "1x", premium: "2x" },
                                { feature: "Cofres diarios", free: "1/día", premium: "Ilimitados" },
                                { feature: "Skins y accesorios", free: "Básicos", premium: "Todos + Exclusivos" },
                                { feature: "Tutor IA", free: false, premium: true },
                                { feature: "Estadísticas avanzadas", free: false, premium: true },
                                { feature: "Certificados", free: false, premium: true },
                                { feature: "Modo competitivo", free: false, premium: true },
                                { feature: "Sin anuncios", free: false, premium: true },
                                { feature: "Soporte prioritario", free: false, premium: true },
                              ].map((row, i) => (
                                <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                                  <td className="p-3 text-zinc-700 dark:text-zinc-300">{row.feature}</td>
                                  <td className="text-center p-3">
                                    {row.free === true ? (
                                      <Badge variant="success" size="xs">Incluido</Badge>
                                    ) : row.free === false ? (
                                      <Badge variant="locked" size="xs">No</Badge>
                                    ) : (
                                      <span className="text-zinc-600 dark:text-zinc-400">{row.free}</span>
                                    )}
                                  </td>
                                  <td className="text-center p-3">
                                    {row.premium === true ? (
                                      <Badge variant="premium" size="xs">Incluido</Badge>
                                    ) : (
                                      <span className="font-semibold text-amber-600 dark:text-amber-400">{row.premium}</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {user.isPremium && (
                    <Card variant="premium" padding="lg" className="text-center">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-3xl">👑</span>
                        <h3 className="text-xl font-bold">¡Gracias por ser Premium!</h3>
                      </div>
                      <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                        Tu suscripción está activa. Disfrutas de todos los beneficios Premium.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button variant="secondary" size="sm">Gestionar Suscripción</Button>
                        <Button variant="outline" size="sm">Facturación</Button>
                      </div>
                    </Card>
                  )}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}