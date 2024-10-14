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

export async function analyzeFile(fileContent: string): Promise<string> {
  const prompt = `You are a code analysis assistant. 
    Please evaluate the following code based on its structure, clarity, and error handling:
    
    ${fileContent}
    
    Provide a review that assesses the code's organization, readability, and how it handles errors, 
    but do not suggest any code changes or improvements.`;

  try {
    const response = await axios.post(
      modelUrl as string,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the result contains data and return the analysis
    const result = response.data;

    if (result && result.length > 0 && result[0].generated_text) {
      return result[0].generated_text;
    } else {
      return "No analysis result found.";
    }
  } catch (error) {
    console.error("Error during Huggingface API request:", error);
    throw new Error("Error analyzing the file.");
  }
}
