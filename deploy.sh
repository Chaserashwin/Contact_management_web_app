#!/bin/bash

echo "================================"
echo "Contact Management - Deployment"
echo "================================"
echo ""

# Check if GitHub CLI is installed
if ! command -v git &> /dev/null; then
    echo "⚠️  Git is required. Please install Git first."
    exit 1
fi

echo "Step 1: Prepare Backend Repository"
echo "---"
read -p "Enter your GitHub username for backend repo: " GITHUB_USER_BACKEND
read -p "Enter backend repository name (default: contact-management-backend): " BACKEND_REPO
BACKEND_REPO=${BACKEND_REPO:-contact-management-backend}

cd backend
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/$GITHUB_USER_BACKEND/$BACKEND_REPO.git
echo "✅ Backend repo ready. Push with: git push -u origin main"
echo ""

echo "Step 2: Prepare Frontend Repository"
echo "---"
read -p "Enter your GitHub username for frontend repo: " GITHUB_USER_FRONTEND
read -p "Enter frontend repository name (default: contact-management-frontend): " FRONTEND_REPO
FRONTEND_REPO=${FRONTEND_REPO:-contact-management-frontend}

cd ../frontend
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/$GITHUB_USER_FRONTEND/$FRONTEND_REPO.git
echo "✅ Frontend repo ready. Push with: git push -u origin main"
echo ""

echo "================================"
echo "Next Steps:"
echo "1. Push both repos to GitHub"
echo "2. Go to Render.com and deploy backend"
echo "3. Go to Vercel.com and deploy frontend"
echo "4. Update VITE_API_URL in Vercel"
echo "5. Add FRONTEND_URL to Render backend"
echo "================================"
