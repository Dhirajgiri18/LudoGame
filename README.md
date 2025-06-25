# Ludo Game (Next.js + Electron)

[Live Demo on Vercel](https://ludo-learn-play.vercel.app/)

A modern, interactive Ludo game built with Next.js, React, and TypeScript. Supports web deployment (Vercel) and desktop packaging (Electron).

## Features

- Multiplayer Ludo gameplay
- Math question challenges
- Sound effects and music
- Leaderboard and settings
- Responsive UI with Radix UI and Tailwind CSS
- Deployable to Vercel (SSR/Server Actions supported)
- Packaged as a Windows .exe with Electron

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install Dependencies

```sh
npm install
```

### Development (Web)

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production (Web)

```sh
npm run build
npm start
```

### Deploy to Vercel

1. Push your code to GitHub.
2. Import the repo at [https://vercel.com/](https://vercel.com/)
3. Vercel auto-detects Next.js. Click Deploy.

### Package as Windows .exe (Electron)

```sh
npm run package-win
```

The .exe will be in the `dist/` folder.

## Project Structure

- `src/app/` — Next.js app directory (pages, layouts, actions)
- `src/components/` — UI and game components
- `src/lib/` — Utility and helper functions
- `public/` — Static assets (images, sounds)
- `main.js` — Electron main process (if used)

## Scripts

- `dev` — Start Next.js in development mode
- `build` — Build Next.js for production
- `start` — Start Next.js production server
- `package-win` — Package as Windows .exe with Electron

## License

MIT

---

**Enjoy playing Ludo!**
