## Key Hightlights

- **AI Photo Analysis:** Upload a photo of your food prep or fridge ingredients to instantly receive 5 creative recipes.
- **Daily Usage Limit:** Managed via (*LocalStorage*) with daily limit and automatic date-based reset.
- **Interactive Cooking Experience:** Features step-by-step cooking checklists.
- **Unlimited Recipe Favorites:** Save as many favorite recipes as you like directly in your browser with zero limits.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **AI Model:** [Google Gemini API](https://ai.google.dev/) (`gemini-3.6-flash`)
- **Deployment:** [Vercel](https://vercel.com/)

## Requirements

- Node.js 
- NPM / Yarn / PNPM
- Google Gemini API Key

## How To Run This Project

1. Clone Repo
```bash
git clone [https://github.com/horengoding/recipe-finder.git]
```
2. Enter the project folder
```bash
cd recipe-finder
```
3. Install dependencies
```bash
npm install
```
4. Environment variable configuration
```bash
GEMINI_API_KEY=your_gemini_api_key
```
5. Run local server
```bash
npm run dev
```
6. Open http://localhost:3000 on browser.

