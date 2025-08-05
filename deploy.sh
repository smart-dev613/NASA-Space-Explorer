#!/bin/bash

# NASA App Deployment Script for Render
echo "🚀 NASA App Deployment Script"
echo "=============================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-github-repo-url>"
    exit 1
fi

# Check if changes are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Please commit them first:"
    echo "   git add ."
    echo "   git commit -m 'Prepare for deployment'"
    exit 1
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://dashboard.render.com/"
echo "2. Create a new Web Service for the backend"
echo "3. Create a new Static Site for the frontend"
echo "4. Set up environment variables (see DEPLOYMENT_GUIDE.md)"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md" 