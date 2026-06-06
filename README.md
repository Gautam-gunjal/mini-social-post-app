# Mini Social Post App

A full-stack social feed application where users can sign up, create posts with text or images, and interact through likes and comments — built as part of the 3W Full Stack Internship Assignment.

---

## Features

- **Authentication** — Signup and login with email and password. JWT-based session management.
- **Create Posts** — Share text, an image, or both. Neither field is mandatory on its own.
- **Public Feed** — All posts from all users are visible without login. Posts are sorted newest first.
- **Like Posts** — Toggle like/unlike on any post. Instantly updates in the UI.
- **Comment on Posts** — Add comments to any post. Updates reflect instantly without page reload.
- **Who Liked / Commented** — Each post shows the names of users who liked or commented.
- **Image Uploads** — Images are uploaded and served via ImageKit CDN.
- **Protected Actions** — Creating posts, liking, and commenting require authentication.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Vite |
| Backend | Node.js, Express |
| Database | MongoDB Atlas (Mongoose) |
| Image Storage | ImageKit |
| Auth | JWT (jsonwebtoken), bcryptjs |
| File Uploads | Multer (memory storage) |
| HTTP Client | Axios |
| Styling | Plain CSS |

---

## Project Structure

```
mini-social-post-app/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Signup, login, me
│   │   └── postController.js      # CRUD, like, comment
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification
│   ├── models/
│   │   ├── User.js                # User schema
│   │   └── Post.js                # Post schema with likes & comments
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── postRoutes.js
│   ├── services/
│   │   └── imagekit.js            # ImageKit client
│   ├── utils/
│   │   └── generateToken.js       # JWT generator
│   └── server.js                  # Express app entry point
│
└── frontend/
    └── src/
        ├── components/
        │   ├── CommentBox.jsx
        │   ├── LikeButton.jsx
        │   ├── Navbar.jsx
        │   ├── PostCard.jsx
        │   ├── PostForm.jsx
        │   └── ProtectedRoute.jsx
        ├── context/
        │   └── AuthContext.jsx    # Global auth state
        ├── pages/
        │   ├── Feed.jsx
        │   ├── Login.jsx
        │   └── Signup.jsx
        ├── services/
        │   └── api.js             # Axios instance with JWT interceptor
        ├── utils/
        │   └── helpers.js         # Date formatter, URL validator
        ├── App.jsx
        └── index.css
```

---

## Database

Only **two MongoDB collections** are used:

- **users** — stores name, email, and hashed password
- **posts** — stores post text, image URL, and embedded arrays for likes and comments (each with username saved)

---

## Supported Image Formats

When creating a post with an image, the following file types are accepted:

| Format | Extension |
|---|---|
| JPEG | `.jpg`, `.jpeg` |
| PNG | `.png` |
| WebP | `.webp` |
| GIF | `.gif` |

> **Maximum file size: 5MB**
>
> Other formats like AVIF, HEIC, or BMP are not supported. Please convert your image to JPG or PNG before uploading.

---

## Getting Started Locally

### Prerequisites

- Node.js v18+
- A MongoDB Atlas account
- An ImageKit account

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/mini-social-post-app.git
cd mini-social-post-app
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:5000
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Start the backend:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## API Endpoints

### Auth

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive JWT |
| GET | `/api/auth/me` | Protected | Get current user info |

### Posts

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/posts` | Public | Fetch all posts (newest first) |
| POST | `/api/posts` | Protected | Create a new post (text + optional image) |
| PUT | `/api/posts/:id/like` | Protected | Toggle like on a post |
| POST | `/api/posts/:id/comment` | Protected | Add a comment to a post |

---

## Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel / Netlify |
| Backend | Render |
| Database | MongoDB Atlas |
| Images | ImageKit |

### Deploy Backend to Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service → connect your repo
3. Set **Root Directory** to `backend`
4. Set **Build Command** to `npm install`
5. Set **Start Command** to `node server.js`
6. Add all environment variables from `backend/.env` under **Environment**

### Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project → import your repo
2. Set **Root Directory** to `frontend`
3. Add environment variable: `VITE_API_URL=https://your-render-backend-url.onrender.com/api`
4. Deploy

---

## Environment Variables Reference

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `PORT` | Port the server runs on (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `JWT_EXPIRES_IN` | JWT expiry duration (e.g. `7d`) |
| `CLIENT_URL` | Frontend URL for CORS (comma-separated for multiple) |
| `SERVER_URL` | Backend URL |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint |

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

---

## Assignment

Built for the **3W Full Stack Internship – Round 1 Task**.  
Inspired by the Social Page of the [TaskPlanet App](https://play.google.com/store/apps/details?id=com.taskplanet).