import React from 'react';
import { TargetPlatform, PlatformConfig } from '../types';
import { Terminal, Zap, MessageSquare, Box } from 'lucide-react';

interface PlatformCardProps {
  config: PlatformConfig;
  isSelected: boolean;
  onClick: (id: TargetPlatform) => void;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ config, isSelected, onClick }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'zap': return <Zap className="w-6 h-6" />;
      case 'terminal': return <Terminal className="w-6 h-6" />;
      case 'message': return <MessageSquare className="w-6 h-6" />;
      case 'box': return <Box className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  return (
    <button
      onClick={() => onClick(config.id)}
      className={`
        relative group flex flex-col items-start p-5 rounded-xl transition-all duration-300 border
        ${isSelected 
          ? `bg-${config.color}-500/10 border-${config.color}-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]` 
          : 'bg-surface border-slate-700 hover:border-slate-500 hover:bg-slate-800'
        }
      `}
      style={{
        borderColor: isSelected ? config.color : undefined
      }}
    >
      <div 
        className={`p-3 rounded-lg mb-3 ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}
        style={{ backgroundColor: isSelected ? config.color : 'rgba(255,255,255,0.05)' }}
      >
        {getIcon(config.icon)}
      </div>
      
      <h3 className="text-lg font-bold text-slate-100 mb-1">{config.id}</h3>
      <p className="text-sm text-slate-400 text-left leading-relaxed">
        {config.description}
      </p>

      {isSelected && (
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-white animate-pulse" />
      )}
    </button>
  );
};

export default PlatformCard;