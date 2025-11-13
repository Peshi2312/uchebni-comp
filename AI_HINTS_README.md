# SoftQuiz - AI-Powered Hints Setup Guide

## Overview
SoftQuiz now includes **AI-powered hints** using OpenAI's GPT API. When students click the "💡 Подсказка" (Hint) button on quiz questions, hints are generated dynamically by the AI instead of using static text.

---

## Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

---

## Setup Instructions

### 1. Install Dependencies
Navigate to the project root directory and run:
```bash
npm install
```

This installs:
- `express` — web server
- `openai` — OpenAI API client
- `cors` — cross-origin requests
- `dotenv` — environment variables
- `nodemon` — auto-reload (dev only)

### 2. Configure OpenAI API Key
Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=sk_your_actual_api_key_here
PORT=3000
```

⚠️ **Important:** Never commit `.env` to version control. It's listed in `.gitignore`.

### 3. Start the Backend Server
Run the Node.js server:

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:3000
✅ Make sure OPENAI_API_KEY is set in .env file
```

### 4. Open the Quiz
1. Open `project.html` in your browser (or use a live server)
2. Navigate to a quiz (e.g., Physics, Math, Biology)
3. Click the **"💡 Подсказка"** button on any question
4. The server will call OpenAI and display an AI-generated hint within 2-3 seconds

---

## How It Works

### Frontend Flow
1. User clicks **"💡 Подсказка"** button
2. JavaScript sends the question text to the backend via POST request
3. "Генериране на хинт..." (Generating hint...) message appears
4. Once the AI responds, the hint is displayed

### Backend Flow
1. `server.js` receives the question
2. Calls OpenAI GPT-3.5-turbo with a system prompt to generate a helpful hint
3. Returns the hint as JSON
4. If there's an error, the fallback is the original hardcoded hint (if available)

---

## Troubleshooting

### Server won't start
- **Error:** `OPENAI_API_KEY is not configured`
  - **Solution:** Make sure `.env` file exists and `OPENAI_API_KEY` is set
- **Error:** `Port 3000 is already in use`
  - **Solution:** Change `PORT` in `.env` or stop other processes using port 3000

### Hints aren't loading
- **Check browser console** (F12) for errors
- **Ensure backend is running** — verify terminal shows "Server running on http://localhost:3000"
- **Test the endpoint**: Open `http://localhost:3000/health` in browser (should return `{"status":"Server is running"}`)
- **OpenAI API rate limit** — You may have exceeded free tier limits. Check [OpenAI usage dashboard](https://platform.openai.com/usage/overview)

### CORS errors
- Error: `Access to XMLHttpRequest blocked by CORS`
- **Solution:** Ensure `server.js` is running and has `cors` middleware enabled

---

## Costs
OpenAI GPT-3.5-turbo is very affordable:
- ~$0.0005 per hint request (typical)
- 1,000 hints ≈ $0.50 USD
- Monitor usage at [OpenAI Dashboard](https://platform.openai.com/usage)

---

## Future Enhancements
- [ ] Cache hints locally to reduce API calls
- [ ] Support for multiple AI providers (Claude, Cohere, etc.)
- [ ] Admin panel to review/edit AI hints before showing
- [ ] Rate limiting per student
- [ ] Analytics on most common questions

---

## Files Changed
- `server.js` — Backend server for AI hints
- `package.json` — Node.js dependencies
- `.env.example` — Template for environment variables
- `quizzes/physics.html` — Updated to use AI hints
- `quizzes/math.html` — Updated to use AI hints
- `quizzes/biology.html` — Updated to use AI hints
- `quizzes/chemistry.html` — Updated to use AI hints
- `quizzes/geography.html` — Updated to use AI hints
- `quizzes/bulgarian.html` — Updated to use AI hints

---

## Support
For issues with OpenAI API, visit: https://help.openai.com/
For project issues, check the GitHub repo or contact the team.
