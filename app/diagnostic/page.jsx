"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const user = {
  name: "Juan Delgado",
  level: 12,
  exp: 12450,
  coins: 1250,
};

const subjects = [
  { id: "math", name: "Matemáticas", icon: "🔢", color: "from-blue-500 to-cyan-500" },
  { id: "english", name: "Inglés", icon: "🇬🇧", color: "from-green-500 to-emerald-500" },
  { id: "biology", name: "Biología", icon: "🧬", color: "from-pink-500 to-rose-500" },
  { id: "social", name: "Ciencias Sociales", icon: "🌍", color: "from-amber-500 to-orange-500" },
];

const levels = [
  { num: 1, name: "Fundamentos", desc: "Nivel principiante" },
  { num: 2, name: "Básico", desc: "Conocimientos elementales" },
  { num: 3, name: "Intermedio", desc: "Aplicación de conceptos" },
  { num: 4, name: "Avanzado", desc: "Análisis y síntesis" },
  { num: 5, name: "Experto", desc: "Maestría completa" },
];

const questions = {
  math: [
    {
      question: "¿Cuál es el valor de x en la ecuación 2x + 5 = 17?",
      options: ["x = 4", "x = 5", "x = 6", "x = 7"],
      correct: 1,
      explanation: "2x + 5 = 17 → 2x = 12 → x = 6",
    },
    {
      question: "Si f(x) = 3x² - 2x + 1, ¿cuál es f(2)?",
      options: ["9", "7", "11", "5"],
      correct: 0,
      explanation: "f(2) = 3(4) - 2(2) + 1 = 12 - 4 + 1 = 9",
    },
    {
      question: "El área de un triángulo con base 10 cm y altura 6 cm es:",
      options: ["30 cm²", "60 cm²", "16 cm²", "26 cm²"],
      correct: 0,
      explanation: "Área = (base × altura) / 2 = (10 × 6) / 2 = 30 cm²",
    },
    {
      question: "¿Cuál de las siguientes es una ecuación cuadrática?",
      options: ["2x + 3 = 0", "x² - 5x + 6 = 0", "3x - 7 = 14", "x + 2 = 5"],
      correct: 1,
      explanation: "Una ecuación cuadrática tiene la forma ax² + bx + c = 0",
    },
    {
      question: "La derivada de f(x) = x³ + 2x² - x es:",
      options: ["3x² + 4x - 1", "3x² + 2x - 1", "x³ + 4x - 1", "3x² + 4x"],
      correct: 0,
      explanation: "f'(x) = 3x² + 4x - 1 (regla de la potencia)",
    },
    {
      question: "Si sen(θ) = 3/5 y θ está en el primer cuadrante, ¿cuál es cos(θ)?",
      options: ["4/5", "3/4", "5/4", "4/3"],
      correct: 0,
      explanation: "sen²θ + cos²θ = 1 → cos²θ = 1 - 9/25 = 16/25 → cosθ = 4/5",
    },
    {
      question: "Resuelve el sistema: x + y = 10, 2x - y = 5",
      options: ["x=3, y=7", "x=5, y=5", "x=4, y=6", "x=6, y=4"],
      correct: 1,
      explanation: "Sumando: 3x = 15 → x = 5. Sustituyendo: 5 + y = 10 → y = 5",
    },
    {
      question: "El límite de (x² - 4)/(x - 2) cuando x tiende a 2 es:",
      options: ["0", "2", "4", "No existe"],
      correct: 2,
      explanation: "(x²-4)/(x-2) = (x-2)(x+2)/(x-2) = x+2 → límite = 4",
    },
    {
      question: "¿Cuál es la integral de 3x² dx?",
      options: ["x³ + C", "6x + C", "x³ + 3x + C", "9x + C"],
      correct: 0,
      explanation: "∫3x² dx = 3·(x³/3) + C = x³ + C",
    },
    {
      question: "En una baraja de 52 cartas, ¿probabilidad de sacar un as?",
      options: ["1/13", "1/52", "4/13", "1/4"],
      correct: 0,
      explanation: "Hay 4 ases en 52 cartas: 4/52 = 1/13",
    },
    {
      question: "La matriz identidad de 3x3 tiene determinante:",
      options: ["0", "1", "3", "9"],
      correct: 1,
      explanation: "El determinante de la matriz identidad siempre es 1",
    },
  ],
  english: [
    {
      question: "Choose the correct form: 'She _____ to the gym every day.'",
      options: ["go", "goes", "going", "gone"],
      correct: 1,
      explanation: "Third person singular in present simple adds -s: She goes",
    },
    {
      question: "What is the past tense of 'buy'?",
      options: ["buyed", "bought", "buied", "buy"],
      correct: 1,
      explanation: "'Buy' is an irregular verb: buy → bought → bought",
    },
    {
      question: "Complete: 'If I _____ you, I would study harder.'",
      options: ["am", "was", "were", "be"],
      correct: 2,
      explanation: "Second conditional uses 'were' for all persons: If I were you...",
    },
    {
      question: "Which sentence is in Present Perfect?",
      options: ["I study English", "I studied English", "I have studied English", "I will study English"],
      correct: 2,
      explanation: "Present Perfect: have/has + past participle",
    },
    {
      question: "Choose the correct phrasal verb: 'Please _____ your shoes before entering.'",
      options: ["take off", "take on", "take up", "take in"],
      correct: 0,
      explanation: "'Take off' means to remove (clothes, shoes)",
    },
    {
      question: "What does 'break the ice' mean?",
      options: ["Romper hielo literalmente", "Iniciar conversación", "Hacer ejercicio", "Comer helado"],
      correct: 1,
      explanation: "'Break the ice' = iniciar una conversación en situación incómoda",
    },
    {
      question: "Complete: 'By the time you arrive, I _____ dinner.'",
      options: ["cook", "will cook", "will have cooked", "cooked"],
      correct: 2,
      explanation: "Future Perfect: will have + past participle para acción completada antes de un momento futuro",
    },
    {
      question: "Which is the correct reported speech for: 'I am tired,' she said.",
      options: ["She said she is tired", "She said she was tired", "She said she were tired", "She said I am tired"],
      correct: 1,
      explanation: "Present continuous → Past continuous en reported speech",
    },
    {
      question: "Choose the correct preposition: 'I'm good _____ math.'",
      options: ["in", "at", "on", "for"],
      correct: 1,
      explanation: "Good at + habilidad/asignatura",
    },
    {
      question: "What type of conditional: 'If it rains, I will stay home.'",
      options: ["Zero", "First", "Second", "Third"],
      correct: 1,
      explanation: "First conditional: If + present, will + infinitive (situación real futura)",
    },
  ],
  biology: [
    {
      question: "¿Cuál es la 'central energética' de la célula?",
      options: ["Núcleo", "Mitocondria", "Ribosoma", "Aparato de Golgi"],
      correct: 1,
      explanation: "Las mitocondrias producen ATP (energía) mediante la respiración celular",
    },
    {
      question: "¿Qué orgánulo es responsable de la fotosíntesis en células vegetales?",
      options: ["Mitocondria", "Cloroplasto", "Vacuola", "Pared celular"],
      correct: 1,
      explanation: "Los cloroplastos contienen clorofila y realizan la fotosíntesis",
    },
    {
      question: "La unidad básica de la herencia es:",
      options: ["El cromosoma", "El gen", "El ADN", "La proteína"],
      correct: 1,
      explanation: "Un gen es un segmento de ADN que codifica una proteína o ARN funcional",
    },
    {
      question: "En la mitosis, ¿cuántas células hijas se producen?",
      options: ["1", "2", "4", "8"],
      correct: 1,
      explanation: "La mitosis produce 2 células hijas genéticamente idénticas a la madre",
    },
    {
      question: "¿Qué tipo de ARN lleva los aminoácidos al ribosoma?",
      options: ["ARNm", "ARNt", "ARNr", "ARNi"],
      correct: 1,
      explanation: "El ARN de transferencia (ARNt) transporta aminoácidos durante la traducción",
    },
    {
      question: "La fotosíntesis ocurre en dos fases. La fase luminosa produce:",
      options: ["Glucosa y O₂", "ATP, NADPH y O₂", "CO₂ y H₂O", "Solo glucosa"],
      correct: 1,
      explanation: "Fase luminosa: luz + H₂O → ATP + NADPH + O₂",
    },
    {
      question: "¿Cuál es la base nitrogenada que NO está en el ADN?",
      options: ["Adenina", "Timina", "Uracilo", "Citosina"],
      correct: 2,
      explanation: "El Uracilo (U) está en el ARN, en el ADN está Timina (T)",
    },
    {
      question: "En la cadena alimentaria, los organismos que producen su propio alimento son:",
      options: ["Consumidores primarios", "Productores", "Descomponedores", "Consumidores secundarios"],
      correct: 1,
      explanation: "Productores (plantas, algas) realizan fotosíntesis y son la base trófica",
    },
    {
      question: "¿Qué proceso genera diversidad genética en la meiosis?",
      options: ["Replicación del ADN", "Entrecruzamiento (crossing over)", "Citocinesis", "Interfase"],
      correct: 1,
      explanation: "El crossing over en profase I intercambia material genético entre cromátidas homólogas",
    },
    {
      question: "La homeostasis es:",
      options: ["Muerte celular programada", "Mantenimiento del ambiente interno estable", "División celular", "Respuesta inmune"],
      correct: 1,
      explanation: "Homeostasis = regulación del entorno interno (temperatura, pH, glucosa, etc.)",
    },
  ],
  social: [
    {
      question: "¿En qué año cayó el Imperio Romano de Occidente?",
      options: ["410 d.C.", "476 d.C.", "395 d.C.", "500 d.C."],
      correct: 1,
      explanation: "Rómulo Augústulo fue depuesto en 476 d.C., fin del Imperio Romano de Occidente",
    },
    {
      question: "¿Qué tratado terminó la Primera Guerra Mundial?",
      "options": ["Tratado de Versalles", "Tratado de Viena", "Tratado de París", "Tratado de Tordesillas"],
      correct: 0,
      explanation: "El Tratado de Versalles (1919) terminó oficialmente la Primera Guerra Mundial",
    },
    {
      question: "El sistema económico donde los medios de producción son de propiedad privada:",
      options: ["Socialismo", "Capitalismo", "Feudalismo", "Comunismo"],
      correct: 1,
      explanation: "Capitalismo: propiedad privada de medios de producción y libre mercado",
    },
    {
      question: "¿Cuál es la capital de Australia?",
      options: ["Sídney", "Melbourne", "Canberra", "Brisbane"],
      correct: 2,
      explanation: "Canberra es la capital diseñada específicamente para ser la sede de gobierno",
    },
    {
      question: "La Revolución Francesa comenzó en:",
      options: ["1776", "1789", "1799", "1804"],
      correct: 1,
      explanation: "14 de julio de 1789: toma de la Bastilla, inicio de la Revolución Francesa",
    },
    {
      question: "¿Qué organización se creó tras la Segunda Guerra Mundial para mantener la paz?",
      options: ["Liga de las Naciones", "ONU", "OTAN", "UE"],
      correct: 1,
      explanation: "La Organización de las Naciones Unidas (ONU) se fundó en 1945",
    },
    {
      question: "En economía, la 'mano invisible' es un concepto de:",
      options: ["Karl Marx", "Adam Smith", "John Keynes", "Milton Friedman"],
      correct: 1,
      explanation: "Adam Smith (1776) en 'La riqueza de las naciones' describe el autorregulación del mercado",
    },
    {
      question: "¿Qué río es el más largo de Sudamérica?",
      options: ["Orinoco", "Paraná", "Amazonas", "Magdalena"],
      correct: 2,
      explanation: "El Amazonas tiene ~7.000 km, es el río más caudaloso y uno de los más largos",
    },
    {
      question: "La Guerra Fría fue principalmente entre:",
      options: ["EE.UU. y China", "EE.UU. y URSS", "URSS y China", "Europa y EE.UU."],
      correct: 1,
      explanation: "Conflicto ideológico y geopolítico entre EE.UU. (capitalismo) y URSS (comunismo) 1947-1991",
    },
    {
      question: "¿Qué documento garantiza los derechos humanos universales?",
      options: ["Carta Magna", "Declaración Universal de DD.HH.", "Constitución de EE.UU.", "Tratado de Roma"],
      correct: 1,
      explanation: "Adoptada por la ONU en 1948, establece 30 derechos fundamentales",
    },
  ],
};

