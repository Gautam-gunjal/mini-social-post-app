# Mini Social Post App

A simple, responsive social feed application with signup, login, create-post, like, and comment features.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT
- Styling: plain CSS

## Features
- Signup and login with email/password
- Public feed for all posts
- Create text, image, or mixed posts
- Like / unlike posts
- Add comments instantly
- Stores usernames for likes and comments
- Uses only two MongoDB collections: Users and Posts

## Folder Structure
```bash
mini-social-post-app/
  backend/
  frontend/
```

## Run locally

### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:5000`.

## Environment variables

### Backend `.env`
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=some_strong_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:5000
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
```

## Deployment notes

### Backend on Render
- Set build/start commands to install dependencies and run `npm start`
- Add environment variables:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `CLIENT_URL` (your frontend URL)
  - `SERVER_URL` (your Render backend URL)
- Render will expose the API under HTTPS

### Frontend on Vercel or Netlify
- Build command: `npm run build`
- Output directory: `dist`
- Add env variable:
  - `VITE_API_URL` = your Render backend API URL, ending in `/api`

### MongoDB Atlas
- Create a cluster
- Add your IP or allow access from deployment services
- Copy the connection string into `MONGO_URI`

## Notes
- Image uploads are handled through Multer and served from `/uploads`.
- For production-grade file persistence, a cloud file service can be added later without changing the app flow.
