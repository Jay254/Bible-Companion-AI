# Bible Companion AI

A modern, AI-powered Bible study companion built with React, TypeScript, and Vite.  
Search for Bible verses, ask for AI explanations, bookmark your favorite insights, and keep track of your recent studies—all in a beautiful, responsive interface.

![Bible Companion AI Icon](public/bible-ai-icon.svg)

---

## Features

- **Bible Verse Search:**  
  Quickly look up any verse by book, chapter, and verse. Recent searches are saved for easy access.

- **AI-Powered Explanations:**  
  Ask questions about any verse or passage. The AI (Llama 3 via Groq API) provides context-aware, conversational, and biblically accurate explanations.

- **Chat Experience:**  
  Enjoy a chat-like interface for follow-up questions. The AI remembers your conversation for deeper study.

- **Bookmarking:**  
  Save your favorite verses and AI explanations. View, copy, or remove bookmarks in a modern modal.

- **Copy to Clipboard:**  
  Instantly copy verses or explanations with a single click.

- **Recent Searches:**  
  See and revisit your last 10 Bible verse searches. Clear your history anytime.

- **Responsive, Accessible UI:**  
  Clean layout, modern navigation, and mobile-friendly design.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone https://github.com/yourusername/bible-companion-ai.git
cd bible-companion-ai
npm install
```

### Environment Variables

Create a `.env` file in the project root with your Groq API key:

```
VITE_GROQ_API_KEY=your_groq_api_key_here
```

You can get a Groq API key at [groq.com](https://console.groq.com/).

### Running the App

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
  components/
    Layout/         # App layout and navigation
    VerseDisplay/   # Verse display, copy, and bookmarking
  pages/
    Home/           # Welcome and feature overview
    Search/         # Bible verse search, recent searches, verse bookmarks
    Explain/        # AI chat, explanation bookmarks
  services/
    bibleApi.ts     # Bible verse API integration
    aiService.ts    # Groq API integration for AI explanations
  assets/           # Static assets (if any)
  index.css, App.css, etc.
public/
  bible-ai-icon.svg # Custom favicon
```

---

## Key Technologies

- **React 19** + **TypeScript**
- **Vite** (fast dev/build)
- **react-router-dom** (routing)
- **react-markdown** (rendering AI/verse markdown)
- **Groq API** (Llama 3 for AI explanations)
- **Bible API** (for verse lookup)
- **localStorage** (for bookmarks and recent searches)

---

## Customization

- **Colors:**  
  Primary color is `#3498db` for buttons, navbar, and highlights.

- **Favicon:**  
  Custom SVG icon in `public/bible-ai-icon.svg`.

- **Styling:**  
  All UI is styled with modern, accessible CSS.  
  You can further customize in the `*.css` files in each component/page.

---

## Contributing

1. Fork the repo and create your branch.
2. Run `npm run dev` and make your changes.
3. Add tests or update docs as needed.
4. Open a pull request!

---

## License

MIT

---

## Credits

- Bible API: [bible-api.com](https://bible-api.com/)
- AI: [Groq API](https://console.groq.com/)
- UI: [React](https://react.dev/), [Vite](https://vitejs.dev/)

---

**Enjoy your study with Bible Companion AI!**
