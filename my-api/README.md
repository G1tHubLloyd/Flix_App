# my-api

Express + MongoDB backend for myFlix.

## Setup

1. Copy `.env.example` to `.env` and fill values.
2. Install deps: `npm install`
3. Run dev: `npm run dev` (default PORT=5002)

## Scripts
- `npm run dev` — nodemon server
- `npm start` — production start
- `node scripts/fix-broken-images.js` — replace poster URLs with working TMDB links
- `node scripts/check-images.js` — print current image URLs

## API (initial)
- `POST /login` — authenticate, returns `{ token, user }`
- `POST /users` — signup
- `GET /movies` — list movies
- `GET /users/:username` — get profile
- `PUT /users/:username` — update profile
- `DELETE /users/:username` — delete user
- `POST /users/:username/movies/:movieId` — add favorite
- `DELETE /users/:username/movies/:movieId` — remove favorite

## Environment
- `PORT` (default 5002 for local dev)
- `MONGO_URI`
- `JWT_SECRET`
- `CORS_ORIGIN` (e.g., http://localhost:5173)

Add tests, linting, and OpenAPI doc as follow-ups.
