# Meme Generator

A React app that lets you create custom memes by editing top/bottom text over a random meme template, and download the result as an image.

Built as part of Scrimba's Full Stack Developer Path (React module).

## Features

- Fetches meme templates live from the [Imgflip API](https://imgflip.com/api)
- Editable top and bottom text with live preview
- Randomize the meme image with one click
- Download your finished meme as a PNG (using the Canvas API)

## Tech Stack

- React (useState, useEffect, useRef)
- Vite
- Vanilla CSS

## Getting Started

```bash
npm install
npm run dev
```

Then open the local server URL shown in your terminal.

## How it works

- Meme state (`topText`, `bottomText`, `imageUrl`) is managed with `useState`
- On mount, `useEffect` fetches the list of available meme templates from Imgflip
- Clicking "Get a new meme image" picks a random template from that list
- Clicking "Download meme" draws the current image and text onto a hidden `<canvas>`, then triggers a PNG download

## Credits

Meme images and templates provided by [Imgflip](https://imgflip.com/).