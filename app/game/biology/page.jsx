"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";

const biologyGameData = {
  subjectId: "biology",
  subjectName: "Biología",
  icon: "🧬",
  color: "from-pink-500 to-rose-500",
  levels: [
    {
      id: 1,
      name: "Célula y Bioquímica",
      description: "Organelas, membrana, metabolismo, ADN/ARN",
      lessons: [
        { id: 1, title: "La célula: unidad de la vida", type: "quiz", xp: 50, coins: 10, completed: false },
        { id: 2, title: "Orgánulos celulares", type: "drag-drop", xp: 50, coins: 10, completed: false },
        { id: 3, title: "Membrana plasmática", type: "quiz", xp: 50, coins: 10, completed: false },
        { id: 4, title: "Metabolismo celular", type: "simulation", xp: 50, coins: 10, completed: false },
        { id: 5, title: "ADN y ARN", type: "quiz", xp: 50, coins: 10, completed: false },
        { id: 6, title: "Síntesis de proteínas", type: "drag-drop", xp: 50, coins: 10, completed: false },
        { id: 7, title: "Respiración celular", type: "simulation", xp: 50, coins: 10, completed: false },
        { id: 8, title: "Fotosíntesis", type: "quiz", xp: 50, coins: 10, completed: false },
        { id: 9, title: "División celular", type: "drag-drop", xp: 50, coins: 10, completed: false },
      ],
      boss: { id: "boss1", title: "Examen: Célula y Bioquímica", type: "exam", xp: 200, coins: 50, questions: 10 },
    },
    {
      id: 2,
      name: "Genética y Herencia",
      description: "Mendel, cromosomas, mutaciones, ingeniería genética",
      lessons: [
        { id: 10, title: "Leyes de Mendel", type: "quiz", xp: 60, coins: 15, completed: false },
        { id: 11, title: "Cromosomas y cariotipo", type: "drag-drop", xp: 60, coins: 15, completed: false },
        { id: 12, title: "Herencia ligada al sexo", type: "quiz", xp: 60, coins: 15, completed: false },
        { id: 13, title: "Mutaciones genéticas", type: "simulation", xp: 60, coins: 15, completed: false },
        { id: 14, title: "Ingeniería genética", type: "quiz", xp: 60, coins: 15, completed: false },
        { id: 15, title: "Terapia génica", type: "drag-drop", xp: 60, coins: 15, completed: false },
        { id: 16, title: "PCR y secuenciación", type: "simulation", xp: 60, coins: 15, completed: false },
        { id: 17, title: "Ética en genética", type: "quiz", xp: 60, coins: 15, completed: false },
      ],
      boss: { id: "boss2", title: "Examen: Genética y Herencia", type: "exam", xp: 250, coins: 60, questions: 10 },
    },
  ],
};

