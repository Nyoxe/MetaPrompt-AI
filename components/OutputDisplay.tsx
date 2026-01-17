import React, { useState } from 'react';
import { GeneratedResult } from '../types';
import { Copy, Check, Sparkles } from 'lucide-react';

interface OutputDisplayProps {
  result: GeneratedResult | null;
  isLoading: boolean;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ result, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-surface border border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
          </div>
        </div>
        <p className="mt-6 text-slate-300 font-medium animate-pulse">Criando o prompt perfeito...</p>
        <p className="mt-2 text-slate-500 text-sm">Aplicando regras de otimização</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="w-full bg-surface/50 border border-slate-700/50 border-dashed rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px] text-slate-500">
        <Sparkles className="w-12 h-12 mb-4 opacity-20" />
        <p>Selecione uma plataforma e digite seu objetivo para gerar um prompt.</p>
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in-up">
      <div className="bg-surface border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900/50 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-200 font-medium text-sm">Prompt Otimizado</span>
          </div>
          <button
            onClick={handleCopy}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
              ${copied 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600'
              }
            `}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
        
        <div className="p-6">
          <textarea
            readOnly
            value={result.markdown}
            className="w-full h-[400px] bg-slate-950 text-slate-200 font-mono text-sm p-4 rounded-lg border border-slate-800 focus:outline-none resize-none leading-relaxed"
          />
        </div>

        <div className="bg-indigo-900/20 px-6 py-3 border-t border-indigo-500/20">
            <p className="text-indigo-200 text-xs flex items-center gap-2">
                <span className="bg-indigo-500/20 p-1 rounded">💡 Insight:</span> 
                {result.explanation}
            </p>
        </div>
      </div>
    </div>
  );
};

export default OutputDisplay;