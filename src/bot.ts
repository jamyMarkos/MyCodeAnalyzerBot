import TelegramBot from "node-telegram-bot-api";
import { handleIncomingMessage } from "./handlers/messageHandler";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const botToken = process.env.TELEGRAM_BOT_TOKEN;

if (!botToken) {
  throw new Error(
    "Bot token not found. Please set TELEGRAM_BOT_TOKEN in .env file."
  );
}

// Initialize the bot
const bot = new TelegramBot(botToken, { polling: true });

// Message handler
bot.on("message", (msg: any) => handleIncomingMessage(bot, msg));

// Error handle for polling
bot.on("polling_error", (error: any) => {
  console.error(`Polling error: ${error.message}`);
});
