# MyCodeAnalyzerBot

**MyCodeAnalyzerBot** is a Telegram bot that analyzes code files. Users can upload their code, and the bot reviews the file using Hugging Face APIs to provide feedback on structure, readability, and best practices.

## Features

- Upload a code file to Telegram and receive a detailed analysis.
- Supports various file types like `.js`, `.ts`, `.py`, etc.
- Uses Hugging Face models for analysis and insights.
- Simple and intuitive interaction via Telegram.

## Technology Stack

- **Node.js** for the backend.
- **TypeScript** for type safety.
- **Telegram Bot API** for user interactions.
- **Hugging Face API** for AI-based code analysis.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Telegram Bot API Token](https://core.telegram.org/bots#botfather)
- [Hugging Face API Token](https://huggingface.co/join)

### Setup

1. Clone the repository:

   ```bash
   git clone  https://github.com/jamyMarkos/MyCodeAnalyzerBot
   cd MyCodeAnalyzerBot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your environment in a `.env` file:

   ```bash
   TELEGRAM_TOKEN=your-telegram-bot-token
   HUGGINGFACE_API_TOKEN=your-huggingface-api-token
   ```

4. Start the bot:

   ```bash
   npm run start
   ```

## File Processing

- Files uploaded to the bot are analyzed by Hugging Face and deleted after processing to avoid storage issues.

## License

This project is licensed under the MIT License.
