
import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

// Lazily initialize the AI instance on first use.
// This prevents the app from crashing on startup if the API key isn't set.
const getAiInstance = (): GoogleGenAI | null => {
  if (ai) {
    return ai;
  }
  
  if (process.env.API_KEY) {
    try {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        return ai;
    } catch (e) {
        console.error("Failed to initialize GoogleGenAI", e);
        return null;
    }
  }
  
  return null;
}

export const generateContent = async (prompt: string): Promise<string> => {
  const aiInstance = getAiInstance();
  if (!aiInstance) {
    const errorMessage = "API_KEY environment variable not set. Please configure it in your deployment settings.";
    console.error(errorMessage);
    return `An error occurred: ${errorMessage}`;
  }

  try {
    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    if (error instanceof Error) {
        return `An error occurred while generating content: ${error.message}`;
    }
    return "An unknown error occurred while generating content.";
  }
};
