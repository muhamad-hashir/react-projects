# Tenzies Game

A fast-paced dice rolling game built with React.
Created during React learning journey on scrimba. 

## How to Play

1. Click **Roll** to generate random numbers for all unheld dice[cite: 2].
2. Click individual dice to freeze them at their current value[cite: 1, 2].
3. Keep rolling until all 10 dice show the same number[cite: 2].
4. Click **New Game** to reset and play again[cite: 2]!

## Features

* **Interactive Dice:** Hold and unhold dice across rolls[cite: 1, 2].
* **Win State:** Triggers confetti when all dice match[cite: 2].
* **Accessible:** Focus management and full screen-reader support[cite: 1, 2].

## Tech Stack

* React (`useState`, `useEffect`, `useRef`)[cite: 2]
* `nanoid`[cite: 2]
* `react-confetti`[cite: 2]

## Setup & Run

```bash
npm install
npm run dev