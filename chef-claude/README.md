# 🍳 Chef Claude

A React app that suggests recipes based on ingredients you already have. Add your ingredients, hit a button, and get an AI-generated recipe tailored to what's in your kitchen.

Built while going through Scrimba's Full Stack Developer Path.

## How it works

1. Add ingredients one at a time using the input field
2. Once you've added a few, click "Get a recipe"
3. An AI model suggests a recipe using some (or all) of your ingredients — rendered as formatted markdown

## Tech Stack

- React (Vite)
- Hugging Face Inference Providers (`@huggingface/inference`)
- `react-markdown` for rendering the recipe output

## Note on the AI integration

This project originally used the Anthropic API (Claude), but since I didn't have a paid API key, I switched it over to Hugging Face's free inference API instead, using `meta-llama/Llama-3.1-8B-Instruct` through their provider router.

## Running it locally

```bash
npm install --legacy-peer-deps
```

npm run dev
```

⚠️ **Note:** This app calls the Hugging Face API directly from the browser, so your token would be visible if deployed publicly. It's fine for local development, but don't deploy this as-is without a backend to keep the token private.