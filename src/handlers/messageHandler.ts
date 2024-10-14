import TelegramBot, { Message } from "node-telegram-bot-api";
import path from "path";
import { processFile } from "./fileHandler";
import { escapeMarkdown } from "../utils/utils";
import { sendLongMessage } from "../utils/messageUtils";

export async function handleIncomingMessage(bot: TelegramBot, msg: Message) {
  const chatId = msg.chat.id;

  if (msg.document) {
    const fileName = msg.document.file_name || "";
    const fileExtension = path.extname(fileName);

    // Only process .ts, .tsx, or .sql files
    if ([".ts", ".tsx", ".sql"].includes(fileExtension)) {
      const fileId = msg.document.file_id;
      try {
        const analysisResult = await processFile(bot, fileId);

        // Escape markdown before sending the message
        // const safeMessage = escapeMarkdown(analysisResult);

        await sendLongMessage(
          bot,
          chatId,
          `*Analysis Results:*\n\n${analysisResult}`
        );
      } catch (error) {
        bot.sendMessage(chatId, `Failed to process the file: ${error}`);
      }
    } else {
      bot.sendMessage(chatId, "Please upload a .ts, .tsx, or .sql file.");
    }
  }
}