const quizQuestions = {
  1: [
    { q: "¿Cuál es la unidad básica de la vida?", options: ["El átomo", "La molécula", "La célula", "El tejido"], correct: 2 },
    { q: "¿Qué tipo de células no tienen núcleo definido?", options: ["Eucariotas", "Procariotas", "Animales", "Vegetales"], correct: 1 },
    { q: "¿Quién propuso la teoría celular?", options: ["Darwin", "Schleiden y Schwann", "Mendel", "Watson y Crick"], correct: 1 },
    { q: "¿Cuál es la función principal de la membrana plasmática?", options: ["Producir energía", "Controlar el paso de sustancias", "Almacenar ADN", "Sintetizar proteínas"], correct: 1 },
    { q: "¿Qué orgánulo se encarga de la respiración celular?", options: ["Ribosoma", "Mitocondria", "Cloroplasto", "Núcleo"], correct: 1 },
  ],
  3: [
    { q: "La membrana plasmática está formada principalmente por:", options: ["Proteínas y carbohidratos", "Lípidos y proteínas", "ADN y ARN", "Celulosa y pectina"], correct: 1 },
    { q: "El transporte pasivo NO requiere:", options: ["Energía (ATP)", "Gradiente de concentración", "Proteínas transportadoras", "Membrana semipermeable"], correct: 0 },
    { q: "¿Qué es la ósmosis?", options: ["Difusión de solutos", "Difusión de agua a través de membrana semipermeable", "Transporte activo de iones", "Endocitosis de líquidos"], correct: 1 },
    { q: "En una solución hipertónica, la célula:", options: ["Gana agua y se hincha", "Pierde agua y se encoge", "Mantiene su volumen", "Estalla"], correct: 1 },
    { q: "Las proteínas integrales de membrana:", options: ["Están solo en la superficie externa", "Atraviesan toda la bicapa lipídica", "Son solo receptores", "No tienen función de transporte"], correct: 1 },
  ],
  5: [
    { q: "El ADN se encuentra principalmente en:", options: ["Citoplasma", "Núcleo", "Ribosomas", "Mitocondrias"], correct: 1 },
    { q: "La diferencia principal entre ADN y ARN es:", options: ["El ADN tiene uracilo", "El ARN es bicatenario", "El ADN tiene desoxirribosa", "El ARN tiene timina"], correct: 2 },
    { q: "¿Qué tipo de ARN lleva la información genética del ADN al citoplasma?", options: ["ARNt", "ARNr", "ARNm", "ARNi"], correct: 2 },
    { q: "Las bases nitrogenadas del ADN son:", options: ["A, U, C, G", "A, T, C, G", "A, T, U, G", "A, C, G, U"], correct: 1 },
    { q: "La replicación del ADN es:", options: ["Conservativa", "Semiconservativa", "Dispersiva", "Aleatoria"], correct: 1 },
  ],
  8: [
    { q: "La fotosíntesis ocurre en:", options: ["Mitocondrias", "Cloroplastos", "Ribosomas", "Núcleo"], correct: 1 },
    { q: "El pigmento verde que captura la luz es:", options: ["Hemoglobina", "Clorofila", "Caroteno", "Antocianina"], correct: 1 },
    { q: "Los productos de la fotosíntesis son:", options: ["CO2 y H2O", "Glucosa y O2", "ATP y NADPH", "Ácidos y bases"], correct: 1 },
    { q: "La fase oscura de la fotosíntesis:", options: ["Requiere luz directa", "Fija CO2 en el ciclo de Calvin", "Produce O2", "Ocurre en los tilacoides"], correct: 1 },
    { q: "¿Dónde ocurre el ciclo de Calvin?", options: ["Espacio tilacoidal", "Estroma del cloroplasto", "Membrana externa", "Citoplasma"], correct: 1 },
  ],
  9: [
    { q: "La mitosis produce:", options: ["4 células haploides", "2 células diploides idénticas", "4 células diploides", "2 células haploides"], correct: 1 },
    { q: "¿En qué fase se alinean los cromosomas en el ecuador?", options: ["Profase", "Metafase", "Anafase", "Telofase"], correct: 1 },
    { q: "El huso mitótico está formado por:", options: ["Microtúbulos", "Microfilamentos", "Filamentos intermedios", "Cromatina"], correct: 0 },
    { q: "La citocinesis en células vegetales:", options: ["Forma surco de cleavage", "Forma placa celular", "No ocurre", "Es igual que en animales"], correct: 1 },
    { q: "¿Qué fase precede a la mitosis?", options: ["Fase G1", "Fase S", "Fase G2", "Interfase"], correct: 2 },
  ],
  10: [
    { q: "La primera ley de Mendel es la ley de:", options: ["Dominancia", "Segregación", "Distribución independiente", "Herencia ligada"], correct: 1 },
    { q: "Un individuo heterocigoto tiene:", options: ["Dos alelos iguales", "Dos alelos diferentes", "Un solo alelo", "Tres alelos"], correct: 1 },
    { q: "En un cruce Aa x Aa, la proporción fenotípica es:", options: ["1:1", "3:1", "1:2:1", "9:3:3:1"], correct: 1 },
    { q: "La segunda ley de Mendel se cumple cuando:", options: ["Los genes están en el mismo cromosoma", "Los genes están en cromosomas diferentes", "Hay dominancia completa", "Hay codominancia"], correct: 1 },
    { q: "El genotipo de un individuo con rasgo recesivo es:", options: ["AA", "Aa", "aa", "AA o Aa"], correct: 2 },
  ],
  13: [
    { q: "Una mutación puntual afecta:", options: ["Un cromosoma completo", "Un solo nucleótido", "Varios genes", "El cariotipo completo"], correct: 1 },
    { q: "La mutación por deleción:", options: ["Añade nucleótidos", "Elimina nucleótidos", "Cambia un nucleótido", "Duplica un gen"], correct: 1 },
    { q: "Los mutágenos son:", options: ["Agentes que reparan ADN", "Agentes que causan mutaciones", "Enzimas de replicación", "Proteínas reguladoras"], correct: 1 },
    { q: "Una mutación silenciosa:", options: ["Cambia el aminoácido", "No cambia el aminoácido", "Detiene la traducción", "Elimina un exón"], correct: 1 },
    { q: "El código genético es degenerado, esto significa:", options: ["Hay más codones que aminoácidos", "Cada codón codifica un aminoácido único", "No hay codones de terminación", "El ADN no muta"], correct: 0 },
  ],
};

