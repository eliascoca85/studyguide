"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import Link from "next/link";

const user = {
  name: "Juan Delgado",
  level: 12,
  exp: 12450,
  coins: 1250,
};

const lessonData = {
  subject: "math",
  level: 3,
  title: "Ecuaciones Cuadráticas",
  description: "Aprende a resolver ecuaciones de segundo grado usando la fórmula general y factorización.",
  xpReward: 150,
  coinReward: 25,
  estimatedTime: "15 min",
  steps: [
    {
      id: "explanation",
      title: "Explicación",
      icon: "📖",
      content: `
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">¿Qué es una ecuación cuadrática?</h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
          Una ecuación cuadrática (o de segundo grado) es una ecuación polinómica de la forma:
        </p>
        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 my-4 text-center font-mono text-lg">
          ax² + bx + c = 0
        </div>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
          Donde <strong>a, b, c</strong> son números reales y <strong>a ≠ 0</strong>. La incógnita es <strong>x</strong>.
        </p>
        
        <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3 mt-6">Métodos de resolución</h4>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">1. Fórmula General (Bhaskara)</h5>
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-3 text-center font-mono text-lg mb-2">
              x = (-b ± √(b² - 4ac)) / 2a
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">El discriminante Δ = b² - 4ac determina el número de soluciones:</p>
            <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1 pl-4 list-disc">
              <li>Δ > 0: Dos soluciones reales distintas</li>
              <li>Δ = 0: Una solución real doble</li>
              <li>Δ < 0: No hay soluciones reales (soluciones complejas)</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <h5 className="font-semibold text-green-800 dark:text-green-300 mb-2">2. Factorización</h5>
            <p className="text-sm text-green-700 dark:text-green-300 mb-2">Cuando el trinomio se puede factorizar como producto de binomios:</p>
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-3 text-center font-mono">
              x² - 5x + 6 = (x - 2)(x - 3) = 0 → x = 2, x = 3
            </div>
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
            <h5 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">3. Completar el Cuadrado</h5>
            <p className="text-sm text-purple-700 dark:text-purple-300">Útil para hallar el vértice de la parábola y derivar la fórmula general.</p>
          </div>
        </div>
      `,
    },
    {
      id: "example",
      title: "Ejemplo Resuelto",
      icon: "✏️",
      content: `
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Ejemplo: Resuelve 2x² - 8x + 6 = 0</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
            <h5 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-3">Paso 1: Identificar coeficientes</h5>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white dark:bg-zinc-800 rounded-lg p-3">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">a = 2</p>
              </div>
              <div className="bg-white dark:bg-zinc-800 rounded-lg p-3">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">b = -8</p>
              </div>
              <div className="bg-white dark:bg-zinc-800 rounded-lg p-3">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">c = 6</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <h5 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-3">Paso 2: Calcular el discriminante</h5>
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 font-mono text-lg text-center space-y-2">
              <p>Δ = b² - 4ac</p>
              <p>Δ = (-8)² - 4(2)(6)</p>
              <p>Δ = 64 - 48</p>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold">Δ = 16 > 0 → Dos soluciones reales</p>
            </div>
          </div>
          
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <h5 className="font-semibold text-amber-800 dark:text-amber-300 mb-3">Paso 3: Aplicar la fórmula general</h5>
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 font-mono text-lg text-center space-y-2">
              <p>x = (-(-8) ± √16) / (2·2)</p>
              <p>x = (8 ± 4) / 4</p>
              <p className="text-amber-600 dark:text-amber-400 font-bold">x₁ = (8 + 4) / 4 = 3</p>
              <p className="text-amber-600 dark:text-amber-400 font-bold">x₂ = (8 - 4) / 4 = 1</p>
            </div>
          </div>
          
          <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl border border-rose-200 dark:border-rose-800">
            <h5 className="font-semibold text-rose-800 dark:text-rose-300 mb-3">Paso 4: Verificación</h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-800 rounded-lg p-3 text-center">
                <p className="font-mono">Para x = 3:</p>
                <p className="font-mono text-sm">2(9) - 8(3) + 6 = 18 - 24 + 6 = 0 ✓</p>
              </div>
              <div className="bg-white dark:bg-zinc-800 rounded-lg p-3 text-center">
                <p className="font-mono">Para x = 1:</p>
                <p className="font-mono text-sm">2(1) - 8(1) + 6 = 2 - 8 + 6 = 0 ✓</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white">
          <p className="font-semibold">✅ Solución: x = 1 y x = 3</p>
          <p className="text-sm opacity-90 mt-1">La parábola corta al eje X en (1, 0) y (3, 0)</p>
        </div>
      `,
    },
    {
      id: "exercise",
      title: "Ejercicio Práctico",
      icon: "🎯",
      content: `
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">¡Ahora tú! Resuelve esta ecuación:</h3>
        
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-center text-white mb-6">
          <p className="text-xl font-mono text-2xl font-bold">3x² - 12x + 9 = 0</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Paso 1: Identifica a, b y c</label>
            <div className="grid grid-cols-3 gap-3">
              <input type="number" placeholder="a =" className="px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-center text-lg" />
              <input type="number" placeholder="b =" className="px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-center text-lg" />
              <input type="number" placeholder="c =" className="px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-center text-lg" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Paso 2: Calcula el discriminante Δ</label>
            <input type="number" placeholder="Δ = " className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-center text-lg" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Paso 3: Escribe las soluciones</label>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="x₁ =" className="px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-center text-lg" />
              <input type="number" placeholder="x₂ =" className="px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-center text-lg" />
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
          <p className="text-amber-800 dark:text-amber-300 text-sm">
            💡 <strong>Pista:</strong> Primero simplifica dividiendo toda la ecuación entre 3. Luego aplica la fórmula general.
          </p>
        </div>
      `,
    },
  ],
};

