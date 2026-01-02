# Deploy Both Backend & Frontend to Vercel

Complete guide for deploying your Contact Management app entirely on Vercel (both backend and frontend).

## Architecture

```
Frontend (Vercel)              Backend (Vercel)
https://frontend.vercel.app    https://backend.vercel.app
    ↓ API calls                     ↓ DB
React App + Tailwind         Node.js Serverless Functions
    ↕                              ↕
    └────────────────────────────────┘
                MongoDB Atlas
```

---

## Prerequisites

- GitHub account with code pushed to repos
- Vercel account (free at vercel.com)
- MongoDB Atlas connection string
- MongoDB IP whitelist set to `0.0.0.0/0`

---

## Part 1: Backend Deployment to Vercel

### Step 1.1: Verify Backend Structure

Your backend now has this structure for Vercel:

```
backend/
├── api/
│   └── index.js              ← Serverless function handler
├── models/
│   └── Contact.js            ← ES modules format
├── routes/
│   └── contactRoutes.js      ← ES modules format
├── vercel.json               ← Vercel config
├── package.json              ← Updated with "type": "module"
├── server.js                 ← Can still run locally
└── .env                      ← Your MongoDB URI
```

**Key changes for Vercel:**

- ✅ All files converted to ES modules (import/export)
- ✅ `api/index.js` is the serverless function entry point
- ✅ `vercel.json` configured for API routing
- ✅ `package.json` has `"type": "module"`

### Step 1.2: Create Vercel Backend Project

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **Add New...** → **Project**
4. Select your **backend** GitHub repository
5. Configure settings:

```
Project Name: contact-management-backend
Framework: Other
Build Command: npm install
Output Directory: (leave blank)
Environment Variables: (add below)
```

### Step 1.3: Add Environment Variables

In Vercel project settings → **Environment Variables**:

```
Name: MONGODB_URI
Value: mongodb+srv://YOUR_USER:YOUR_PASS@cluster.xxxxx.mongodb.net/contactDB
```

```
Name: FRONTEND_URL
Value: https://your-frontend.vercel.app
(You'll add this URL after deploying frontend)
```

### Step 1.4: Deploy Backend

1. Click **Deploy**
2. Wait for build to complete (2-3 minutes)
3. Once deployment is live, Vercel shows your backend URL:
   ```
   https://contact-management-backend.vercel.app
   ```
4. **Copy this URL** - you'll need it for frontend

### Step 1.5: Test Backend

Open in browser or use curl:

```bash
# Test GET
curl https://contact-management-backend.vercel.app/api/contacts

# Should return: []
```

✅ **Backend is live on Vercel!**

---

## Part 2: Frontend Deployment to Vercel

### Step 2.1: Update Frontend Environment

1. Open `frontend/.env.local`
2. Add (leave empty for Vercel to set):
   ```
   VITE_API_URL=
   ```

### Step 2.2: Create Vercel Frontend Project

