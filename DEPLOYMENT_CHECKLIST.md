# Deployment Checklist & Quick Reference

## 📋 Pre-Deployment Checklist

### Backend (Render)

- [ ] MongoDB Atlas cluster created with IP whitelist `0.0.0.0/0`
- [ ] Backend code pushed to GitHub repo
- [ ] `MONGODB_URI` environment variable ready
- [ ] Tested locally with `npm start`

### Frontend (Vercel)

- [ ] Frontend code pushed to GitHub repo
- [ ] Backend URL obtained from Render (`https://...onrender.com`)
- [ ] Updated `src/config.js` with backend URL (optional, set as env var instead)
- [ ] Tested locally with `npm run dev`

---

## 🚀 Quick Deployment Steps

### 1. Backend Deployment (Render)

```
1. Visit https://render.com
2. Sign in with GitHub
3. New Web Service → Select backend repo
4. Build: npm install | Start: node server.js
5. Add env vars: MONGODB_URI, FRONTEND_URL
6. Deploy
7. Copy backend URL (e.g., https://contact-management-backend.onrender.com)
```

### 2. Frontend Deployment (Vercel)

```
1. Visit https://vercel.com
2. Sign in with GitHub
3. New Project → Select frontend repo
4. Framework: Vite | Build: npm run build
5. Add env var: VITE_API_URL=[backend URL from step 1]
6. Deploy
7. Get frontend URL (e.g., https://contact-management-frontend.vercel.app)
```

### 3. Post-Deployment Setup

```
Backend Render Dashboard:
  - Environment → Add: FRONTEND_URL=https://...vercel.app
  - Redeploy

Frontend Vercel Dashboard:
  - Environment Variables → Add: VITE_API_URL=https://...onrender.com
  - Redeploy
```

---

## 🔗 Deployment URLs

After deployment, update these files with your actual URLs:

**Backend (Render):**

```
Copy this URL from Render dashboard
https://[your-backend-name].onrender.com
```

**Frontend (Vercel):**

```
Copy this URL from Vercel dashboard
https://[your-project-name].vercel.app
```

---

## 📊 Environment Variables

### Render Backend Dashboard

```
MONGODB_URI: mongodb+srv://user:pass@cluster.mongodb.net/contactDB
PORT: 5000
FRONTEND_URL: https://your-frontend.vercel.app
NODE_ENV: production
```

### Vercel Frontend Dashboard

```
VITE_API_URL: https://your-backend.onrender.com
```

---

## ✅ Post-Deployment Testing

1. **Open frontend URL** in browser
2. **Fill contact form** → Submit
3. **Check MongoDB** for new document
4. **Refresh page** → Should see contact in list
5. **Click Delete** → Confirm removal
6. **Test on mobile** → Responsive?

---

## 🆘 Quick Troubleshooting

| Issue          | Solution                                                    |
| -------------- | ----------------------------------------------------------- |
| API 404 errors | Check `VITE_API_URL` in Vercel env vars                     |
| CORS errors    | Update `FRONTEND_URL` in Render env vars                    |
| MongoDB errors | Verify connection string, IP whitelist                      |
| Render offline | Free tier sleeps after 15 min. Upgrade or access to wake up |
| Build fails    | Check package.json, ensure all dependencies installed       |

---

## 📝 File Structure for Deployment

```
backend/
  ├── server.js           ← Entry point
  ├── models/Contact.js
  ├── routes/contactRoutes.js
  ├── package.json        ← Check dependencies
  ├── .env               ← Has MONGODB_URI
  └── .gitignore

frontend/
  ├── src/
  │   ├── App.jsx
  │   ├── config.js       ← API URL config
  │   ├── components/
  │   │   ├── ContactForm.jsx
  │   │   └── ContactList.jsx
  │   └── index.css
  ├── index.html
  ├── package.json        ← Check scripts
  ├── vite.config.js
  ├── tailwind.config.js
  ├── .env.local         ← Empty for dev
  └── .gitignore
```

---

## 💡 Performance Tips

- **Render Free Tier**: Spins down after 15 min idle. Upgrade to Starter ($7/mo) for always-on
- **Vercel**: Generous free tier, no sleep issues
- **MongoDB**: Atlas free tier has 512MB limit (enough for this app)

---

## 🔑 Important Notes

1. **Never commit `.env`** - Use environment variables in dashboard
2. **IP Whitelist**: MongoDB Atlas must allow Render/Vercel IPs (`0.0.0.0/0` for testing)
3. **CORS**: Backend must know frontend URL
4. **Auto-deploy**: Both Render and Vercel auto-deploy on `git push`
5. **First deploy**: May take 2-5 minutes to start

---

## 📚 Useful Links

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Troubleshoot CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

---

## 🎯 What Should Work After Deployment

✅ Add new contact → Appears in list immediately  
✅ Refresh page → Contact data persists (from MongoDB)  
✅ Delete contact → Removed from list & database  
✅ Form validation → Same as local dev  
✅ Responsive UI → Works on mobile/tablet/desktop  
✅ No console errors → Clean deployment

---

**Ready to deploy? Follow the Quick Deployment Steps above!** 🚀
