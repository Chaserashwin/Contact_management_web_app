# Start Here → Deployment Guide

## 📍 You Are Here

Your Contact Management app is **ready for production deployment**.

## 🎯 Three Options

### Option 1: Visual Step-by-Step (Recommended for First Time)

**File**: [`DEPLOYMENT_VISUAL_GUIDE.md`](DEPLOYMENT_VISUAL_GUIDE.md)

- Click-by-click instructions with Render & Vercel dashboards
- Screenshots and examples
- ~15 minutes to complete

### Option 2: Quick Checklist (Fastest)

**File**: [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md)

- Quick reference with all steps
- Environment variables table
- 5-minute reference during deployment

### Option 3: Complete Reference (Most Detail)

**File**: [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md)

- Comprehensive technical guide
- Troubleshooting section
- Post-deployment configuration

---

## 🚀 TL;DR - Deploy in 5 Steps

1. **Push to GitHub**

   ```bash
   cd backend && git add . && git commit -m "Deploy" && git push
   cd ../frontend && git add . && git commit -m "Deploy" && git push
   ```

2. **Deploy Backend** (render.com)

   - New Web Service → Select backend repo
   - Add env vars: `MONGODB_URI`, `FRONTEND_URL`
   - Copy backend URL

3. **Deploy Frontend** (vercel.com)

   - New Project → Select frontend repo
   - Add env var: `VITE_API_URL` = backend URL
   - Copy frontend URL

4. **Link Them**

   - Render: Set `FRONTEND_URL` = your Vercel URL
   - Redeploy

5. **Test**
   - Open Vercel URL → Add a contact → Check it works! ✅

---

## 📊 Architecture Overview

```
You write code locally
        ↓
Push to GitHub
        ↓
┌─────────────────────────────────────┐
│  FRONTEND DEPLOYMENT (Vercel)       │
│  - Automatic on git push            │
│  - ~1 minute build                  │
│  - Live at: https://xxx.vercel.app  │
└─────────────────────────────────────┘

        ↕️ API calls (HTTPS)

┌─────────────────────────────────────┐
│  BACKEND DEPLOYMENT (Render)        │
│  - Automatic on git push            │
│  - ~2 minute build                  │
│  - Live at: https://xxx.onrender.com│
└─────────────────────────────────────┘

        ↕️ Database (TCP)

┌─────────────────────────────────────┐
│  DATABASE (MongoDB Atlas)           │
│  - No deployment needed             │
│  - Cloud hosted                     │
│  - Always available                 │
└─────────────────────────────────────┘
```

---

## 🔧 Configuration Files Added

✅ **Backend**

- `backend/render.yaml` - Deployment config
- `backend/.env` - Production env vars (with FRONTEND_URL)
- `backend/.env.example` - Template for env vars
- `backend/server.js` - Updated CORS for production

✅ **Frontend**

- `frontend/vercel.json` - Deployment config with SPA routing
- `frontend/.env.example` - Template for env vars
- `frontend/.env.local` - Local development settings
- `frontend/src/config.js` - API URL configuration
- Updated components to use `API_BASE_URL`

---

## 📦 What Gets Deployed

### Backend (Render)

- Express.js API server
- MongoDB Mongoose models
- REST API routes for contacts
- ~50MB total (after npm install)

### Frontend (Vercel)

- React + Vite optimized build
- Tailwind CSS bundled
- ~10MB total (after npm build)

---

## 💾 Your MongoDB Connection

Your MongoDB is already set up with:

- **Provider**: MongoDB Atlas (cloud)
- **Connection String**: In `.env` file
- **Database**: `contactDB`
- **Collections**: `contacts`

No additional setup needed - just deploy!

---

## 🔑 Key Environment Variables

Will be set in deployment dashboards:

| Service           | Variable       | Where to Find   |
| ----------------- | -------------- | --------------- |
| Backend (Render)  | `MONGODB_URI`  | `.env` file     |
| Backend (Render)  | `FRONTEND_URL` | Your Vercel URL |
| Frontend (Vercel) | `VITE_API_URL` | Your Render URL |

---

## ⚠️ Important Notes

1. **MongoDB IP Whitelist**

   - Must allow `0.0.0.0/0` OR add Render/Vercel IPs
   - Without this: "MongoDB connection failed"

2. **GitHub Required**

   - Both Render and Vercel deploy from GitHub repos
   - Push your code there first

3. **First Deploy**

   - May take 3-5 minutes total
   - Subsequent deploys are faster

4. **Free Tier Sleeping**
   - Render free tier spins down after 15 min inactivity
   - Just visit to wake up, or upgrade to Starter ($7/mo)

---

## 🎯 Workflow After Deployment

```
Make code changes locally
        ↓
Test with: npm run dev (frontend) + npm start (backend)
        ↓
Commit and push: git push
        ↓
Automatic deployment to Render + Vercel
        ↓
Check logs to verify deployment
        ↓
Live at your production URLs! 🚀
```

---

## ✅ Post-Deployment Checklist

After deployment is complete:

- [ ] Frontend URL in browser works
- [ ] Form displays and validates
- [ ] Can submit a contact
- [ ] Contact appears in list
- [ ] Can delete a contact
- [ ] Page refresh shows saved contacts
- [ ] MongoDB has the data
- [ ] Mobile view responsive

---

## 🆘 Need Help?

### Common Questions

**Q: Where do I set MONGODB_URI?**  
A: In Render dashboard → Your backend service → Environment tab

**Q: Where do I set VITE_API_URL?**  
A: In Vercel dashboard → Your project → Settings → Environment Variables

**Q: My app won't deploy**  
A: Check the logs:

- Render: Service dashboard → Logs tab
- Vercel: Project → Deployments → Latest → Logs

**Q: How long does deployment take?**  
A: First time: 3-5 minutes. After that: 1-2 minutes.

**Q: Can I use my own domain?**  
A: Yes, both Render and Vercel support custom domains (in paid plans)

---

## 🚀 Ready to Deploy?

→ **Start with**: [`DEPLOYMENT_VISUAL_GUIDE.md`](DEPLOYMENT_VISUAL_GUIDE.md)

**Have 15 minutes?** Follow the step-by-step guide.

**In a rush?** Use [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md) as a reference.

---

**Last Updated**: January 2, 2026  
**Status**: ✅ Ready for Production Deployment
