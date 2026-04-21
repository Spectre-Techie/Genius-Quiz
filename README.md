# Genius Quiz

Genius Quiz is a modern quiz web app built with Next.js and Tailwind CSS. It focuses on fast question rounds, clear feedback, and measurable progress.

## Repository

GitHub: [Spectre-Techie/Genius-Quiz](https://github.com/Spectre-Techie/Genius-Quiz)

## Features

- Subject-based quizzes loaded from `public/data/questions.json`.
- 10-second timer for each question.
- +4 points for each correct answer.
- Visual answer feedback (correct, wrong, unattempted).
- Results dashboard with score, percentage, and time metrics.
- Retake quiz action from results page.
- Direct navigation back to homepage from results page.
- Responsive UI for desktop and mobile.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- react-icons
- react-confetti
- react-use
- @vercel/speed-insights

## Getting Started

### 1. Clone

```bash
git clone https://github.com/Spectre-Techie/Genius-Quiz.git
```

### 2. Enter the project folder

```bash
cd Genius-Quiz
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - start local development server.
- `npm run build` - create production build.
- `npm run start` - run production server.
- `npm run lint` - run lint checks.

## Predeployment Checks

Run these before deployment:

```bash
npm run lint
npm run build
```

Optional production smoke test:

```bash
npm run start -- -p 3001
```

Then test:

- `/`
- `/quiz/coding`
- `/favicon.ico`

## Project Structure

- `public/data/` - quiz question data.
- `public/images/` - static image assets.
- `src/app/` - routes, layout, global styles, favicon.
- `src/components/` - reusable UI components.
- `src/context/` - shared React context state.
- `src/config/` - app branding configuration.

## Development Note

This project uses separate Next.js artifact directories to avoid chunk/cache collisions:

- Development uses `.next-dev`
- Production build uses `.next`

## License

For personal and educational use.
