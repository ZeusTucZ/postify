# Postify — Social Posting App

Postify is a social posting app: users create posts with text and images, and
other users like and comment on them. This repository holds the whole app —
backend and frontend together.

## What it does

- Create posts with a description and one or more images.
- Browse the post feed and open a post detail page.
- Like posts and add comments (like and comment counts on each post).
- User profiles.

## Structure

```text
server-postify/   FastAPI backend (Python)
ui-postify/       React + Vite frontend
```

The standalone `server-postify` and `ui-postify` repositories are not separate
projects — the working code lives here.

## Backend — `server-postify/`

FastAPI with async SQLAlchemy / SQLModel.

- Routers: `/users` and `/posts`.
- Models: `User`, `Post`, `Comment`, `Like`, `Image`.
- Post endpoints: list posts, create a post, get one post with its like and
  comment counts.
- Creating a post accepts `user_id` and `description` as form fields plus
  image files; images are uploaded to Cloudinary under
  `postify/posts/{post id}`.
- Interactive API docs (Scalar) at `/scalar`.
- CORS allows `http://localhost:5173`.
- The database engine is created from `DATABASE_URL` in a `.env` file, and
  tables are created automatically on startup.

### Run the backend

```bash
cd server-postify
python -m venv .venv
source .venv/bin/activate   # Windows: .\.venv\Scripts\activate
pip install fastapi uvicorn sqlmodel sqlalchemy python-dotenv cloudinary scalar-fastapi python-multipart
```

There is no `requirements.txt` yet — install the packages the code imports
(see the command above). Create a `.env` file with `DATABASE_URL` and your
Cloudinary credentials (see `app/services/cloudinary_services.py`), then:

```bash
uvicorn main:app --reload --port 8000
```

The API runs on `http://127.0.0.1:8000`.

## Frontend — `ui-postify/`

React 19 + Vite + Tailwind CSS.

- Views: `Home` (feed), `PostDetail`, `Profile`.
- Talks to the backend URL in `VITE_SERVER_POSTIFY`
  (`http://127.0.0.1:8000/users/` by default in `src/.env`).

### Run the frontend

```bash
cd ui-postify
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:5173` by default.

## Current state and limitations

- Built April–May 2026; work in progress.
- No tests or CI confirmed, and no live demo URL.
- The backend has no `requirements.txt` yet, and the committed
  `DATABASE_URL` value is a placeholder — set a real one in `.env`.
