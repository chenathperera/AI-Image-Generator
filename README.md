# PairPix — AI Image Generator

PairPix is a full-stack web application that lets users create AI-generated images from text prompts and transform existing photos using curated style templates. It includes a user-facing app, a REST API backend, and an admin panel for managing styles.

---

## Overview

Turn ordinary photos into creative AI visuals — couple edits, celebrity-style portraits, category-based templates, and free-form text-to-image generation — all powered by a credit-based system with user accounts and generation history.

---

## Features

### User App (Client)

- **Authentication** — Register and log in with email/password; sessions use JWT tokens stored in the browser.
- **Text to Image** — Describe what you want and generate 1024×1024 images from a text prompt.
- **Image to Image** — Upload one or two photos and apply admin-defined style prompts (single or double-photo flows for couples/celebrities).
- **Style Gallery** — Browse styles by category:
  - Men
  - Women
  - Child
  - Couple
  - With Celebrities
- **Dashboard** — Sidebar navigation for all generation modes and history.
- **Generation History** — Save, view, and delete past creations after download.
- **Credit System** — Each generation costs 1 credit; new users start with **5 free credits**.
- **Buy Credits Page** — Pricing plans UI (Basic, Advanced, Business).
- **Download** — Save generated images locally.
- **Responsive UI** — Modern layout with animations, toast notifications, and mobile-friendly design.

### Admin Panel

- **Admin Login** — Secure access using admin credentials configured on the server.
- **Add Styles** — Create new AI styles with:
  - Style name and description
  - AI prompt
  - Category
  - Upload type (single or double photo)
  - Up to 4 sample preview images
  - Auto-generated step instructions for users
- **Style List** — View all styles (list page scaffold included).

### Backend API

- User registration, login, and credit balance
- Text-to-image and image-to-image generation
- Style CRUD (add/list)
- User history management (add, get, delete)
- JWT-based authentication middleware
- File upload handling with Multer (in-memory storage)

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend (Client)** | React 19, Vite 7, React Router 7, Tailwind CSS 4, Motion, Axios, React Toastify |
| **Frontend (Admin)** | React 19, Vite 7, React Router 7, Tailwind CSS 4, Axios, React Toastify |
| **Backend** | Node.js, Express 5, MongoDB, Mongoose |
| **Auth** | JSON Web Tokens (JWT), bcrypt |
| **AI Services** | [Pollinations.ai](https://pollinations.ai) (text-to-image), [Stable Horde](https://stablehorde.net) (image-to-image) |
| **File Upload** | Multer |
| **Other** | dotenv, CORS, FormData |

---

## Project Structure

```
AI-Image-Generator/
├── client/                 # User-facing React app
│   ├── src/
│   │   ├── components/     # UI components (Navbar, Sidebar, Login, etc.)
│   │   ├── pages/          # Home, Dashboard, Result, BuyCredit
│   │   ├── context/        # Global state (AppContext)
│   │   └── assets/         # Images, icons, static data
│   └── .env
│
├── admin/                  # Admin panel React app
│   ├── src/
│   │   ├── pages/          # Add styles, List styles
│   │   └── components/     # Navbar, Sidebar, Login
│   └── .env
│
├── server/                 # Express API server
│   ├── config/             # MongoDB connection
│   ├── controllers/        # Route logic
│   ├── middlewares/        # Auth, Multer, Admin auth
│   ├── models/             # User, Style, History schemas
│   ├── routes/             # API route definitions
│   └── .env
│
└── README.md
```

---

## AI Generation

### Text to Image
Uses **Pollinations.ai** to generate images from text prompts at 1024×1024 resolution.

### Image to Image
Uses the **Stable Horde** volunteer GPU network for img2img transformations. The server submits jobs asynchronously and polls until generation completes. Content filtering and NSFW censoring are enabled.

---

## API Endpoints

### User (`/api/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Create a new user account |
| POST | `/login` | Log in and receive a JWT |
| POST | `/credits` | Get credit balance and user info (auth required) |
| POST | `/add-history` | Save a generated image to history (auth required) |
| POST | `/get-history` | Fetch user generation history (auth required) |
| POST | `/delete-history` | Remove an item from history (auth required) |
| POST | `/admin` | Admin login |

### Image (`/api/image`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/generate-image` | Text-to-image generation (auth required) |
| POST | `/img-to-img` | Image-to-image generation with file upload (auth required) |
| POST | `/deduct-credit` | Deduct 1 credit (auth required) |

### Style (`/api/style`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/add` | Add a new style (admin) |
| GET | `/all` | List all available styles |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas connection
- Stable Horde API key (for image-to-image generation)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/AI-Image-Generator.git
cd AI-Image-Generator
```

### 2. Set up the server

```bash
cd server
npm install
```

Create a `server/.env` file:

```env
PORT=4000
JWT_SECRET=your_jwt_secret_here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
STABLE_HORDE_API_KEY=your_stable_horde_api_key
```

Start the server:

```bash
npm run server
# or
npm start
```

The API runs at `http://localhost:4000` by default.

### 3. Set up the client

```bash
cd client
npm install
```

Create a `client/.env` file:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the client:

```bash
npm run dev
```

The user app runs at `http://localhost:5173`.

### 4. Set up the admin panel

```bash
cd admin
npm install
```

Create an `admin/.env` file:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the admin panel:

```bash
npm run dev
```

Log in with the admin email and password from your server `.env`.

---

## Database

MongoDB database name: **PairPix**

### Collections

| Collection | Purpose |
|------------|---------|
| `users` | User accounts, hashed passwords, credit balance |
| `styles` | AI style templates (prompts, categories, sample images) |
| `histories` | Saved user generation history |

Default MongoDB connection (in `server/config/mongodb.js`):

```
mongodb://127.0.0.1:27017/PairPix
```

Update the connection string in that file if you use MongoDB Atlas or a different host.

---

## Credit Plans

| Plan | Price | Credits |
|------|-------|---------|
| Basic | $10 | 100 |
| Advanced | $50 | 500 |
| Business | $250 | 5,000 |

> New users receive **5 free credits** on registration.

---

## Screenshots & Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, features, and showcase |
| Dashboard | `/dash` | Main workspace for styles, text-to-image, and history |
| Result | `/result` | Standalone text-to-image page |
| Buy Credits | `/buy` | Credit purchase plans |

---

## Scripts

### Client & Admin

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Server

```bash
npm start        # Start server
npm run server   # Start with nodemon (auto-reload)
```

---

## Security Notes

- Passwords are hashed with **bcrypt** before storage.
- Protected routes require a valid **JWT** in the request `token` header.
- Admin routes use separate admin authentication.
- Do **not** commit `.env` files or expose API keys publicly.
- Image-to-image generation includes content filtering via Stable Horde.

---

## Future Enhancements

- Payment integration (Razorpay is listed as a dependency)
- Admin style list/management UI
- Password reset flow
- Cloud image storage instead of base64 in MongoDB
- Production MongoDB Atlas configuration via environment variables

---

## License

This project is for educational and portfolio use. Check individual AI service terms (Pollinations.ai, Stable Horde) for commercial usage.

---

## Author

Built as a full-stack AI image generation platform with React, Node.js, Express, and MongoDB.
