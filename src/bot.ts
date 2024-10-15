import TelegramBot from "node-telegram-bot-api";
import { handleIncomingMessage } from "./handlers/messageHandler";
import dotenv from "dotenv";
import http from "http";

// Load environment variables
dotenv.config();

/**
 * A sample route for health check
 * Create a server object
 */
const server = http.createServer((req: any, res: any) => {
  // Set the response header with HTTP status and Content-Type
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Send a response message
  res.end("Hello, world! This is a simple Node.js server.\n");
});

// Define the port to listen on
const port = process.env.PORT || 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const botToken = process.env.TELEGRAM_BOT_TOKEN;

if (!botToken) {
  throw new Error(
    "Bot token not found. Please set TELEGRAM_BOT_TOKEN in .env file."
  );
}

// Initialize the bot
const bot = new TelegramBot(botToken, { polling: true });

// Welcome message with inline buttons
bot.on("message", (msg: any) => {
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase();

  if (text === "/start") {
    // Send a welcome message
    bot.sendMessage(
      chatId,
      "Welcome to the bot! Bot reviews code snippets from files uploaded.",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Get Started", callback_data: "get_started" }],
            [{ text: "Learn More", url: "https://dummylink.com" }],
          ],
        },
      }
    );
  } else {
    handleIncomingMessage(bot, msg);
  }
});

// Listen for callback queries
bot.on("callback_query", (callbackQuery: any) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === "get_started") {
    bot.sendMessage(chatId, "Please upload your code files for analysis. 📥");
  }
});

// Error handle for polling
bot.on("polling_error", (error: any) => {
  console.error(`Polling error: ${error.message}`);
});
