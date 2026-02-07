# Bookmark Manager

Full-stack bookmark manager with JWT auth. The frontend is React (Vite), and the backend is Express + MongoDB.

## Features

- Register and log in with JWT authentication
- Create, read, update, delete, pin, and archive bookmarks
- Protected UI with token-based session checks
- Centralised API client for clean network logic

## Tech Stack

- Frontend: React, Vite, React Router, SCSS
- Backend: Express, MongoDB (Mongoose), JWT

## Project Structure

```
Backend/    # Express API + MongoDB
Frontend/   # React app (Vite)
```

## Environment Variables (Backend)

Create `Backend/.env` with:

```
PORT=8000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
```

## Install

```
cd Backend
npm install

cd ../Frontend
npm install
```

## Run (Development)

Backend:

```
cd Backend
npm run dev
```

Frontend:

```
cd Frontend
npm run dev
```

Frontend runs on port 5173 by default. Backend runs on the port set in `Backend/.env`.

## Auth Flow (High Level)

1. User logs in and receives a JWT
2. Frontend stores the token and attaches it to API requests
3. Backend validates the token on protected routes

## Notes

- Keep `Backend/.env` private and out of version control.
- If you later add refresh tokens, update the auth flow section.
