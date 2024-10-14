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

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Send file content to Huggingface for analysis
    const analysisResult = await analyzeFile(fileContent);
    return analysisResult;
  } finally {
    // Clean up : Delete the file after processing
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

// Download the file from Telegram
async function downloadFile(fileUrl: string): Promise<string> {
  const downloadDir = path.join(__dirname, "../../downloads");

  //   Ensure the 'downloads' directory exists
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, {
      recursive: true,
    });
  }

  const filePath = path.join(downloadDir, path.basename(fileUrl));
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
