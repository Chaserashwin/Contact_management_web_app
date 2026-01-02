# 🚀 Step-by-Step Deployment to Render & Vercel

## Prerequisites

- ✅ Backend code ready
- ✅ Frontend code ready
- ✅ MongoDB Atlas account with connection string
- ✅ GitHub account with repos created

---

## PART 1: Backend Deployment to Render

### Step 1.1: Create Render Account

1. Go to [https://render.com](https://render.com)
2. Click **Sign up**
3. Click **Continue with GitHub**
4. Authorize Render to access your GitHub repos
5. Complete sign up

### Step 1.2: Create Web Service

1. From Render dashboard, click **New +** (top-right)
2. Select **Web Service**
3. Under **Connect a repository**, click **Existing repo**
4. Search for your backend repository
5. Click **Connect**

### Step 1.3: Configure Service

Fill in the form:

```
Name: contact-management-backend
Environment: Node
Region: (default is fine)
Build Command: npm install
Start Command: node server.js
Plan: Free
```

Click **Create Web Service**

### Step 1.4: Add Environment Variables

1. Wait for build to complete (status shows "Live")
2. In the service dashboard, go to **Environment**
3. Click **Add Environment Variable**
4. Add two variables:

**Variable 1:**

```
Key: MONGODB_URI
Value: mongodb+srv://YOUR_USER:YOUR_PASS@cluster0.xxxxx.mongodb.net/contactDB
```

**Variable 2:**

```
Key: FRONTEND_URL
Value: (leave blank for now, will update later)
```

5. Click **Deploy** to redeploy with new env vars

### Step 1.5: Note Your Backend URL

1. At the top of the service page, copy your URL
   ```
   https://contact-management-backend.onrender.com
   ```
2. **Save this URL** - you'll need it for frontend

✅ **Backend is now live!**

---

## PART 2: Frontend Deployment to Vercel

### Step 2.1: Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Click **Continue with GitHub**
4. Authorize Vercel to access your GitHub repos
5. Complete sign up

### Step 2.2: Create Project

1. From Vercel dashboard, click **Add New...**
2. Select **Project**
3. Under **Import Git Repository**, search for your frontend repo
4. Click **Import**

### Step 2.3: Configure Project

The auto-detection should show:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Leave these as-is** (Vercel auto-detected correctly)

### Step 2.4: Add Environment Variables

Before clicking Deploy:

1. Expand **Environment Variables** section
2. Add one variable:

```
Name: VITE_API_URL
Value: https://contact-management-backend.onrender.com
(Paste your backend URL from Step 1.5)
```

3. Click **Deploy**

### Step 2.5: Wait for Deployment

1. Vercel shows deployment progress
2. Wait for status: **✅ Production (deployment complete)**
3. Copy your frontend URL:
   ```
   https://[your-project-name].vercel.app
   ```
4. **Save this URL** - you'll need it for backend

✅ **Frontend is now live!**

---

## PART 3: Connect Backend & Frontend

### Step 3.1: Update Backend CORS

Back to Render dashboard:

1. Go to **contact-management-backend** service
2. Click **Environment** tab
3. Find `FRONTEND_URL` variable
4. Click edit (pencil icon)
5. Set value to your Vercel URL:
   ```
   https://[your-project-name].vercel.app
   ```
6. Click **Save**
7. Render auto-redeploys

### Step 3.2: Verify Vercel Env Var

Back to Vercel dashboard:

1. Go to your project
2. Click **Settings**
3. Click **Environment Variables**
4. Verify `VITE_API_URL` is set to your Render URL
5. If needed to update, edit and **Redeploy** (top-right button)

✅ **Both services configured and connected!**

---

## PART 4: Testing the Live App

### Test 1: Open Frontend

1. Open your Vercel URL in browser:
   ```
   https://[your-project-name].vercel.app
   ```
2. Should see Contact Management form and empty list

### Test 2: Add a Contact

1. Fill in:
   - **Name**: Test User
   - **Email**: test@example.com
   - **Phone**: 555-0000
   - **Message**: (optional)
2. Click **Add Contact**
3. Should see success message
4. Contact appears in list below

### Test 3: Verify Data in MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Open your cluster
3. Collections → contactDB → contacts
4. Should see your test contact document

### Test 4: Delete Contact

1. In the list, click **Delete** on your contact
2. Click **OK** on confirmation
3. Contact should disappear from list
4. Check MongoDB - document should be gone

### Test 5: Refresh Page

1. Refresh browser (Ctrl+R)
2. List should repopulate with contacts
3. Proves data persists correctly

✅ **All functionality working!**

---

## PART 5: Troubleshooting

### Problem: "Failed to fetch contacts"

**Causes & Solutions:**

1. **Check Render logs**:

   - Render dashboard → Logs tab
   - Look for MongoDB connection errors
   - Check `MONGODB_URI` is correct

2. **Check Vercel logs**:

   - Vercel dashboard → Deployments → Latest → Logs
   - Look for network errors

3. **Fix CORS**:
   - Render dashboard → Environment
   - Verify `FRONTEND_URL` is your Vercel URL
   - Redeploy

### Problem: "Cannot connect to MongoDB"

**Solution:**

1. Go to MongoDB Atlas
2. Click **Network Access**
3. Verify IP whitelist includes `0.0.0.0/0` (allows all IPs)
   - Or add Render/Vercel IP ranges (varies, just use 0.0.0.0/0)

### Problem: Form submits but nothing happens

**Causes & Solutions:**

1. Check browser console (F12 → Console tab)
2. Look for specific error message
3. If "POST 404": Backend API not found
   - Check `VITE_API_URL` in Vercel env vars
   - Verify backend is running (check Render logs)

### Problem: Render service goes offline/sleeps

**This is normal on Free tier:**

- Render free tier spins down after 15 minutes of inactivity
- Just access the URL again to wake it up
- **Solution**: Upgrade to Starter plan ($7/month) for always-on

---

## Quick Reference: Your Deployment URLs

After deployment, keep these URLs handy:

**Backend (Render):**

```
https://contact-management-backend.onrender.com
```

**Frontend (Vercel):**

```
https://[your-project-name].vercel.app
```

**MongoDB Atlas:**

```
https://cloud.mongodb.com/v2/[your-organization]/clusters
```

---

## What's Configured

### Backend (Render)

- ✅ Node.js server running
- ✅ MongoDB connection via `MONGODB_URI`
- ✅ CORS configured with `FRONTEND_URL`
- ✅ All API routes working
- ✅ Auto-redeploy on git push

### Frontend (Vercel)

- ✅ React + Vite build
- ✅ Tailwind CSS bundled
- ✅ API calls use `VITE_API_URL`
- ✅ SPA routing configured
- ✅ Auto-redeploy on git push

---

## Common Environment Variables Cheat Sheet

| Service           | Variable       | Example Value                                           |
| ----------------- | -------------- | ------------------------------------------------------- |
| Render (Backend)  | `MONGODB_URI`  | `mongodb+srv://user:pass@cluster.mongodb.net/contactDB` |
| Render (Backend)  | `FRONTEND_URL` | `https://my-app.vercel.app`                             |
| Render (Backend)  | `PORT`         | `5000`                                                  |
| Vercel (Frontend) | `VITE_API_URL` | `https://my-backend.onrender.com`                       |

---

## ✅ Deployment Complete!

Your Contact Management app is now live and fully functional!

🎉 **Next steps:**

1. Share your Vercel URL with others
2. Monitor logs for issues
3. Consider upgrading Render to Starter plan
4. Scale up as needed!

📚 **Need help?**

- Render docs: https://render.com/docs
- Vercel docs: https://vercel.com/docs
- MongoDB docs: https://docs.mongodb.com/
