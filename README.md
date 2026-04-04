# Dr. Kapure's Hair Skin Laser Clinic Website

A modern, responsive website for Dr. Kapure's clinic specializing in hair, skin, and laser treatments. Built with React frontend and Node.js backend, featuring a comprehensive treatment catalog, contact forms, and Google Sheets integration for lead management.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with ES Modules
- **Build Tool**: Vite 6
- **Routing**: React Router DOM 6
- **Styling**: Tailwind CSS 3 with custom design tokens
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **SEO**: React Helmet Async
- **Email**: EmailJS Browser
- **Build Tools**: PostCSS, Autoprefixer

### Backend
- **Runtime**: Node.js with ES Modules
- **Framework**: Express 4
- **Validation**: Zod 3
- **Security**: Helmet 8, CORS
- **Logging**: Morgan
- **Configuration**: Dotenv
- **Data Storage**: Google Sheets API (Google APIs)

### Development Tools
- **Code Editor**: Visual Studio Code
- **Version Control**: Git
- **Package Manager**: npm
- **Deployment**: Hostinger (Frontend + Backend)
- **Concurrent Development**: concurrently (for running frontend + backend together)

## ✨ Features

### Core Functionality
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Meta tags, structured data, and performance optimizations
- **Fast Loading**: Code splitting, lazy loading, and optimized bundles
- **Accessibility**: Semantic HTML and ARIA attributes

### Treatment Services
- **Hair Treatments**: PRP Therapy, GFC Therapy, Mesotherapy, Hair Transplant, Hair Regrowth, Low Light Laser, Micro Needling
- **Skin Treatments**: Acne Treatment, Anti-Aging, Pigmentation, Hydra Facial, Medi Facial, Skin Tightening, Glutathione IV, Vampire Facial, Skin Brightening, Scar Treatment
- **Laser Treatments**: Laser Hair Removal, Carbon Laser Facial, Q-Switch Laser, Fractional CO2, IPL Treatment

### User Experience
- **Interactive Gallery**: Before/after images organized by treatment type
- **Contact Forms**: Lead capture with validation and Google Sheets integration
- **Floating Action Buttons**: Quick access to WhatsApp and phone
- **Smooth Animations**: Page transitions and scroll reveals
- **Testimonials**: Customer reviews and ratings

### Backend Features
- **Lead Management**: Automatic Google Sheets integration
- **Duplicate Prevention**: Idempotency keys to prevent spam
- **Rate Limiting**: Protection against abuse
- **CORS Configuration**: Secure cross-origin requests
- **Health Monitoring**: API health checks

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Git
- Google Cloud Service Account (for Sheets integration)

### 1. Clone the Repository
```bash
git clone https://github.com/Sanket-devloper/drkapure-clinic-website.git
cd drkapure-clinic-website
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Environment Configuration

#### Backend Environment (.env)
Create `backend/.env`:
```env
NODE_ENV=development
PORT=8080
FRONTEND_ORIGIN=http://localhost:5173

# Google Sheets Configuration
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----"
```

#### Frontend Environment (.env)
Create `.env`:
```env
VITE_API_BASE_URL=http://localhost:8080
```

### 4. Google Sheets Setup
1. Create a Google Cloud Project
2. Enable Google Sheets API
3. Create a Service Account
4. Share your Google Sheet with the service account email
5. Download the JSON key and extract the private key

### 5. Run Development Server
```bash
# Run both frontend and backend together
npm run dev:full

# Or run separately:
# Frontend only: npm run dev
# Backend only: cd backend && npm run dev
```

Visit `http://localhost:5173` for the frontend and `http://localhost:8080` for the backend API.

## 🚀 Deployment

### Hostinger Deployment
Follow the deployment guides in order:

1. **[Deployment Order](HOSTINGER_DEPLOYMENT_GUIDE/00-DEPLOYMENT-ORDER.md)** - Complete sequence
2. **[Backend Setup](HOSTINGER_DEPLOYMENT_GUIDE/01-BACKEND-HOSTINGER-SETUP.md)** - Deploy Node.js backend
3. **[Frontend Setup](HOSTINGER_DEPLOYMENT_GUIDE/02-FRONTEND-HOSTINGER-SETUP.md)** - Deploy React frontend

### Environment Variables for Production
```env
# Backend
NODE_ENV=production
FRONTEND_ORIGIN=https://yourdomain.com
# ... Google Sheets vars

# Frontend
VITE_API_BASE_URL=https://api.yourdomain.com
```

## 📁 Project Structure

```
drkapure-clinic-website/
├── src/                          # Frontend source
│   ├── components/               # Reusable UI components
│   │   ├── about/               # About page sections
│   │   ├── contact/             # Contact form components
│   │   └── ...
│   ├── pages/                   # Route-level page components
│   │   └── services/            # Service overview pages
│   ├── treatments/              # Treatment detail pages
│   │   ├── hair/                # Hair treatment pages
│   │   ├── skin/                # Skin treatment pages
│   │   └── laser/               # Laser treatment pages
│   ├── data/                    # Static data files
│   ├── hooks/                   # Custom React hooks
│   ├── assets/                  # Images and static assets
│   ├── App.jsx                  # Main app component
│   └── main.jsx                 # App entry point
├── backend/                     # Backend source
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   ├── controllers/         # Route controllers
│   │   ├── middleware/          # Express middleware
│   │   ├── routes/              # API routes
│   │   ├── schemas/             # Validation schemas
│   │   ├── services/            # Business logic services
│   │   └── index.js             # Server entry point
│   └── package.json
├── public/                      # Static assets
├── HOSTINGER_DEPLOYMENT_GUIDE/  # Deployment documentation
├── package.json                 # Frontend dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── README.md                   # This file
```

## 🔧 Development Scripts

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run dev:full     # Start frontend + backend together
```

### Backend Scripts
```bash
cd backend
npm run dev          # Start with file watching
npm start            # Start production server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Code Style
- Use ESLint and Prettier for code formatting
- Follow React best practices
- Use meaningful commit messages
- Test changes locally before pushing

## 📄 License

This project is private and proprietary to Dr. Kapure's clinic.

## 📞 Support

For technical support or questions:
- Check the [Frontend Developer Guide](FRONTEND_DEVELOPER_GUIDE.md)
- Check the [Backend Developer Guide](backend/BACKEND_DEVELOPER_GUIDE.md)
- Review deployment guides in `HOSTINGER_DEPLOYMENT_GUIDE/`

## 🔄 Recent Updates

- Added comprehensive treatment pages
- Implemented Google Sheets lead integration
- Added SEO optimization and meta tags
- Responsive design improvements
- Performance optimizations with code splitting