1. Go to [https://vercel.com](https://vercel.com)
2. Click **Add New...** → **Project**
3. Select your **frontend** GitHub repository
4. Configure settings:

```
Project Name: contact-management-frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Environment Variables: (add below)
```

### Step 2.3: Add Environment Variables

In Vercel project settings → **Environment Variables**:

```
Name: VITE_API_URL
Value: https://contact-management-backend.vercel.app
(Paste your backend URL from Part 1)
```

### Step 2.4: Deploy Frontend

1. Click **Deploy**
2. Wait for build to complete (1-2 minutes)
3. Once deployment is live, Vercel shows your frontend URL:
   ```
   https://contact-management-frontend.vercel.app
   ```

✅ **Frontend is live on Vercel!**

---

## Part 3: Link Backend & Frontend

### Step 3.1: Update Backend with Frontend URL

1. Go to backend Vercel project
2. Click **Settings** → **Environment Variables**
3. Find `FRONTEND_URL` (or create it if missing)
4. Set value to your frontend URL:
   ```
   https://contact-management-frontend.vercel.app
   ```
5. Vercel auto-redeploys with new env var

### Step 3.2: Verify Frontend Env Var

1. Go to frontend Vercel project
2. Click **Settings** → **Environment Variables**
3. Verify `VITE_API_URL` is set to backend URL
4. If changed, click **Redeploy** button

---

## Part 4: Testing

### Test 1: Frontend Loads

1. Open frontend URL in browser
2. Should see Contact Management form ✅

### Test 2: Add Contact

1. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 555-0000
2. Click **Add Contact**
3. Should see success message ✅
4. Contact appears in list ✅

### Test 3: Verify in MongoDB

1. Go to MongoDB Atlas
2. Open your cluster
3. Collections → contactDB → contacts
4. Should see your test document ✅

### Test 4: Delete Contact

1. Click **Delete** on contact
2. Confirm deletion
3. Contact disappears from list ✅

### Test 5: Refresh Page

1. Refresh browser (Ctrl+R)
2. List should repopulate from database ✅

---

## Environment Variables Summary

### Backend (Vercel)

```
MONGODB_URI: mongodb+srv://user:pass@cluster.mongodb.net/contactDB
FRONTEND_URL: https://your-frontend.vercel.app
NODE_ENV: production (auto-set)
```

### Frontend (Vercel)

```
VITE_API_URL: https://your-backend.vercel.app
```

---

## API Endpoints

Your backend serverless functions provide:

```
POST   /api/contacts           - Create contact
GET    /api/contacts           - Get all contacts
DELETE /api/contacts/:id       - Delete contact
```

All endpoints at: `https://your-backend.vercel.app`

---

## File Changes

### Backend (now Vercel-ready)

- ✅ `api/index.js` - Serverless function handler
- ✅ All files converted to ES modules
- ✅ `vercel.json` - Deployment config
- ✅ `package.json` - Added `"type": "module"`

### Frontend (now Vercel-optimized)

- ✅ `src/config.js` - API URL configuration
- ✅ Components updated to use API_BASE_URL
- ✅ `vercel.json` - Routes configured
- ✅ `.env.local` - For local dev

---

## Troubleshooting

### "Failed to fetch contacts"

**Causes & Solutions:**

1. **Check backend URL in frontend env var**

   - Vercel Frontend → Settings → Environment Variables
   - Verify `VITE_API_URL` matches backend URL
   - Redeploy if changed

2. **Check backend logs**

   - Vercel Backend project → Logs
   - Look for errors
   - Check MongoDB connection

3. **MongoDB connection error**
   - MongoDB Atlas → Network Access
   - Verify IP whitelist includes `0.0.0.0/0`

### "CORS error"

**Solution:**

- Backend Vercel → Environment Variables
- Update `FRONTEND_URL` to exact frontend URL
- Redeploy

### "API not found"

**Solution:**

- Check backend URL in frontend env var
- Must be `https://your-backend.vercel.app` (no trailing slash)
- Redeploy frontend

### Build fails on Vercel

**Check:**

- All dependencies in `package.json`
- No CommonJS require() statements (must be import/export)
- `api/index.js` exists for backend
- Vercel logs for specific errors

---

## Local Development (Still Works)

Backend stays runnable locally:

```bash
cd backend
npm install
npm start
# Runs on http://localhost:5000
```

Frontend:

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
# Proxies /api to localhost:5000
```

---

## Monitoring & Logs

### Vercel Dashboard

**For Backend:**

1. Go to backend project
2. Click **Deployments**
3. Click latest deployment
4. View **Logs** tab

**For Frontend:**

1. Go to frontend project
2. Click **Deployments**
3. Click latest deployment
4. View **Build Logs** and **Function Logs**

---

## Performance & Limits

### Vercel Free Tier

- ✅ Unlimited deployments
- ✅ Serverless functions (up to 10 seconds)
- ✅ 100GB bandwidth/month
- ✅ Auto-scaling

### Considerations

- Serverless functions can be slower than traditional servers
- Cold start: ~500ms on first request after inactivity
- Perfect for low-traffic apps (like this project)

---

## Continuous Deployment

After setup, deployment is automatic:

1. Make code changes
2. Commit and push to GitHub
3. Vercel detects push
4. Automatic rebuild and deploy
5. Your app updates instantly ✅

---

## Post-Deployment Checklist

- [ ] Backend deployed to Vercel
- [ ] Frontend deployed to Vercel
- [ ] Backend env vars set (MONGODB_URI, FRONTEND_URL)
- [ ] Frontend env var set (VITE_API_URL)
- [ ] Can view frontend in browser
- [ ] Can add a contact
- [ ] Contact appears in MongoDB
- [ ] Can delete a contact
- [ ] Page refresh shows data persists
- [ ] Mobile view works

---

## Next Steps

1. ✅ Deploy backend to Vercel
2. ✅ Deploy frontend to Vercel
3. ✅ Link them with env vars
4. ✅ Test all functionality
5. ✅ Share your Vercel frontend URL! 🚀

---

## Your Production URLs

**Frontend (Vercel):**

```
https://your-frontend.vercel.app
```

**Backend (Vercel):**

```
https://your-backend.vercel.app
```

**Your app is now live!** 🎉
