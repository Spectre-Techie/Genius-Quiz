# QuizForge Arena

QuizForge Arena is a Next.js and Tailwind CSS quiz app with timed questions, live scoring, and a results dashboard.

## Live Demo

Run locally at [http://localhost:3000](http://localhost:3000) after starting the dev server.

## Features

### 1. Subject Selection

- Choose a subject from the home page.
- Questions are loaded from JSON in `public/data/questions.json`.

### 2. Timed Quiz

- Each question has a 10-second countdown.
- If time runs out, the question is marked as unattempted.

### 3. Answer Validation

- Correct options are highlighted.
- Incorrect selected options are marked for immediate feedback.

### 4. Scoring System

- Each correct answer gives 4 points.
- Current points are visible in the header.

### 5. Results Dashboard

- Final score and earned points.
- Correct, wrong, and unattempted counts.
- Percentage, total time spent, and average time per question.

### 6. Responsive UI

- Optimized for desktop and mobile screens.

## Technologies Used

- Next.js
- Tailwind CSS
- React Icons
- react-confetti
- react-use

## How to Run

### 1. Clone

```bash
git clone https://github.com/AmanKumarSinhaGitHub/Quiz-App-in-NextJS.git
```

### 2. Enter Project Folder

```bash
cd quiz-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `public/data/`: quiz data source.
- `public/images/`: static images.
- `src/app/`: App Router pages and layout.
- `src/components/`: UI components.
- `src/context/`: shared React context.

## Future Improvements

- Add authentication and user profiles.
- Add difficulty levels and adaptive quizzes.
- Move data to backend API/database.

## Contributions

Contributions are welcome via issues and pull requests.
