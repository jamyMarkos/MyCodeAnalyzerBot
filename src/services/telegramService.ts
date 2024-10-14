import TelegramBot from "node-telegram-bot-api";

/**
 * Sends a message to a specific chat
 * @param bot - The Telegram bot instance
 * @param chatId - The chat ID where the message will be sent
 * @param message - The message text to send
 */
export function sendMessage(
  bot: TelegramBot,
  chatId: number,
  message: string
): void {
  bot.sendMessage(chatId, message).catch((error) => {
    console.error(`Error sending message: ${error.message}`);
  });
}

/**
 * Sends a document (file) to a specific chat
 * @param bot - The Telegram bot instance
 * @param chatId - The chat ID where the file will be sent
 * @param filePath - The path of the file to send
 */
export function sendDocument(
  bot: TelegramBot,
  chatId: number,
  filePath: string
): void {
  bot.sendDocument(chatId, filePath).catch((error) => {
    console.error(`Error sending document: ${error.message}`);
  });
}

/**
 * Downloads a file from Telegram and returns its URL
 * @param bot - The Telegram bot instance
 * @param token - The bot token, which you need to pass explicitly
 * @param fileId - The Telegram file ID
 * @returns Promise<string> - Resolves to the URL of the file to be downloaded
 */
export async function getFileLink(
  bot: TelegramBot,
  token: string,
  fileId: string
): Promise<string> {
  try {
    const file = await bot.getFile(fileId);
    return `https://api.telegram.org/file/bot${token}/${file.file_path}`;
  } catch (error) {
    console.error(`Error fetching file link: ${error}`);
    throw new Error("Failed to retrieve file link");
  }
}

/**
 * Handles polling errors for the bot and logs them
 * @param bot - The Telegram bot instance
 */
export function handlePollingErrors(bot: TelegramBot): void {
  bot.on("polling_error", (error) => {
    console.error(`Polling error: ${error.message}`);
  });
}
