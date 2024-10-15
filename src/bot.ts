import TelegramBot from "node-telegram-bot-api";
import { handleIncomingMessage } from "./handlers/messageHandler";
import dotenv from "dotenv";
import http from "http";

// Load environment variables
dotenv.config();

/* a sample route for health check
// Create a server object
*/
const server = http.createServer((req: any, res: any) => {
  // Set the response header with HTTP status and Content-Type
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Send a response message
  res.end("Hello, world! This is a simple Node.js server.\n");
});

// Define the port to listen on
const port = 3000;

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

// Message handler
bot.on("message", (msg: any) => handleIncomingMessage(bot, msg));

// Error handle for polling
bot.on("polling_error", (error: any) => {
  console.error(`Polling error: ${error.message}`);
});