const dragDropData = {
  2: {
    title: "Arrastra cada orgánulo a su función",
    items: [
      { id: "mito", name: "Mitocondria", target: "Respiración celular / ATP" },
      { id: "ribo", name: "Ribosoma", target: "Síntesis de proteínas" },
      { id: "nucleo", name: "Núcleo", target: "Almacena ADN / Control celular" },
      { id: "golgi", name: "Aparato de Golgi", target: "Modifica y empaqueta proteínas" },
      { id: "lisos", name: "Lisosoma", target: "Digestión intracelular" },
      { id: "retic", name: "Retículo endoplásmico", target: "Transporte y síntesis de lípidos" },
    ],
  },
  6: {
    title: "Ordena los pasos de la síntesis de proteínas",
    items: [
      { id: "1", name: "1. Transcripción (ADN → ARNm)", target: "Paso 1" },
      { id: "2", name: "2. Procesamiento del ARNm", target: "Paso 2" },
      { id: "3", name: "3. Traducción (ARNm → Proteína)", target: "Paso 3" },
      { id: "4", name: "4. Plegamiento de la proteína", target: "Paso 4" },
    ],
  },
  9: {
    title: "Ordena las fases de la mitosis",
    items: [
      { id: "1", name: "1. Profase", target: "Paso 1" },
      { id: "2", name: "2. Metafase", target: "Paso 2" },
      { id: "3", name: "3. Anafase", target: "Paso 3" },
      { id: "4", name: "4. Telofase", target: "Paso 4" },
    ],
  },
  11: {
    title: "Asocia cada término genético",
    items: [
      { id: "geno", name: "Genotipo", target: "Constitución genética (ej. Aa)" },
      { id: "feno", name: "Fenotipo", target: "Expresión observable (ej. ojos marrones)" },
      { id: "alel", name: "Alelo", target: "Versión de un gen" },
      { id: "locus", name: "Locus", target: "Posición del gen en cromosoma" },
      { id: "homoz", name: "Homocigoto", target: "Dos alelos iguales (AA/aa)" },
      { id: "heteroz", name: "Heterocigoto", target: "Dos alelos diferentes (Aa)" },
    ],
  },
  15: {
    title: "Asocia técnica con aplicación",
    items: [
      { id: "pcr", name: "PCR", target: "Amplificar ADN" },
      { id: "seq", name: "Secuenciación", target: "Leer orden de bases" },
      { id: "crispr", name: "CRISPR-Cas9", target: "Editar genes" },
      { id: "electro", name: "Electroforesis", target: "Separar ADN por tamaño" },
    ],
  },
};