export default function DiagnosticPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("math");
  const [selectedLevel, setSelectedLevel] = useState(3);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutos

  const subjectQuestions = questions[selectedSubject] || questions.math;
  const currentQ = subjectQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / subjectQuestions.length) * 100;

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIndex) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < subjectQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    subjectQuestions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    return { correct, total: subjectQuestions.length, percentage: Math.round((correct / subjectQuestions.length) * 100) };
  };

  const score = calculateScore();

  const selectedSubjectData = subjects.find(s => s.id === selectedSubject);
  const selectedLevelData = levels[selectedLevel - 1];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navbar user={user} />
      <div className="flex">
        <Sidebar user={user} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className={`flex-1 pt-16 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-72"}`}>
          <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            {!showResults ? (
              <>
                <div className="mb-6 animate-slide-up">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Link href="/learn" className="text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      Materias
                    </Link>
                    <span className="text-zinc-400">/</span>
                    <span className="font-medium text-zinc-900 dark:text-white">Examen Diagnóstico</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${selectedSubjectData.color}`}>
                      {selectedSubjectData.icon}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{selectedSubjectData.name}</h1>
                      <p className="text-zinc-600 dark:text-zinc-400">Nivel {selectedLevel}: {selectedLevelData.name} - {selectedLevelData.desc}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4 flex items-center justify-between animate-slide-up">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${timeLeft < 60 ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 animate-pulse" : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"}`}>
                      ⏱️
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Tiempo restante</p>
                      <p className="text-xl font-mono font-bold text-zinc-900 dark:text-white">{formatTime(timeLeft)}</p>
                    </div>
                  </div>
                  <ProgressBar value={currentQuestion + 1} max={subjectQuestions.length} size="md" variant="default" className="w-64" />
                </div>

                <Card variant="elevated" padding="lg" className="animate-slide-up">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        Pregunta {currentQuestion + 1} de {subjectQuestions.length}
                      </span>
                      <Badge variant="primary" size="sm">
                        {Math.round(progress)}% completado
                      </Badge>
                    </div>
                    <ProgressBar value={currentQuestion + 1} max={subjectQuestions.length} size="md" variant="default" />
                  </div>

                  <div className="mb-8">
                    <p className="text-lg sm:text-xl font-medium text-zinc-900 dark:text-white leading-relaxed mb-6">
                      {currentQ.question}
                    </p>
                    
                    <div className="space-y-3" role="radiogroup" aria-label="Opciones de respuesta">
                      {currentQ.options.map((option, index) => (
                        <label
                          key={index}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                            answers[currentQuestion] === index
                              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 ring-2 ring-indigo-500/20"
                              : "border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name="answer"
                            value={index}
                            checked={answers[currentQuestion] === index}
                            onChange={() => handleAnswer(index)}
                            className="w-5 h-5 text-indigo-600 border-zinc-300 focus:ring-indigo-500"
                            aria-label={`Opción ${index + 1}: ${option}`}
                          />
                          <span className="flex-1 text-zinc-900 dark:text-white font-medium">
                            {option}
                          </span>
                          <span className="text-xl font-bold">{index + 1}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-zinc-200 dark:border-zinc-700">
                    <Button variant="outline" onClick={handlePrev} disabled={currentQuestion === 0} size="md">
                      ← Anterior
                    </Button>
                    
                    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                      <span>Pregunta {currentQuestion + 1}</span>
                      <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                      <span>{subjectQuestions.length} total</span>
                    </div>

                    {currentQuestion === subjectQuestions.length - 1 ? (
                      <Button onClick={handleFinish} size="md" variant="success">
                        Finalizar Examen
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      </Button>
                    ) : (
                      <Button onClick={handleNext} size="md" variant="primary" disabled={answers[currentQuestion] === undefined}>
                        Siguiente →
                      </Button>
                    )}
                  </div>
                </Card>

                <div className="mt-6 flex justify-center gap-2 animate-slide-up" style={{ animationDelay: "200ms" }}>
                  {subjectQuestions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
                        index === currentQuestion
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                          : answers[index] !== undefined
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                      }`}
                      aria-label={`Ir a pregunta ${index + 1}`}
                      aria-current={index === currentQuestion ? "step" : undefined}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="animate-slide-up">
                <div className="text-center mb-8">
                  <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 bg-gradient-to-br ${score.percentage >= 70 ? "from-emerald-500 to-green-500" : score.percentage >= 40 ? "from-amber-500 to-orange-500" : "from-red-500 to-rose-500"}`}>
                    {score.percentage >= 70 ? "🎉" : score.percentage >= 40 ? "📚" : "💪"}
                  </div>
                  <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                    {score.percentage >= 70 ? "¡Excelente resultado!" : score.percentage >= 40 ? "¡Buen intento!" : "¡Sigue practicando!"}
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                    Has completado el examen diagnóstico de {selectedSubjectData.name} - Nivel {selectedLevel}
                  </p>
                </div>

                <Card variant="gradient" padding="xl" className="mb-6 text-center">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
                        {score.correct}
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-400">Correctas</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                        {score.percentage}%
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-400">Acierto</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                        +{score.correct * 50}
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-400">EXP Ganada</p>
                    </div>
                  </div>
                  
                  <ProgressBar value={score.percentage} max={100} size="xl" variant={score.percentage >= 70 ? "success" : score.percentage >= 40 ? "warning" : "danger"} showLabel />
                  
                  <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300">
                    {score.percentage >= 70 
                      ? "¡Nivel aprobado! Puedes avanzar al siguiente nivel." 
                      : score.percentage >= 40 
                        ? "Tienes una base, pero repasa los temas fallados antes de continuar." 
                        : "Te recomendamos repasar los fundamentos de este nivel antes de avanzar."}
                  </p>
                </Card>

                <Card variant="elevated" padding="lg">
                  <CardHeader title="Revisión de respuestas" />
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {subjectQuestions.map((q, index) => {
                        const userAnswer = answers[index];
                        const isCorrect = userAnswer === q.correct;
                        return (
                          <div key={index} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                            <div className="flex items-start gap-3 mb-3">
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${isCorrect ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"}`}>
                                {isCorrect ? "✓" : "✗"}
                              </span>
                              <div className="flex-1">
                                <p className="font-medium text-zinc-900 dark:text-white">P{index + 1}: {q.question}</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                  Tu respuesta: {userAnswer !== undefined ? q.options[userAnswer] : "No respondida"}
                                  {userAnswer !== undefined && !isCorrect && (
                                    <> | Correcta: {q.options[q.correct]}</>
                                  )}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg">
                              💡 {q.explanation}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/learn">
                    <Button size="lg" variant="primary" className="w-full sm:w-auto">
                      Volver a Materias
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" onClick={() => { setShowResults(false); setCurrentQuestion(0); setAnswers({}); }} className="w-full sm:w-auto">
                    Reintentar Examen
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}