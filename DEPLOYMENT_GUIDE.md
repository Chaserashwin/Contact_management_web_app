# Deployment Guide - Render (Backend) & Vercel (Frontend)

## Backend Deployment to Render

### Step 1: Prepare Backend for Render

1. Push your backend code to GitHub (required for Render)

   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/contact-management-backend.git
   git push -u origin main
   ```

2. Create a `.env.production` file in backend (for reference, don't commit secrets)
   ```
   MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/contactDB
   NODE_ENV=production
   ```

### Step 2: Deploy Backend to Render

1. Go to [Render.com](https://render.com)
2. Sign up or log in with GitHub
3. Click **New +** → **Web Service**
4. Select your GitHub repository
5. Configure settings:

   - **Name**: `contact-management-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free (or Starter if free is not available)

6. Add Environment Variables:

   - Go to **Environment** tab
   - Add: `MONGODB_URI` = your MongoDB connection string
   - Add: `NODE_ENV` = `production`

7. Click **Create Web Service**
8. Render will auto-deploy. Wait for build to complete.
9. Copy your **backend URL** (e.g., `https://contact-management-backend.onrender.com`)

**⚠️ Note**: Free tier on Render spins down after 15 mins of inactivity. Consider upgrading to Starter for continuous service.

---

## Frontend Deployment to Vercel

### Step 1: Prepare Frontend for Vercel

1. Update [frontend/src/config.js](frontend/src/config.js) with your Render backend URL:

   ```javascript
   const API_BASE_URL =
     import.meta.env.MODE === "production"
       ? import.meta.env.VITE_API_URL || "https://your-backend-url.onrender.com"
       : "";
   ```

2. Push frontend to GitHub:
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/contact-management-frontend.git
   git push -u origin main
   ```

### Step 2: Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Sign up or log in with GitHub
3. Click **Add New...** → **Project**
4. Select your frontend repository
5. Configure settings:

   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. Add Environment Variables:

   - **VITE_API_URL** = `https://your-backend-url.onrender.com`

7. Click **Deploy**
8. Vercel will build and deploy. Wait for completion.
9. Get your **frontend URL** (e.g., `https://contact-management-frontend.vercel.app`)

---

## Post-Deployment Configuration

### Update Backend CORS

Update [backend/server.js](backend/server.js) to allow your frontend URL:

```javascript
const cors = require("cors");

const corsOptions = {
  origin: [
    "http://localhost:5173", // Local dev
    "https://your-frontend-url.vercel.app", // Production Vercel URL
  ],
  credentials: true,
};

app.use(cors(corsOptions));
```

### Update Frontend Config

Ensure [frontend/src/config.js](frontend/src/config.js) uses the correct backend URL:

```javascript
const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL || "https://your-backend-url.onrender.com"
    : "";
```

### Re-deploy After Updates

**Backend (Render):**

- Push to GitHub → Render auto-redeploys

**Frontend (Vercel):**

- Push to GitHub → Vercel auto-redeploys
- Or manually trigger: Vercel Dashboard → Project → **Redeploy**

---

## Testing Deployed App

1. Open your Vercel frontend URL in browser
2. Fill contact form and submit
3. Check MongoDB Atlas to verify data was saved
4. Verify delete functionality works

---

## Troubleshooting

### "Failed to fetch contacts" / API errors

- Check CORS settings in backend
- Verify `VITE_API_URL` environment variable is set in Vercel
- Check MongoDB URI is correct
- Verify backend is running (check Render logs)

### Build fails on Render

- Check that `server.js` exists in root of backend folder
- Ensure all dependencies in `package.json`
- Check Render build logs for errors

### Build fails on Vercel

- Ensure `npm run build` produces `dist/` folder
- Check that `vite.config.js` is configured correctly
- Verify `package.json` has all dependencies

### MongoDB connection errors

- Verify MongoDB connection string includes username/password
- Check IP whitelist in MongoDB Atlas allows Render/Vercel IPs
- MongoDB Atlas: Security → Network Access → Add IP address `0.0.0.0/0`

---

## Environment Variables Summary

### Backend (Render .env)

```
MONGODB_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/contactDB
NODE_ENV=production
```

### Frontend (Vercel .env)

```
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Free Tier Considerations

| Service           | Free Tier | Limits                             |
| ----------------- | --------- | ---------------------------------- |
| **Render**        | Yes       | Spins down after 15 min inactivity |
| **Vercel**        | Yes       | 100GB bandwidth/month              |
| **MongoDB Atlas** | Yes       | 512MB storage                      |

For production use, consider upgrading Render to Starter plan ($7/month).

---

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Vercel
3. ✅ Update CORS in backend
4. ✅ Set environment variables
5. ✅ Test full workflow
6. ✅ Monitor logs in Render/Vercel dashboards
