# NASA Space Explorer

A modern web application that utilizes NASA's Open APIs to showcase space-related data through an interactive and visually appealing interface. Built with React frontend and Node.js/Express backend.

## 🚀 Features

- **Astronomy Picture of the Day (APOD)**: View NASA's daily featured space image with detailed descriptions
- **Mars Rover Photos**: Browse photos taken by NASA's Mars rovers (Curiosity, Opportunity, Spirit, Perseverance)
- **Near Earth Objects (NEO)**: Visualize data about asteroids and comets approaching Earth with interactive charts
- **NASA Image Library Search**: Search through NASA's vast collection of space images and videos
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Real-time Data**: All data is fetched live from NASA's APIs

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Recharts** - Data visualization library
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Axios** - HTTP client for API requests
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
nasa-app/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   ├── Header.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── APODCard.jsx
│   │   │   ├── MarsPhotoCard.jsx
│   │   │   └── NEOChart.jsx
│   │   ├── hooks/          # Custom React hooks
│   │   │   └── useNASAAPI.js
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Application entry point
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Node.js/Express backend
│   ├── server.js           # Main server file
│   ├── .env               # Environment variables
│   └── package.json
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nasa-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **NASA API Key (Optional but Recommended)**
   
   While the application works with NASA's demo key, for production use, obtain your own API key:
   
   - Visit [NASA API Portal](https://api.nasa.gov/)
   - Generate your free API key
   - Update `backend/.env` file:
     ```
     NASA_API_KEY=your_api_key_here
     PORT=5000
     ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🌐 API Endpoints

The backend provides the following API endpoints:

- `GET /api/health` - Health check endpoint
- `GET /api/apod` - Astronomy Picture of the Day
  - Query params: `date`, `count`
- `GET /api/mars-photos` - Mars rover photos
  - Query params: `rover`, `sol`, `camera`, `page`
- `GET /api/neo` - Near Earth Objects
  - Query params: `start_date`, `end_date`
- `GET /api/epic` - Earth Polychromatic Imaging Camera
  - Query params: `date`
- `GET /api/search` - NASA Image and Video Library search
  - Query params: `q`, `media_type`, `page`

## 📊 Data Visualization

The application includes several data visualization features:

- **Bar Charts**: Daily NEO detection counts with hazardous vs safe classification
- **Pie Charts**: NEO size distribution analysis
- **Image Galleries**: Mars rover photos and NASA image search results
- **Interactive Cards**: APOD with high-resolution image links

## 🎨 Design Features

- **Modern UI**: Clean, space-themed design with gradient backgrounds
- **Responsive Layout**: Adapts to different screen sizes
- **Loading States**: Smooth loading animations and spinners
- **Error Handling**: User-friendly error messages with retry options
- **Interactive Elements**: Hover effects, clickable cards, and smooth transitions

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to platforms like Vercel, Netlify, or GitHub Pages:

```bash
cd frontend
npm run build
# Deploy the 'dist' folder to your hosting platform
```

### Backend Deployment
The backend can be deployed to platforms like Heroku, Railway, or Render:

1. Ensure your `package.json` has the correct start script
2. Set environment variables on your hosting platform
3. Deploy the backend folder

### Environment Variables for Production

```
NASA_API_KEY=your_production_api_key
PORT=5000
NODE_ENV=production
```

## 🔧 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend:**
- `npm start` - Start the server
- `npm run dev` - Start with development settings

### Adding New Features

1. **New API Endpoint**: Add routes in `backend/server.js`
2. **New Component**: Create in `frontend/src/components/`
3. **New Hook**: Add custom hooks in `frontend/src/hooks/`
4. **Styling**: Use Tailwind CSS classes or extend `App.css`

## 🌟 Features Showcase

### Astronomy Picture of the Day
- Daily featured space images from NASA
- High-resolution image links
- Detailed scientific descriptions
- Copyright information when available

### Mars Rover Photos
- Photos from multiple Mars rovers
- Filter by rover (Curiosity, Opportunity, Spirit, Perseverance)
- Filter by Sol (Martian day)
- Camera information and metadata

### Near Earth Objects
- Real-time asteroid and comet tracking
- Interactive charts showing daily detection counts
- Size distribution analysis
- Hazardous vs safe object classification

### NASA Image Search
- Search through NASA's vast image library
- High-quality space imagery
- Detailed metadata and descriptions
- Date-based filtering

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **NASA** for providing free access to their incredible APIs and data
- **React Team** for the amazing frontend framework
- **Tailwind CSS** for the utility-first CSS framework
- **shadcn/ui** for the beautiful UI components
- **Recharts** for the data visualization capabilities

## 📞 Support

If you encounter any issues or have questions:

1. Check the [NASA API documentation](https://api.nasa.gov/)
2. Review the console for error messages
3. Ensure your API key is valid and has sufficient quota
4. Verify that both frontend and backend servers are running

---

**Built with ❤️ and curiosity about the universe**

