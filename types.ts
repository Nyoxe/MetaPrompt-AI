export enum TargetPlatform {
  NANO_BANANA = 'Nano Banana',
  ANTIGRAVITY_IDE = 'Antigravity IDE',
  CHATGPT = 'ChatGPT',
  GOOGLE_AI_STUDIO = 'Google AI Studio',
  LOVABLE = 'Lovable'
}

export interface PromptRequest {
  userGoal: string;
  targetPlatform: TargetPlatform;
  includeContext: boolean;
  tone: 'Professional' | 'Creative' | 'Technical' | 'Concise';
}

export interface GeneratedResult {
  markdown: string;
  explanation: string;
}

export interface PlatformConfig {
  id: TargetPlatform;
  icon: string;
  description: string;
  color: string;
}