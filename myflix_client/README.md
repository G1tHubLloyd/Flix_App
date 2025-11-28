# myFlix Client (minimal)

This folder contains a minimal React client that fetches movies from the myFlix API at `http://localhost:8080/movies`.

Quick start:

1. Install dependencies:

```bash
cd myflix_client
npm install
```

2. Start the API (from the `myflix_api` server folder):

```bash
cd ../myflix_api/myflix_api
npm run start
```

3. Start the client:

```bash
cd ../../myflix_client
npm start
```

Open `http://localhost:5173` (Vite default) to view the app.

Notes:
- The app initializes `movies` as an empty array and populates it via `fetch` to `/movies`.
- Components use `prop-types` for validation.
