import { PlatformConfig, TargetPlatform } from './types';

export const PLATFORMS: PlatformConfig[] = [
  {
    id: TargetPlatform.NANO_BANANA,
    icon: 'zap',
    description: 'Otimizado para velocidade e eficiência. Melhor para tarefas concisas de inferência rápida e prompts de geração de imagem.',
    color: '#eab308' // Yellow
  },
  {
    id: TargetPlatform.ANTIGRAVITY_IDE,
    icon: 'terminal',
    description: 'Feito para IDEs com Agentes. Enfatiza padrões de engenharia sênior, contexto completo de arquivos e sem espaços reservados.',
    color: '#a855f7' // Purple
  },
  {
    id: TargetPlatform.CHATGPT,
    icon: 'message',
    description: 'Profundidade conversacional. Focado em passos de raciocínio (Chain of Thought) e explicações detalhadas.',
    color: '#10a37f' // Emerald/Green
  },
  {
    id: TargetPlatform.GOOGLE_AI_STUDIO,
    icon: 'box',
    description: 'Entrada estruturada. Separa instruções de sistema dos prompts do usuário, ideal para prototipagem de API.',
    color: '#3b82f6' // Blue
  }
];