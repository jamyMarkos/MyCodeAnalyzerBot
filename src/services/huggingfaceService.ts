import { HfInference } from "@huggingface/inference";

import dotenv from "dotenv";
import axios from "axios";

// Load environment variables
dotenv.config();

// Retrieve the Huggingface API key from .env
const apiKey: string | undefined = process.env.HUGGINGFACE_API_KEY;

if (!apiKey) {
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

export async function analyzeFile(fileContent: string): Promise<string> {
  try {
    // Create an instance of the Huggingface Inference API
    const inference = new HfInference(`${apiKey}`);

    // Prepare the prompt for the API
    const prompt = `You are a code analysis assistant. 
    Please evaluate the following code based on its structure, clarity, and error handling:
    
    ${fileContent}
    
    Provide a three-paragraph review that assesses the code's organization, readability, and how it handles errors, 
    but do not suggest any code changes or improvements. Note: return the result as markdown`;

    // Define the chat message request
    const messages = [{ role: "user", content: prompt }];

    // Initialize the result string
    let result = "";

    for await (const chunk of inference.chatCompletionStream({
      model: "meta-llama/Llama-3.2-3B-Instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    })) {
      result += chunk.choices[0]?.delta?.content || "";
    }

    // Return the analysis result
    return result;
  } catch (error) {
    console.error("Error during Huggingface API request:", error);
    throw new Error("Error analyzing the file content.");
  }
}
