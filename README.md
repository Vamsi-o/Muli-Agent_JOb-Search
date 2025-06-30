# 🚀 Job Agent 2025

> **The Ultimate AI-Powered Job Search Platform** - Find your next developer job instantly across top startups, accelerators, and job boards.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ Features

### 🎯 **AI-Powered Job Search**
- **Multi-Agent Architecture**: 4 specialized AI agents working in parallel
- **YC Jobs Priority**: Searches Y Combinator Jobs first for highest-quality opportunities
- **Accelerator-Backed Startups**: Focuses on funded, high-potential companies
- **Real-Time Validation**: Only shows jobs with working application links

### 🔍 **Smart Filtering & Search**
- **Advanced Taxonomy**: Covers Frontend, Backend, Full-stack, DevOps, AI/ML, Web3 roles
- **Location Filtering**: Remote, Onsite, Hybrid options
- **Recent Postings**: Only jobs posted within the last 50 days
- **No Senior/Experience Bias**: Focuses on entry-level and mid-level positions

### 🎨 **Modern UI/UX**
- **Beautiful Design**: Inspired by modern SaaS platforms like Patchwork Labs
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered transitions
- **Material-UI**: Professional, accessible components

### 🔐 **Authentication & Security**
- **JWT Authentication**: Secure user sessions
- **Protected Routes**: Secure job search and results
- **User Management**: Register, login, logout functionality

## 🛠️ Tech Stack

### **Backend**
- **Node.js** + **Express.js** - Server framework
- **TypeScript** - Type-safe development
- **MongoDB** + **Mongoose** - Database and ODM
- **Google Gemini 2.5** - AI-powered job search
- **Axios** - HTTP client for link validation
- **jsonrepair** - Robust JSON parsing

### **Frontend**
- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Material-UI (MUI)** - Component library
- **Framer Motion** - Animations
- **React Router** - Client-side routing

### **AI & Search**
- **Multi-Agent System**: 4 specialized LLM agents
- **YC Jobs Agent** - Y Combinator job board search
- **Accelerator Agent** - Startup discovery
- **Startup Jobs Agent** - Company careers page search
- **Job Board Agent** - Fallback to major job boards

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 6+
- Google Gemini API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/job-agent-2025.git
cd job-agent-2025
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Environment Setup**
```bash
# Backend (.env)
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-agent
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_jwt_secret_here
```

4. **Start the application**
```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm start
```

Visit `http://localhost:3000` to see the application!

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login

### Job Search
- `POST /api/v1/job-search` - Search for jobs
- `GET /api/v1/job-search/all` - Get all stored jobs

### Request Example
```bash
curl -X POST http://localhost:5000/api/v1/job-search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"role": "frontend developer"}'
```

## 🏗️ Architecture

### Multi-Agent Job Search System

```
User Request → YC Jobs Agent → Accelerator Agent → Startup Jobs Agent → Job Board Agent
     ↓              ↓              ↓                    ↓                    ↓
  Results ← Merge & Deduplicate ← Validate Links ← Store in MongoDB ← Return to User
```

1. **YC Jobs Agent**: Searches [Y Combinator Jobs](https://www.ycombinator.com/jobs)
2. **Accelerator Agent**: Finds funded startups from top accelerators
3. **Startup Jobs Agent**: Searches startup careers pages
4. **Job Board Agent**: Fallback to major job boards (if <10 jobs found)

### Job Categories Supported
- **Frontend Development**: React, UI/UX, Client-side
- **Backend Development**: API, Server-side, Database
- **Full-stack Development**: End-to-end development
- **DevOps**: Cloud, Infrastructure, Automation
- **AI/ML**: Machine Learning, Data Science
- **Web3**: Blockchain, Smart Contracts, DApps

## 🎨 UI/UX Features

### Landing Page
- **Hero Section**: Bold headlines with animated gradients
- **Feature Cards**: AI-powered search, real-time validation, advanced filtering
- **How It Works**: 3-step process explanation
- **Value Props**: Why choose Job Agent 2025

### Job Results
- **Modern Table**: Material-UI DataGrid with sorting and filtering
- **Location Filter**: Remote, Onsite, Hybrid options
- **One-Click Apply**: Direct links to job applications
- **Responsive Design**: Works on all devices

### Navigation
- **Sticky Header**: Modern, semi-transparent navbar
- **Smooth Transitions**: Framer Motion animations
- **Authentication**: Secure login/logout flow

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
```bash
# Build the project
cd backend
npm run build

# Set environment variables
GEMINI_API_KEY=your_key
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Environment Variables
- `GEMINI_API_KEY`: Google Gemini API key
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret
- `PORT`: Server port (default: 5000)

## 🔧 Development

### Scripts
```bash
# Backend
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run tests

# Frontend
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests
```

### Project Structure
```
job-agent-2025/
├── backend/
│   ├── src/
│   │   ├── agents/          # AI agents
│   │   ├── api/            # API routes
│   │   ├── models/         # MongoDB models
│   │   └── interfaces/     # TypeScript interfaces
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/          # React components
│   │   ├── components/     # Reusable components
│   │   └── App.tsx         # Main app
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Y Combinator** for their amazing job board
- **Google Gemini** for AI capabilities
- **Material-UI** for beautiful components
- **Framer Motion** for smooth animations

## 📞 Support

- **Email**: support@jobagent2025.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/job-agent-2025/issues)
- **Documentation**: [Wiki](https://github.com/yourusername/job-agent-2025/wiki)

---

**Made with ❤️ for developers seeking their next opportunity**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/job-agent-2025.svg?style=social&label=Star)](https://github.com/yourusername/job-agent-2025)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/job-agent-2025.svg?style=social&label=Fork)](https://github.com/yourusername/job-agent-2025) 