const scenarios = [
  { id: "market", name: "Mercado", icon: "🛒", bg: "from-amber-500 to-orange-500", desc: "Calcula precios, descuentos y presupuestos para tus compras." },
  { id: "hospital", name: "Hospital", icon: "🏥", bg: "from-red-500 to-rose-500", desc: "Aplica matemáticas en dosificación, estadísticas médicas y diagnósticos." },
  { id: "store", name: "Tienda", icon: "🏪", bg: "from-blue-500 to-cyan-500", desc: "Gestiona inventario, calcula márgenes de ganancia y ofertas." },
  { id: "bank", name: "Banco", icon: "🏦", bg: "from-emerald-500 to-green-500", desc: "Interés compuesto, préstamos, inversiones y planificación financiera." },
  { id: "transport", name: "Transporte", icon: "🚌", bg: "from-indigo-500 to-purple-500", desc: "Optimiza rutas, calcula velocidades, consumos y horarios." },
  { id: "home", name: "Casa", icon: "🏠", bg: "from-pink-500 to-rose-500", desc: "Presupuestos familiares, reformas, consumo energético y cocina." },
];

const currentScenario = scenarios[0]; // Mercado

export default function LessonPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState({ explanation: 100, example: 50, exercise: 0 });
  const [showScenario, setShowScenario] = useState(true);

  const steps = lessonData.steps;
  const currentStepData = steps[currentStep];
  const overallProgress = Object.values(stepProgress).reduce((a, b) => a + b, 0) / steps.length;

  const handleNextStep = () => {
    setStepProgress(prev => ({ ...prev, [currentStepData.id]: 100 }));
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleCompleteLesson = () => {
    setStepProgress(prev => ({ ...prev, [currentStepData.id]: 100 }));
    alert(`¡Lección completada! +${lessonData.xpReward} EXP, +${lessonData.coinReward} 💰`);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navbar user={user} />
      <div className="flex">
        <Sidebar user={user} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className={`flex-1 pt-16 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-72"}`}>
          <div className="h-[calc(100vh-4rem)] flex flex-col">
            <div className="p-4 sm:p-6 lg:p-4 flex-1 overflow-hidden">
              <div className="h-full flex lg:flex-row gap-4 overflow-hidden">
                <div className={`lg:w-2/3 flex flex-col h-full transition-all duration-300 ${!showScenario ? "lg:w-full" : ""}`}>
                  <div className="mb-4 flex-shrink-0">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <Link href="/learn" className="text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                          Materias
                        </Link>
                        <span className="text-zinc-400">/</span>
                        <span className="text-zinc-400">Matemáticas</span>
                        <span className="text-zinc-400">/</span>
                        <span className="font-medium text-zinc-900 dark:text-white">Nivel 3: Ecuaciones Cuadráticas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="primary" size="sm">⏱️ {lessonData.estimatedTime}</Badge>
                        <Badge variant="success" size="sm">⭐ +{lessonData.xpReward} EXP</Badge>
                        <Badge variant="premium" size="sm">💰 +{lessonData.coinReward}</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <ProgressBar value={overallProgress} max={100} size="md" variant="default" showLabel />
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setShowScenario(!showScenario)} className="whitespace-nowrap">
                        {showScenario ? "Ocultar escenario" : "Mostrar escenario"}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showScenario ? "M10 19l-7-7m0 0l7-7m-7 7h18" : "M14 5l7 7m0 0l-7 7m7-7H3"} />
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2">
                    <Card variant="elevated" padding="lg" className="h-full">
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-3xl">{currentStepData.icon}</span>
                          <div>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{currentStepData.title}</h2>
                            <p className="text-zinc-600 dark:text-zinc-400">{lessonData.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {steps.map((step, index) => (
                            <button
                              key={step.id}
                              onClick={() => setCurrentStep(index)}
                              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                index === currentStep
                                  ? "bg-indigo-500 text-white shadow-lg"
                                  : index < currentStep
                                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                              }`}
                            >
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                                index < currentStep ? "bg-emerald-500 text-white" : index === currentStep ? "bg-white/30" : "bg-zinc-300 dark:bg-zinc-600"
                              }`}>
                                {index < currentStep ? "✓" : index + 1}
                              </span>
                              <span className="hidden sm:inline">{step.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="prose prose-zinc dark:prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: currentStepData.content }} />
                      </div>

                      <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                        {currentStep > 0 && (
                          <Button variant="outline" onClick={() => setCurrentStep(prev => prev - 1)}>
                            ← Anterior
                          </Button>
                        )}
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-zinc-500 dark:text-zinc-400">
                            Progreso del paso: {Math.round(stepProgress[currentStepData.id] || 0)}%
                          </span>
                          {currentStep < steps.length - 1 ? (
                            <Button onClick={handleNextStep} variant="primary">
                              Siguiente →
                            </Button>
                          ) : (
                            <Button onClick={handleCompleteLesson} variant="success" size="lg">
                              Completar Lección
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                {showScenario && (
                  <div className="lg:w-1/3 flex-shrink-0 hidden lg:block animate-slide-in-right">
                    <Card variant="gradient" padding="lg" className="h-full sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 bg-gradient-to-br ${currentScenario.bg}`}>
                        {currentScenario.icon}
                      </div>
                      
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                        Escenario: {currentScenario.name}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-6">{currentScenario.desc}</p>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-white/50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
                          <h4 className="font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                            <span className="text-lg">🎯</span>
                            Misión del día
                          </h4>
                          <p className="text-zinc-700 dark:text-zinc-300 text-sm mb-4">
                            Ayuda a María a calcular el mejor precio para sus frutas en el mercado. 
                            Tiene 3 tipos de manzanas con diferentes precios por kilo y quiere 
                            ofrecer un descuento por volumen.
                          </p>
                          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-3 text-white text-sm text-center">
                            Problema: 3x² - 12x + 9 = 0
                          </div>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
                          <h4 className="font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                            <span className="text-lg">📊</span>
                            Tu progreso en el escenario
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-zinc-600 dark:text-zinc-400">Análisis del problema</span>
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">100%</span>
                              </div>
                              <ProgressBar value={100} max={100} size="xs" variant="success" />
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-zinc-600 dark:text-zinc-400">Modelado matemático</span>
                                <span className="font-semibold text-indigo-600 dark:text-indigo-400">60%</span>
                              </div>
                              <ProgressBar value={60} max={100} size="xs" variant="default" />
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-zinc-600 dark:text-zinc-400">Resolución</span>
                                <span className="font-semibold text-zinc-600 dark:text-zinc-400">0%</span>
                              </div>
                              <ProgressBar value={0} max={100} size="xs" variant="default" />
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-zinc-600 dark:text-zinc-400">Interpretación resultados</span>
                                <span className="font-semibold text-zinc-600 dark:text-zinc-400">0%</span>
                              </div>
                              <ProgressBar value={0} max={100} size="xs" variant="default" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
                          <h4 className="font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                            <span className="text-lg">💡</span>
                            Pista contextual
                          </h4>
                          <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                            En el mercado, los precios suelen redondearse. Si el discriminante 
                            da un número perfecto (como 9, 16, 25), las soluciones serán números enteros 
                            o fracciones simples, ¡ideal para precios reales!
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {scenarios.map((scenario) => (
                            <button
                              key={scenario.id}
                              className={`p-3 rounded-xl text-center text-sm font-medium transition-all ${
                                scenario.id === currentScenario.id
                                  ? "bg-white dark:bg-zinc-900 shadow-lg ring-2 ring-indigo-500"
                                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                              }`}
                            >
                              <div className="text-xl mb-1">{scenario.icon}</div>
                              <div>{scenario.name}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}