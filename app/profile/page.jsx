"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
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
  expToNext: 15000,
  coins: 1250,
  streak: 7,
  joinDate: "Enero 2024",
  avatar: null,
};

const achievements = [
  { id: 1, name: "Primer Paso", desc: "Completaste tu primera lección", icon: "👣", rarity: "common", unlocked: true, date: "Ene 2024" },
  { id: 2, name: "Matemático Novato", desc: "Nivel 1 de Matemáticas completado", icon: "🔢", rarity: "common", unlocked: true, date: "Feb 2024" },
  { id: 3, name: "Racha de Fuego", desc: "7 días consecutivos estudiando", icon: "🔥", rarity: "rare", unlocked: true, date: "Mar 2024" },
  { id: 4, name: "Políglota Inicial", desc: "Nivel 1 de Inglés completado", icon: "🇬🇧", rarity: "common", unlocked: true, date: "Mar 2024" },
  { id: 5, name: "Explorador", desc: "Probaste las 4 materias disponibles", icon: "🧭", rarity: "rare", unlocked: true, date: "Abr 2024" },
  { id: 6, name: "Biólogo Aficionado", desc: "Nivel 1 de Biología completado", icon: "🧬", rarity: "common", unlocked: true, date: "May 2024" },
  { id: 7, name: "Centurión", desc: "100 lecciones completadas", icon: "💯", rarity: "epic", unlocked: true, date: "Jun 2024" },
  { id: 8, name: "Historiador", desc: "Nivel 3 de Ciencias Sociales completado", icon: "🌍", rarity: "rare", unlocked: true, date: "Jul 2024" },
  { id: 9, name: "Maestro de las Ecuaciones", desc: "Nivel 3 de Matemáticas completado", icon: "📐", rarity: "epic", unlocked: false, date: null },
  { id: 10, name: "Coleccionista", desc: "Abre 50 cofres", icon: "📦", rarity: "rare", unlocked: false, date: null },
  { id: 11, name: "Racha Inquebrantable", desc: "30 días consecutivos", icon: "🔥🔥", rarity: "legendary", unlocked: false, date: null },
  { id: 12, name: "Sabio Supremo", desc: "Alcanza el nivel 50", icon: "🧙‍♂️", rarity: "legendary", unlocked: false, date: null },
];

const skins = [
  { id: 1, name: "Explorador", icon: "🧭", price: 0, owned: true, equipped: true, rarity: "common" },
  { id: 2, name: "Científico", icon: "🔬", price: 500, owned: true, equipped: false, rarity: "common" },
  { id: 3, name: "Astronauta", icon: "👨‍🚀", price: 2000, owned: false, equipped: false, rarity: "rare" },
  { id: 4, name: "Mago", icon: "🧙‍♂️", price: 5000, owned: false, equipped: false, rarity: "epic" },
  { id: 5, name: "Dragón", icon: "🐉", price: 15000, owned: false, equipped: false, rarity: "legendary" },
  { id: 6, name: "Robot", icon: "🤖", price: 3000, owned: false, equipped: false, rarity: "rare" },
];

const accessories = [
  { id: 1, name: "Gafas Inteligentes", icon: "👓", price: 300, owned: true, equipped: true, slot: "cara" },
  { id: 2, name: "Gorra de Graduado", icon: "🎓", price: 800, owned: true, equipped: false, slot: "cabeza" },
  { id: 3, name: "Mochila de Aventurero", icon: "🎒", price: 1200, owned: false, equipped: false, slot: "espalda" },
  { id: 4, name: "Alas de Hada", icon: "🧚", price: 4000, owned: false, equipped: false, slot: "espalda" },
  { id: 5, name: "Corona de Laureles", icon: "🏆", price: 2500, owned: false, equipped: false, slot: "cabeza" },
];

const chests = [
  { id: 1, name: "Cofre Diario", icon: "📦", rarity: "common", cost: "Gratis", available: true, cooldown: "0h" },
  { id: 2, name: "Cofre Semanal", icon: "🎁", rarity: "rare", cost: "500 💰", available: false, cooldown: "3d 12h" },
  { id: 3, name: "Cofre de Logro", icon: "🏆", rarity: "epic", cost: "Logro: Centurión", available: true, cooldown: null },
  { id: 4, name: "Cofre Premium", icon: "✨", rarity: "legendary", cost: "Premium", available: false, cooldown: null },
];

const rarityStyles = {
  common: "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600",
  rare: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
  epic: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
  legendary: "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800",
};

