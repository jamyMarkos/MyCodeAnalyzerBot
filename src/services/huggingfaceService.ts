import axios from "axios";

const apiKey = process.env.HUGGINGFACE_API_KEY;
const modelUrl = process.env.HUGGINGFACE_MODEL_URL;

if (!apiKey || !modelUrl) {
  throw new Error(
    "Huggingface API key or model URL not found. Please set in .env file."
  );
}

export async function analyzeFile(fileContent: string): Promise<string> {
  try {
    const response = await axios.post(
      modelUrl as string,
      { inputs: fileContent },
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );

    const result = response.data;
    return result.length ? result[0].generated_text : "No analysis available";
  } catch (error) {
    console.error("Error during Huggingface API request:", error);
    throw new Error("Error analyzing the file.");
  }
}
