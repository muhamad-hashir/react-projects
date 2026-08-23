# Assembly: Endgame 🚀

A modern, interactive Wordle-style word guessing game built with **React**, **Vite**, and **CSS**. In this game, your goal is to guess the secret programming-related word letter by letter within a limited number of attempts to keep the programming world safe from Assembly!

## Features 🎮

- **Interactive Gameplay**: Guess letters using an on-screen keyboard.
- **Language Elimination**: Each incorrect guess eliminates a programming language from the safety list, complete with dynamic farewell messages and a skull overlay (`💀`).
- **Win & Lose States**: 
  - Win by guessing the word correctly, triggering celebratory confetti (via `react-confetti`).
  - Lose if too many incorrect guesses are made, revealing the secret word and challenging you to "start learning Assembly".
- **Accessibility (a11y)**: Built-in `aria-live` regions and screen-reader support.

## Tech Stack 🛠️

- **React** (v18+)
- **Vite** (for fast development and bundling)
- **clsx** (for conditional CSS class management)
- **canvas-confetti / react-confetti** (for win celebrations)

## Getting Started ⚙️

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/muhamad-hashir/assembly-endgame.git
   ```

2. Navigate to the project directory:
   ```bash
   cd assembly-endgame
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the local development URL provided by Vite (usually `http://localhost:5173`).

## Project Structure 📁

- `src/App.jsx`: Main game logic and component structure.
- `src/languages.js`: Array of programming languages with custom styling properties.
- `src/utils.js`: Helper functions for picking random words and generating farewell quotes.
- `src/index.css`: Custom styling, layout, and animations.
- `src/index.jsx`: React root rendering entry point.