const rarityText = {
  common: "text-zinc-600 dark:text-zinc-400",
  rare: "text-blue-600 dark:text-blue-400",
  epic: "text-purple-600 dark:text-purple-400",
  legendary: "text-amber-600 dark:text-amber-400",
};

export default function ProfilePage({ searchParams }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const params = searchParams || {};
  const initialTab = params.tab || "profile";

  const expPercentage = (user.exp / user.expToNext) * 100;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navbar user={user} />
      <div className="flex">
        <Sidebar user={user} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className={`flex-1 pt-16 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-72"}`}>
          <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
            <div className="mb-8 animate-slide-up">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">Mi Perfil</h1>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-1">Personaliza tu experiencia y revisa tu progreso</p>
                </div>
                <Link href="/settings">
                  <Button variant="outline" size="sm">⚙️ Ajustes</Button>
                </Link>
              </div>
            </div>

            <Tabs defaultValue={initialTab} variant="pills" className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              <TabList>
                <TabTrigger value="profile">👤 Perfil</TabTrigger>
                <TabTrigger value="customization">🎨 Personalización</TabTrigger>
                <TabTrigger value="achievements">🏆 Logros</TabTrigger>
                <TabTrigger value="shop">🛍️ Tienda</TabTrigger>
              </TabList>

              <TabPanel value="profile">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card variant="gradient" padding="xl" className="lg:col-span-1">
                    <div className="text-center">
                      <Avatar size="2xl" fallback={user.name.substring(0,2).toUpperCase()} alt={user.name} className="mx-auto mb-4 ring-4 ring-white/30 dark:ring-zinc-900/30" />
                      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">{user.name}</h2>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-4">@{user.email.split("@")[0]}</p>
                      
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <Badge variant="premium" size="md">Nivel {user.level}</Badge>
                        <Badge variant="success" size="md" dot>Racha: {user.streak} días</Badge>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-600 dark:text-zinc-400">EXP Total</span>
                          <span className="font-bold text-zinc-900 dark:text-white">{user.exp.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-600 dark:text-zinc-400">Monedas</span>
                          <span className="font-bold text-amber-600 dark:text-amber-400">{user.coins.toLocaleString()} 💰</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-600 dark:text-zinc-400">Miembro desde</span>
                          <span className="font-medium text-zinc-900 dark:text-white">{user.joinDate}</span>
                        </div>
                      </div>

                      <ProgressBar value={user.exp} max={user.expToNext} size="lg" variant="exp" showLabel />
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 text-center">
                        {user.expToNext - user.exp} EXP para nivel {user.level + 1}
                      </p>
                    </div>
                  </Card>

                  <Card variant="elevated" padding="lg" className="lg:col-span-2">
                    <CardHeader title="Estadísticas Generales" subtitle="Tu rendimiento global en la plataforma" />
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {[
                          { label: "Lecciones", value: "247", icon: "📚", color: "text-indigo-500" },
                          { label: "Exámenes", value: "23", icon: "📝", color: "text-emerald-500" },
                          { label: "Materias", value: "4/7", icon: "📖", color: "text-purple-500" },
                          { label: "Logros", value: "8/12", icon: "🏆", color: "text-amber-500" },
                        ].map((stat) => (
                          <div key={stat.label} className="text-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                            <div className={`${stat.color} text-3xl mb-2`}>{stat.icon}</div>
                            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                          </div>
                        ))}
                      </div>

                      <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Progreso por Materia</h4>
                      <div className="space-y-4">
                        {[
                          { name: "Matemáticas", level: 3, progress: 65, color: "from-blue-500 to-cyan-500", icon: "🔢" },
                          { name: "Inglés", level: 2, progress: 40, color: "from-green-500 to-emerald-500", icon: "🇬🇧" },
                          { name: "Biología", level: 1, progress: 15, color: "from-pink-500 to-rose-500", icon: "🧬" },
                          { name: "Ciencias Sociales", level: 4, progress: 85, color: "from-amber-500 to-orange-500", icon: "🌍" },
                        ].map((subj) => (
                          <div key={subj.name} className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${subj.color}`}>
                              {subj.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-zinc-900 dark:text-white">{subj.name}</span>
                                <span className="text-zinc-500 dark:text-zinc-400">Nivel {subj.level}</span>
                              </div>
                              <ProgressBar value={subj.progress} max={100} size="sm" variant="default" />
                            </div>
                            <Badge variant="primary" size="sm">{subj.progress}%</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabPanel>

              <TabPanel value="customization">
                <div className="space-y-6">
                  <Card variant="elevated" padding="lg">
                    <CardHeader title="Skins Disponibles" subtitle="Cambia la apariencia de tu avatar" />
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {skins.map((skin) => (
                          <div key={skin.id} className={`${rarityStyles[skin.rarity]} border-2 rounded-xl p-4 text-center transition-all ${skin.owned ? (skin.equipped ? "ring-2 ring-indigo-500" : "hover:ring-2 ring-indigo-500 cursor-pointer") : "opacity-60 cursor-not-allowed"}`}>
                            <div className="text-4xl mb-2">{skin.icon}</div>
                            <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">{skin.name}</h4>
                            <Badge variant={skin.rarity === "legendary" ? "premium" : skin.rarity} size="xs">
                              {skin.rarity}
                            </Badge>
                            <div className="mt-2 flex justify-center gap-2">
                              {skin.equipped ? (
                                <Badge variant="success" size="xs">Equipado</Badge>
                              ) : skin.owned ? (
                                <Button variant="outline" size="xs" className="w-20">Equipar</Button>
                              ) : (
                                <Button variant="outline" size="xs" className="w-20" disabled>
                                  {skin.price} 💰
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card variant="elevated" padding="lg">
                    <CardHeader title="Accesorios" subtitle="Personaliza tu avatar con accesorios" />
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {accessories.map((acc) => (
                          <div key={acc.id} className={`${rarityStyles.common} border rounded-xl p-4 text-center transition-all ${acc.owned ? (acc.equipped ? "ring-2 ring-indigo-500" : "hover:ring-2 ring-indigo-500 cursor-pointer") : "opacity-60 cursor-not-allowed"}`}>
                            <div className="text-3xl mb-2">{acc.icon}</div>
                            <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">{acc.name}</h4>
                            <Badge variant="default" size="xs">{acc.slot}</Badge>
                            <div className="mt-2">
                              {acc.equipped ? (
                                <Badge variant="success" size="xs">Equipado</Badge>
                              ) : acc.owned ? (
                                <Button variant="outline" size="xs" className="w-full">Equipar</Button>
                              ) : (
                                <Button variant="outline" size="xs" className="w-full" disabled>
                                  {acc.price} 💰
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card variant="elevated" padding="lg">
                    <CardHeader title="Cofres Disponibles" subtitle="Abre cofres para conseguir recompensas" />
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {chests.map((chest) => (
                          <div key={chest.id} className={`${rarityStyles[chest.rarity]} border-2 rounded-xl p-5 text-center relative ${chest.available ? "" : "opacity-50"}`}>
                            <div className="text-4xl mb-2">{chest.icon}</div>
                            <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">{chest.name}</h4>
                            <Badge variant={chest.rarity === "legendary" ? "premium" : chest.rarity} size="sm">{chest.rarity}</Badge>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-3">{chest.cost}</p>
                            {chest.cooldown && (
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">Disponible en: {chest.cooldown}</p>
                            )}
                            <Button 
                              variant={chest.rarity === "legendary" ? "premium" : "primary"} 
                              size="sm" 
                              className="w-full"
                              disabled={!chest.available}
                            >
                              {chest.available ? "Abrir" : "Bloqueado"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabPanel>

              <TabPanel value="achievements">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Progreso de Logros</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm">{achievements.filter(a => a.unlocked).length} / {achievements.length} desbloqueados</p>
                    </div>
                    <ProgressBar value={achievements.filter(a => a.unlocked).length} max={achievements.length} size="md" variant="success" className="w-48" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement) => (
                      <Card 
                        key={achievement.id} 
                        variant={achievement.unlocked ? "default" : "outlined"} 
                        className={`${rarityStyles[achievement.rarity]} border-2 ${!achievement.unlocked ? "opacity-50 grayscale" : ""} relative overflow-hidden`}
                      >
                        <div className="absolute top-2 right-2">
                          <Badge variant={achievement.rarity === "legendary" ? "premium" : achievement.rarity} size="xs">
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <CardContent className="p-4 text-center">
                          <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl mx-auto mb-3 ${achievement.unlocked ? "" : "bg-zinc-200 dark:bg-zinc-700"}`}>
                            {achievement.icon}
                          </div>
                          <h4 className="font-bold text-zinc-900 dark:text-white mb-1">{achievement.name}</h4>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">{achievement.desc}</p>
                          {achievement.unlocked ? (
                            <Badge variant="success" size="xs" className="mb-2">Desbloqueado {achievement.date}</Badge>
                          ) : (
                            <Badge variant="locked" size="xs" className="mb-2">Bloqueado</Badge>
                          )}
                          <ProgressBar value={achievement.unlocked ? 100 : 0} max={100} size="xs" variant={achievement.unlocked ? "success" : "default"} />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabPanel>

              <TabPanel value="shop">
                <div className="space-y-6">
                  <Card variant="premium" padding="lg" className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-3xl">✨</span>
                      <h3 className="text-xl font-bold">Tienda Premium</h3>
                      <Badge variant="premium" size="sm">PRO</Badge>
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300 mb-4 max-w-xl mx-auto">
                      Accede a skins exclusivas, cofres legendarios, doble experiencia y monedas, y elimina todos los límites.
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center mb-6">
                      <div className="p-3 bg-white/20 dark:bg-white/10 rounded-xl">
                        <p className="text-2xl font-bold">2x</p>
                        <p className="text-sm opacity-80">EXP y Monedas</p>
                      </div>
                      <div className="p-3 bg-white/20 dark:bg-white/10 rounded-xl">
                        <p className="text-2xl font-bold">∞</p>
                        <p className="text-sm opacity-80">Cofres Diarios</p>
                      </div>
                      <div className="p-3 bg-white/20 dark:bg-white/10 rounded-xl">
                        <p className="text-2xl font-bold">👑</p>
                        <p className="text-sm opacity-80">Skins Exclusivas</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-amber-600 hover:bg-amber-50">
                      Actualizar a Premium
                    </Button>
                  </Card>

                  <Card variant="elevated" padding="lg">
                    <CardHeader title="Destacados de la Semana" subtitle="Ofertas por tiempo limitado" />
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { name: "Skin: Cyberpunk", icon: "🤖", price: "2,500 💰", oldPrice: "3,500 💰", discount: "29%", color: "from-pink-500 to-purple-500" },
                          { name: "Cofre Épico x3", icon: "🎁", price: "1,200 💰", oldPrice: "1,800 💰", discount: "33%", color: "from-purple-500 to-indigo-500" },
                          { name: "Potenciador 2x EXP", icon: "⚡", price: "800 💰", oldPrice: "1,200 💰", discount: "33%", color: "from-yellow-500 to-orange-500" },
                        ].map((item) => (
                          <div key={item.name} className={`relative p-4 rounded-xl bg-gradient-to-br ${item.color} text-white`}>
                            <Badge variant="danger" size="xs" className="absolute top-3 right-3">-{item.discount}</Badge>
                            <div className="text-3xl mb-2">{item.icon}</div>
                            <h4 className="font-semibold mb-1">{item.name}</h4>
                            <div className="flex items-center justify-center gap-2 mb-3">
                              <span className="text-lg font-bold">{item.price}</span>
                              <span className="text-sm line-through opacity-70">{item.oldPrice}</span>
                            </div>
                            <Button variant="secondary" size="sm" className="w-full">Comprar</Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card variant="elevated" padding="lg">
                    <CardHeader title="Comprar Monedas" subtitle="Consigue más monedas para la tienda" />
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                          { coins: 500, price: "$4.99", bonus: "0%", popular: false },
                          { coins: 1200, price: "$9.99", bonus: "+20%", popular: true },
                          { coins: 2800, price: "$19.99", bonus: "+40%", popular: false },
                          { coins: 6000, price: "$39.99", bonus: "+60%", popular: false },
                          { coins: 15000, price: "$79.99", bonus: "+100%", popular: false },
                        ].map((pack) => (
                          <div key={pack.coins} className={`relative p-4 rounded-xl border-2 text-center ${pack.popular ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" : "border-zinc-200 dark:border-zinc-700"}`}>
                            {pack.popular && (
                              <Badge variant="primary" size="xs" className="absolute -top-2 left-1/2 -translate-x-1/2">Más Popular</Badge>
                            )}
                            <p className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">{pack.coins.toLocaleString()}</p>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-1">💰 Monedas</p>
                            {pack.bonus !== "0%" && (
                              <Badge variant="success" size="xs" className="mb-3">{pack.bonus} Extra</Badge>
                            )}
                            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">{pack.price}</p>
                            <Button variant={pack.popular ? "primary" : "outline"} size="sm" className="w-full">
                              Comprar
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}