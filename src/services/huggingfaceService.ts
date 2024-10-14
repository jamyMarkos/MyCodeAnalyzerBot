import { HfInference } from "@huggingface/inference";

import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const apiKey = process.env.HUGGINGFACE_API_KEY;
const modelUrl = process.env.HUGGINGFACE_MODEL_URL;

if (!apiKey || !modelUrl) {
  throw new Error(
    "Huggingface API key or model URL not found. Please set in .env file."
  );
}

/**
 * Analyzes the given file content using the Hugging Face API.
 * The analysis focuses on code structure, clarity, and error handling.
 *
 * @param fileContent - The content of the file to analyze.
 * @returns A promise that resolves to the analysis result.
 */

export async function analyzeFile(fileContent: string) {
  const inference = new HfInference(`${apiKey}`);

  const prompt = `You are a code analysis assistant. 
    Please evaluate the following code based on its structure, clarity, and error handling:
    
    ${fileContent}
    
    Provide a review that assesses the code's organization, readability, and how it handles errors, 
    but do not suggest any code changes or improvements.`;

  let result = "";
  for await (const chunk of inference.chatCompletionStream({
    model: "meta-llama/Llama-3.2-1B-Instruct",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 500,
  })) {
    result += chunk.choices[0]?.delta?.content || "";
  }

  return result;
}
