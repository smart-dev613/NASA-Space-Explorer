# NASA App Deployment Guide for Render

## 🚀 Deploy to Render

This guide will help you deploy your NASA Space Explorer app to Render.

## 📋 Prerequisites

1. **GitHub Repository**: Make sure your code is pushed to a GitHub repository
2. **NASA API Key**: Get a free API key from [https://api.nasa.gov/](https://api.nasa.gov/)
3. **Render Account**: Sign up at [https://render.com/](https://render.com/)

## 🔧 Deployment Steps

### Step 1: Prepare Your Repository

1. **Push your code to GitHub** if you haven't already:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

### Step 2: Deploy Backend Service

1. **Go to Render Dashboard**: Visit [https://dashboard.render.com/](https://dashboard.render.com/)

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your NASA app

3. **Configure Backend Service**:
   - **Name**: `nasa-app-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

4. **Set Environment Variables**:
   - Click on "Environment" tab
   - Add the following variables:
     - `NASA_API_KEY`: Your NASA API key (get from https://api.nasa.gov/)
     - `NODE_ENV`: `production`
     - `PORT`: `10000`

5. **Deploy**: Click "Create Web Service"

### Step 3: Deploy Frontend Service

1. **Create Another Web Service**:
   - Click "New +" → "Static Site"
   - Connect the same GitHub repository

2. **Configure Frontend Service**:
   - **Name**: `nasa-app-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Plan**: Free

3. **Set Environment Variables**:
   - Add environment variable:
     - `VITE_API_BASE_URL`: `https://your-backend-service-name.onrender.com/api`
     (Replace `your-backend-service-name` with your actual backend service name)

4. **Deploy**: Click "Create Static Site"

## 🔗 Alternative: Using render.yaml (Blue-Green Deployment)

If you prefer to use the `render.yaml` file:

1. **Push the render.yaml file** to your repository
2. **Go to Render Dashboard**
3. **Click "New +" → "Blueprint"**
4. **Connect your repository**
5. **Render will automatically create both services**

## 🌐 Access Your App

- **Frontend**: `https://your-frontend-service-name.onrender.com`
- **Backend API**: `https://your-backend-service-name.onrender.com/api`

## 🔧 Environment Variables Reference

### Backend Environment Variables
```env
NASA_API_KEY=your_nasa_api_key_here
NODE_ENV=production
PORT=10000
```

### Frontend Environment Variables
```env
VITE_API_BASE_URL=https://your-backend-service-name.onrender.com/api
```

## 🚨 Important Notes

1. **NASA API Key**: 
   - Get a free key from [https://api.nasa.gov/](https://api.nasa.gov/)
   - The DEMO_KEY has rate limits, so get your own key for production

2. **Free Tier Limitations**:
   - Services may sleep after 15 minutes of inactivity
   - First request after sleep may take 30-60 seconds
   - Limited bandwidth and build minutes

3. **CORS**: The backend is already configured with CORS to allow frontend requests

4. **Health Checks**: Render will automatically check if your services are running

## 🐛 Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check that all dependencies are in `package.json`
   - Verify build commands are correct
   - Check Render logs for specific errors

2. **API Calls Fail**:
   - Verify `VITE_API_BASE_URL` points to correct backend URL
   - Check that NASA API key is set correctly
   - Ensure backend service is running

3. **Images Not Loading**:
   - This is expected for Opportunity/Spirit rovers (missions ended)
   - Use Curiosity or Perseverance for working images

### Check Logs:
- Go to your service in Render dashboard
- Click on "Logs" tab to see real-time logs
- Check "Events" tab for deployment history

## 🎉 Success!

Once deployed, your NASA Space Explorer app will be live and accessible to anyone on the internet!

## 📞 Support

If you encounter issues:
1. Check Render's documentation: [https://render.com/docs](https://render.com/docs)
2. Review the logs in your Render dashboard
3. Verify all environment variables are set correctly 