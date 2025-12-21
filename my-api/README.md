# my-api

Express + MongoDB backend for myFlix.

## Setup

1. Copy `.env.example` to `.env` and fill values.
2. Install deps: `npm install`
3. Run dev: `npm run dev`

## Scripts
- `npm run dev` — nodemon server
- `npm start` — production start

## API (initial)
- `POST /login` — authenticate, returns `{ token, user }`
- `POST /users` — signup
- `GET /movies` — list movies
- `GET /users/:username` — get profile
- `PUT /users/:username` — update profile
- `DELETE /users/:username` — delete user
- `POST /users/:username/movies/:movieId` — add favorite
- `DELETE /users/:username/movies/:movieId` — remove favorite

Add tests, linting, and OpenAPI doc as follow-ups.
