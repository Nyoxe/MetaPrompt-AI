import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TargetPlatform, PromptRequest, GeneratedResult } from "../types";

// Initialize Gemini API
// Note: process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = () => {
  return `You are "MetaPrompt", an elite Prompt Engineer.
  YOUR GOAL: Transform the user's request into a HYPER-SPECIFIC, EXTREMELY DETAILED prompt optimized for the target AI.

  CRITICAL RULE: NEVER be vague.
  You must INFER and EXPAND details.
  - If the user asks for "a snake game", your generated prompt must specify: "Python with Pygame, 600x400 resolution, green snake, red apple, score display, game over screen, restart mechanic, and arrow key controls".
  - If the user asks for "a marketing email", specify: "AIDA framework, catchy subject line, professional yet urgent tone, clear CTA, under 200 words".
  - **CRITICAL FOR IMAGES**: If the user asks for an image, the result MUST BE the visual description itself, NOT an instruction to write a prompt.
    * BAD: "Write a prompt for an image of a cat..."
    * GOOD: "A fluffy maine coon cat, sitting on a velvet sofa, cinematic lighting, 8k resolution, highly detailed fur, bokeh background, photorealistic style."

  KNOWLEDGE BASE (Target Platforms):
  1. **Nano Banana** (Gemini Flash / Image Gen): 
     - Focus: Direct Visual Description (Images) or Efficiency (Text).
     - Optimization (IMAGES): Provide ONLY the visual attributes. Comma-separated tags or descriptive sentences. Include: Subject, Medium (Digital Art, Photo), Style (Cyberpunk, Oil Painting), Lighting (Volumetric, Soft), Colors, and Quality (4k, Masterpiece). NO conversational filler.
     - Optimization (TEXT): Explicit output format (JSON/Markdown), no chit-chat.
  
  2. **Antigravity IDE** (Agentic/Cursor/Windsurf): 
     - Focus: Coding standards and completeness.
     - Optimization: MUST include "Write the FULL file content, no placeholders like //rest of code". Specify file structure, imports, and strict typing.
  
  3. **ChatGPT** (O1/4o): 
     - Focus: Reasoning and depth.
     - Optimization: Ask for "Chain of Thought", step-by-step logic, and edge-case handling.
  
  4. **Google AI Studio** (Prototyping): 
     - Focus: Structure.
     - Optimization: Use "System Instructions" vs "User Prompt" separation in the text. Use delimiters (###) and Few-Shot examples if possible.
  
  5. **Lovable** (Full-Stack Web Generator):
     - Focus: Visual impact and Working Apps.
     - Optimization: Demand "Visually stunning UI" using "Tailwind CSS". Mention specific "React" hooks, "Supabase" for backend if needed, and "Lucide React" for icons. Ask for responsive design and smooth animations.

  OUTPUT FORMAT:
  Return a JSON object:
  - 'markdown': The detailed prompt text. **It MUST be in the same language as the User's Goal (mostly Portuguese).**
  - 'explanation': A brief 1-sentence tip **IN PORTUGUESE** explaining why this level of detail helps the chosen platform.
  `;
};

export const generateOptimizedPrompt = async (request: PromptRequest): Promise<GeneratedResult> => {
  // Using gemini-3-pro-preview for maximum reasoning capability to handle "hyper-specific" requests.
  const model = "gemini-3-pro-preview"; 

  const promptContent = `
    User Goal: "${request.userGoal}"
    Target Platform: ${request.targetPlatform}
    Desired Tone: ${request.tone}
    Include Context Helper: ${request.includeContext}

    Generate the optimized, hyper-specific prompt now.
  `;

  // Define schema for structured output
  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      markdown: {
        type: Type.STRING,
        description: "The highly optimized, extremely specific prompt text formatted in Markdown.",
      },
      explanation: {
        type: Type.STRING,
        description: "A short explanation of the optimization strategy in Portuguese.",
      },
    },
    required: ["markdown", "explanation"],
  };

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: promptContent,
      config: {
        systemInstruction: getSystemInstruction(),
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, // Balance between creativity (expansion) and structure
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No response received from Gemini.");
    }

    const result = JSON.parse(jsonText) as GeneratedResult;
    return result;

  } catch (error) {
    console.error("Error generating prompt:", error);
    throw new Error("Failed to generate prompt. Please try again.");
  }
};