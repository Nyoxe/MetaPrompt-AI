import React, { useState } from 'react';
import { TargetPlatform, GeneratedResult, PromptRequest } from './types';
import { PLATFORMS } from './constants';
import PlatformCard from './components/PlatformCard';
import OutputDisplay from './components/OutputDisplay';
import { generateOptimizedPrompt } from './services/geminiService';
import { Wand2, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<TargetPlatform>(TargetPlatform.NANO_BANANA);
  const [userGoal, setUserGoal] = useState<string>('');
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Advanced options
  const [tone, setTone] = useState<PromptRequest['tone']>('Professional');

  const handleGenerate = async () => {
    if (!userGoal.trim()) {
      setError("Por favor, descreva o que você quer que o prompt faça.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const generated = await generateOptimizedPrompt({
        userGoal,
        targetPlatform: selectedPlatform,
        includeContext: true,
        tone: tone
      });
      setResult(generated);
    } catch (err: any) {
      setError(err.message || "Algo deu errado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-slate-200 selection:bg-indigo-500/30">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">MetaPrompt AI</h1>
              <p className="text-xs text-slate-400">Gerador de Engenharia de Prompt Direcionado</p>
            </div>
          </div>
          <div className="flex gap-2">
             <span className="px-2 py-1 rounded bg-emerald-900/30 border border-emerald-500/30 text-xs font-mono text-emerald-400">v1.1.0</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Step 1: Select Platform */}
            <section>
              <h2 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-4 flex items-center gap-2">
                <span className="bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                Selecione a IA Alvo
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {PLATFORMS.map((platform) => (
                  <PlatformCard
                    key={platform.id}
                    config={platform}
                    isSelected={selectedPlatform === platform.id}
                    onClick={setSelectedPlatform}
                  />
                ))}
              </div>
            </section>

            {/* Step 2: User Input */}
            <section>
              <h2 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-4 flex items-center gap-2">
                 <span className="bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                 Seu Objetivo
              </h2>
              
              <div className="bg-surface border border-slate-700 rounded-xl p-4 transition-all focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500">
                <textarea
                  value={userGoal}
                  onChange={(e) => {
                    setUserGoal(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="ex: Preciso de um componente React para um dashboard com mapa de calor, ou crie um script python para organizar arquivos..."
                  className="w-full bg-transparent border-none focus:outline-none text-slate-200 placeholder-slate-600 min-h-[120px] resize-none"
                />
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800">
                   <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Tom:</span>
                      <select 
                        value={tone}
                        onChange={(e) => setTone(e.target.value as any)}
                        className="bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Professional">Profissional</option>
                        <option value="Creative">Criativo</option>
                        <option value="Technical">Técnico</option>
                        <option value="Concise">Conciso</option>
                      </select>
                   </div>
                   <button
                    disabled={loading || !userGoal.trim()}
                    onClick={handleGenerate}
                    className={`
                      px-6 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2
                      ${loading || !userGoal.trim() 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95'
                      }
                    `}
                  >
                    {loading ? (
                      <>Processando...</>
                    ) : (
                      <>
                        Gerar Prompt <Wand2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3 text-red-400 text-sm animate-fade-in">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}
            </section>

          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7">
             <div className="sticky top-24">
               <h2 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-4 flex items-center gap-2">
                <span className="bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                Resultado
              </h2>
               <OutputDisplay result={result} isLoading={loading} />
             </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;