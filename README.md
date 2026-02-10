# Where in the World?

A clean country information browser built with Next.js. Search and filter countries by region, then dive into detailed information about each one.

## What's Included

- Browse all countries with key info: population, region, capital
- Search by country name
- Filter by region
- View detailed country pages with:
  - Native names and currencies
  - Languages spoken
  - Top-level domains
  - Border countries (clickable to navigate)
- Dark/light theme toggle with system preference detection
- Built with the [REST Countries API](https://restcountries.com)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **next-themes** - Dark mode
- **Heroicons** - Icons

## Styling

Uses a CSS variable-based theming system for light and dark modes. Colors are defined in `app/globals.css` and applied throughout the app. The theme preference is stored in localStorage and synced with system settings.

## Data

Country data comes from the [REST Countries API](https://restcountries.com/).