export default function BiologyGamePage() {
  const { user, completeLesson, loading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonState, setLessonState] = useState({
    step: 0,
    answers: {},
    score: 0,
    showResult: false,
    dragItems: [],
    dropZones: {},
  });

  const subject = user?.subjects?.biology || { level: 1, progress: 0, completedLessons: [], exp: 0 };
  const gameLevel = biologyGameData.levels[selectedLevel];
  const completedCount = subject.completedLessons?.length || 0;
  const totalLessons = gameLevel.lessons.length + 1;

  useEffect(() => {
    if (gameLevel) {
      const dragData = dragDropData[gameLevel.lessons[0]?.id] || dragDropData[gameLevel.lessons[1]?.id];
      if (dragData) {
        setLessonState(prev => ({
          ...prev,
          dragItems: [...dragData.items].sort(() => Math.random() - 0.5),
          dropZones: Object.fromEntries(dragData.items.map(i => [i.target, null])),
        }));
      }
    }
  }, [gameLevel]);

  const startLesson = (lesson) => {
    setCurrentLesson(lesson);
    setLessonState({
      step: 0,
      answers: {},
      score: 0,
      showResult: false,
      dragItems: [],
      dropZones: {},
    });
    
    if (lesson.type === "drag-drop") {
      const dragData = dragDropData[lesson.id];
      if (dragData) {
        setLessonState(prev => ({
          ...prev,
          dragItems: [...dragData.items].sort(() => Math.random() - 0.5),
          dropZones: Object.fromEntries(dragData.items.map(i => [i.target, null])),
        }));
      }
    }
  };

  const handleAnswer = (questionIndex, answerIndex) => {
    setLessonState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionIndex]: answerIndex },
    }));
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("itemId", item.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, zoneTarget) => {
    const itemId = e.dataTransfer.getData("itemId");
    setLessonState(prev => ({
      ...prev,
      dropZones: { ...prev.dropZones, [zoneTarget]: itemId },
    }));
  };

  const checkDragDrop = () => {
    const dragData = dragDropData[currentLesson?.id];
    if (!dragData) return;
    
    let correct = 0;
    dragData.items.forEach(item => {
      if (lessonState.dropZones[item.target] === item.id) correct++;
    });
    const score = Math.round((correct / dragData.items.length) * 100);
    setLessonState(prev => ({ ...prev, score, showResult: true }));
  };

  const checkQuiz = () => {
    const questions = quizQuestions[currentLesson?.id] || [];
    let correct = 0;
    questions.forEach((q, i) => {
      if (lessonState.answers[i] === q.correct) correct++;
    });
    const score = Math.round((correct / questions.length) * 100);
    setLessonState(prev => ({ ...prev, score, showResult: true }));
  };

  const completeCurrentLesson = () => {
    if (currentLesson && lessonState.score >= 60) {
      completeLesson("biology", currentLesson.id, currentLesson.xp, currentLesson.coins);
      setLessonState(prev => ({ ...prev, showResult: false }));
      setCurrentLesson(null);
    }
  };

  const nextQuestion = () => {
    setLessonState(prev => ({ ...prev, step: prev.step + 1 }));
  };

  const prevQuestion = () => {
    setLessonState(prev => ({ ...prev, step: prev.step - 1 }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <Link href="/auth"><Button size="lg">Inicia sesión para jugar</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navbar />
      <div className="flex">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className={`flex-1 pt-16 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-72"}`}>
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
              <Link href="/learn" className="text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm flex items-center gap-1 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Materias
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-2xl">{biologyGameData.icon}</div>
                <div>
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{biologyGameData.subjectName}</h1>
                  <p className="text-zinc-600 dark:text-zinc-400">Nivel {subject.level} • {completedCount}/{totalLessons} lecciones</p>
                </div>
              </div>
            </div>

            {currentLesson ? (
              <div className="animate-slide-up">
                <Card variant="elevated" padding="lg" className="max-w-3xl mx-auto">
                  <div className="mb-6">
                    <Badge variant="primary" size="sm" className="mb-2">{currentLesson.type === "quiz" ? "Quiz" : currentLesson.type === "drag-drop" ? "Arrastrar y soltar" : "Simulación"}</Badge>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{currentLesson.title}</h2>
                    <div className="flex items-center gap-4 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <span>⭐ +{currentLesson.xp} EXP</span>
                      <span>💰 +{currentLesson.coins}</span>
                    </div>
                  </div>

                  {currentLesson.type === "quiz" && (
                    <>
                      {lessonState.showResult ? (
                        <div className="text-center">
                          <div className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">{lessonState.score}%</div>
                          {lessonState.score >= 60 ? (
                            <div className="text-green-600 dark:text-green-400 mb-4">¡Lección completada!</div>
                          ) : (
                            <div className="text-red-600 dark:text-red-400 mb-4">Necesitas 60% para aprobar. ¡Inténtalo de nuevo!</div>
                          )}
                          <Button onClick={lessonState.score >= 60 ? completeCurrentLesson : () => setLessonState({...lessonState, showResult: false, step: 0, answers: {}})} variant={lessonState.score >= 60 ? "success" : "outline"} className="w-full">
                            {lessonState.score >= 60 ? "Guardar progreso" : "Reintentar"}
                          </Button>
                        </div>
                      ) : (
                        <>
                          {quizQuestions[currentLesson.id]?.map((q, i) => (
                            <div key={i} className={`mb-6 ${lessonState.step === i ? "block" : "hidden"}`}>
                              <div className="flex justify-between text-sm mb-3">
                                <span>Pregunta {i + 1} de {quizQuestions[currentLesson.id].length}</span>
                                <span className="font-semibold">{lessonState.answers[i] !== undefined ? "Respondida" : "Pendiente"}</span>
                              </div>
                              <ProgressBar value={lessonState.step + 1} max={quizQuestions[currentLesson.id].length} size="md" />
                              <p className="text-lg font-medium text-zinc-900 dark:text-white mb-4">{q.q}</p>
                              <div className="space-y-2">
                                {q.options.map((opt, oi) => (
                                  <button
                                    key={oi}
                                    onClick={() => handleAnswer(i, oi)}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                                      lessonState.answers[i] === oi
                                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                                        : "border-zinc-200 dark:border-zinc-700 hover:border-indigo-300"
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                          <div className="flex justify-between">
                            <Button variant="outline" onClick={prevQuestion} disabled={lessonState.step === 0}>← Anterior</Button>
                            <Button onClick={lessonState.step === quizQuestions[currentLesson.id].length - 1 ? checkQuiz : nextQuestion} disabled={lessonState.answers[lessonState.step] === undefined}>
                              {lessonState.step === quizQuestions[currentLesson.id].length - 1 ? "Finalizar" : "Siguiente →"}
                            </Button>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {currentLesson.type === "drag-drop" && (
                    <>
                      {lessonState.showResult ? (
                        <div className="text-center">
                          <div className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">{lessonState.score}%</div>
                          {lessonState.score >= 60 ? (
                            <div className="text-green-600 dark:text-green-400 mb-4">¡Completado correctamente!</div>
                          ) : (
                            <div className="text-red-600 dark:text-red-400 mb-4">Necesitas 60% para aprobar.</div>
                          )}
                          <Button onClick={lessonState.score >= 60 ? completeCurrentLesson : () => setLessonState({...lessonState, showResult: false, dropZones: Object.fromEntries(Object.keys(lessonState.dropZones).map(k => [k, null]))})} variant={lessonState.score >= 60 ? "success" : "outline"} className="w-full">
                            {lessonState.score >= 60 ? "Guardar progreso" : "Reintentar"}
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <p className="text-zinc-600 dark:text-zinc-400 mb-6">{dragDropData[currentLesson.id]?.title}</p>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                              <h4 className="font-semibold mb-4 text-center">Elementos</h4>
                              <div className="space-y-2 max-h-96 overflow-y-auto">
                                {lessonState.dragItems.map(item => (
                                  <div
                                    key={item.id}
                                    draggable
                                    onDragStart={e => handleDragStart(e, item)}
                                    className="p-4 bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl cursor-grab active:cursor-grabbing text-center font-medium"
                                  >
                                    {item.name}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-4 text-center">Zonas de destino</h4>
                              <div className="space-y-2 max-h-96 overflow-y-auto">
                                {Object.keys(lessonState.dropZones).map(zone => (
                                  <div
                                    key={zone}
                                    onDragOver={handleDragOver}
                                    onDrop={e => handleDrop(e, zone)}
                                    className={`p-4 rounded-xl border-2 dashed transition-all text-center ${
                                      lessonState.dropZones[zone]
                                        ? "bg-green-50 dark:bg-green-900/30 border-green-400"
                                        : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-300 dark:border-zinc-600"
                                    }`}
                                  >
                                    {lessonState.dropZones[zone] 
                                      ? lessonState.dragItems.find(d => d.id === lessonState.dropZones[zone])?.name
                                      : `Suelta aquí: ${zone}`}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Button onClick={checkDragDrop} className="w-full mt-4" disabled={Object.values(lessonState.dropZones).filter(Boolean).length !== lessonState.dragItems.length}>
                            Verificar
                          </Button>
                        </div>
                      )}
                    </>
                  )}

                  {currentLesson.type === "simulation" && (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🧪</div>
                      <h3 className="text-xl font-bold mb-2">Simulación interactiva</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-6">Explora el proceso paso a paso en el laboratorio virtual.</p>
                      <Button onClick={() => setLessonState(prev => ({...prev, showResult: true, score: 100}))} className="w-full sm:w-auto">Completar simulación</Button>
                    </div>
                  )}
                </Card>
              </div>
            ) : (
              <div className="animate-slide-up">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Button variant={selectedLevel === 0 ? "primary" : "outline"} onClick={() => { setSelectedLevel(0); setCurrentLesson(null); }} className="whitespace-nowrap">
                      Nivel 1: Célula y Bioquímica
                    </Button>
                    <Button variant={selectedLevel === 1 ? "primary" : "outline"} onClick={() => { setSelectedLevel(1); setCurrentLesson(null); }} className="whitespace-nowrap" disabled={subject.level < 2}>
                      Nivel 2: Genética y Herencia
                    </Button>
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    {selectedLevel === 0 
                      ? "Fundamentos de la biología celular y molecular" 
                      : "Leyes de la herencia y biología molecular"}
                  </div>
                </div>

                <div className="grid gap-4 max-w-3xl mx-auto">
                  {gameLevel.lessons.map((lesson, idx) => {
                    const isCompleted = subject.completedLessons?.includes(lesson.id);
                    const isLocked = idx > 0 && !subject.completedLessons?.includes(gameLevel.lessons[idx - 1]?.id);
                    return (
                      <Card
                        key={lesson.id}
                        variant={isCompleted ? "default" : isLocked ? "outlined" : "gradient"}
                        hover={!isLocked && !isCompleted}
                        className="relative"
                      >
                        <CardContent className="flex items-center gap-4 p-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${isCompleted ? "bg-emerald-500 text-white" : isLocked ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-400" : "bg-indigo-500 text-white"}`}>
                            {isCompleted ? "✓" : lesson.type === "quiz" ? "❓" : lesson.type === "drag-drop" ? "🎯" : "🧪"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-semibold ${isLocked ? "text-zinc-500 dark:text-zinc-400" : "text-zinc-900 dark:text-white"}`}>{lesson.title}</h4>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">{lesson.type === "quiz" ? "Preguntas de opción múltiple" : lesson.type === "drag-drop" ? "Actividad interactiva" : "Simulación"}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">+{lesson.xp} EXP</span>
                            <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">+{lesson.coins} 💰</span>
                            {isCompleted ? (
                              <Badge variant="success" size="sm">Completado</Badge>
                            ) : isLocked ? (
                              <Badge variant="locked" size="sm">Bloqueado</Badge>
                            ) : (
                              <Button size="sm" onClick={() => startLesson(lesson)}>Comenzar</Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}

                  <Card variant="premium" padding="lg" className="text-center">
                    <CardContent>
                      <div className="text-3xl mb-2">{gameLevel.boss.icon || "🏆"}</div>
                      <h4 className="font-bold text-lg mb-1">{gameLevel.boss.title}</h4>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-4">{gameLevel.boss.questions} preguntas • Desbloquea al completar todas las lecciones</p>
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-lg font-bold text-amber-600 dark:text-amber-400">+{gameLevel.boss.xp} EXP</span>
                        <span className="text-lg font-bold text-amber-700 dark:text-amber-300">+{gameLevel.boss.coins} 💰</span>
                      </div>
                      <Button variant="outline" disabled className="w-full sm:w-auto">Próximamente</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}