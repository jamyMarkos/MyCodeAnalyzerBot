import TelegramBot from "node-telegram-bot-api";

// Function to send long messages in chunks
export async function sendLongMessage(
  bot: TelegramBot,
  chatId: number,
  message: string,
  options?: TelegramBot.SendMessageOptions
): Promise<void> {
  const maxLength = 4096; // Telegram's message limit
  for (let i = 0; i < message.length; i += maxLength) {
    const chunk = message.substring(i, i + maxLength);
    await bot.sendMessage(chatId, chunk, { parse_mode: "Markdown" });
  }
}
