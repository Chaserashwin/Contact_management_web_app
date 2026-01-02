# Contact Management Web App (MERN)

A small **Contact Management Web Application** built as a **time-bound interview task** to demonstrate **MERN stack fundamentals**.
The project is deployed entirely on **Vercel**, with the backend implemented using **Vercel Serverless Functions** and the frontend built using **Vite + React + Tailwind CSS (latest)**.

---

## 🚀 Live Demo

- **Application URL:** https://contact-management-web-app-pearl.vercel.app

---

## 🧩 Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS (latest version)
- JavaScript (ES Modules)
- State management using `useState` and `useEffect`

### Backend

- Node.js (Vercel Serverless Functions)
- MongoDB Atlas
- Mongoose ODM

### Deployment

- **Vercel** (Frontend + Backend)
- **MongoDB Atlas** (Database)

---

## 📌 Features

- Add a new contact
- Client-side form validation
- Disable submit button when form is invalid
- Store contacts in MongoDB
- Fetch and display contacts without page reload
- Delete contacts (bonus)
- Responsive UI using Tailwind CSS

---

## 🧪 API Endpoints

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | `/api/contacts`     | Fetch all contacts |
| POST   | `/api/contacts`     | Add a new contact  |
| DELETE | `/api/contacts/:id` | Delete a contact   |

---

## 🗄 Database Schema (Mongoose)

```js
{
  name: String (required),
  email: String,
  phone: String (required),
  message: String,
  timestamps: true
}
```

---

## 🛠 Local Development Setup

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas account

---

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

---

### 2️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

### 3️⃣ Environment Variables (Root)

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/contactDB
```

---

### 4️⃣ Run Frontend Locally

```bash
npm run dev
```

The backend APIs will be available at:

```
http://localhost:5173/api/contacts
```

---

## ☁ Deployment (Vercel)

### Steps

1. Push the project to GitHub
2. Import repository into Vercel
3. Set **Environment Variable**:

```
MONGO_URI = mongodb+srv://...
```

4. Build Command:

```
npm run build
```

5. Output Directory:

```
frontend/dist
```

6. Deploy

---

## 🧠 Design Decisions

- **Serverless backend** to match Vercel’s architecture
- **MongoDB connection caching** to avoid reconnecting on every request
- **Relative API paths** to eliminate CORS issues
- **Minimal dependencies** for interview readability

---

## 🎯 Interview Notes

- This project was completed with a **60-minute interview constraint**
- Focus was placed on **working functionality over polish**
- Demonstrates full-stack understanding, deployment, and debugging

---

## 📬 Author

**Ashwin Jaiswal**
Full-Stack Developer (MERN)

---

## ✅ Future Enhancements

- Pagination & search
- Authentication
- Form validation using schema
- UI animations

---

**Thank you for reviewing this project.**
