# Movie Search App

A responsive movie discovery and search dashboard built with React, React Router, plain CSS, and the TMDB API.

## Setup

1. **Get a free TMDB API key**
   - Create an account at [themoviedb.org](https://www.themoviedb.org/).
   - Go to **Settings > API** and generate an API key (v3 auth).

2. **Configure environment variables locally**
   - Create a `.env` file in the project root (copy `.env.example`):
     ```env
     VITE_TMDB_API_KEY=your_tmdb_api_key_here
     ```

3. **Install dependencies and start the dev server**
   ```bash
   npm install
   npm run dev
   ```

4. **Deploy to Vercel**
   - In your Vercel project settings, open **Environment Variables** and add `VITE_TMDB_API_KEY` with your TMDB API key.
   - `vercel.json` is included so client-side React Router paths resolve properly on refresh.
