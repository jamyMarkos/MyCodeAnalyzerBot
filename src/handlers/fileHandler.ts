import TelegramBot from "node-telegram-bot-api";
import fs from "fs";
import axios from "axios";
import { analyzeFile } from "../services/huggingfaceService";
import path from "path";

export async function processFile(
  bot: TelegramBot,
  fileId: string
): Promise<string> {
  // Download the file from Telegram
  const fileUrl = await bot.getFileLink(fileId);
  const filePath = await downloadFile(fileUrl);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Send file content to Huggingface for analysis
  const analysisResult = await analyzeFile(fileContent);

  // Clean up : Delete the file after processing
  fs.unlinkSync(filePath);

  return analysisResult;
}

// Download the file from Telegram
async function downloadFile(fileUrl: string): Promise<string> {
  const filePath = `./downloads/${path.basename(fileUrl)}`;
  const writer = fs.createWriteStream(filePath);

  const response = await axios({
    url: fileUrl,
    method: "GET",
    responseType: "stream",
  });
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", () => resolve(filePath));
    writer.on("error", reject);
  });
}
