# Intelligent Finance Tracker - Frontend

A modern, AI-powered financial management application with natural language transaction parsing and comprehensive analytics.

## 🌟 Features

- **Google OAuth Authentication** - Secure login with Google accounts
- **AI-Powered Transaction Parsing** - Natural language input like "Coffee at Starbucks $6.50"
- **Comprehensive Analytics** - Charts, trends, and financial insights
- **Smart Dashboard** - Real-time financial overview
- **Transaction Management** - Full CRUD operations with filtering
- **Dark/Light Mode** - Theme switching with system preference detection
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Data Export/Import** - Backup and restore functionality

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

For production deployment, you'll need to set up:

1. **Google OAuth Credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials
   - Add your domain to authorized origins

2. **AI Service Integration**
   - OpenAI API key for GPT-4
   - OR Google Gemini API key
   - Configure in backend service

## 🏗️ Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons
- **date-fns** for date manipulation

### Key Components
- `/src/components/auth/` - Authentication pages
- `/src/components/dashboard/` - Dashboard widgets
- `/src/components/transactions/` - Transaction management
- `/src/components/analytics/` - Charts and analytics
- `/src/components/ui/` - Reusable UI components
- `/src/hooks/` - Custom React hooks
- `/src/types/` - TypeScript definitions

### State Management
- React Context for auth and theme
- Local Storage for persistence
- Custom hooks for business logic

## 🎨 Design System

### Colors
- **Primary**: Emerald (#10B981) - Success, income, primary actions
- **Secondary**: Blue (#3B82F6) - Information, trends
- **Accent**: Orange (#F97316) - Warnings, highlights
- **Success**: Green shades
- **Warning**: Yellow shades  
- **Error**: Red shades
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Line Heights**: 1.5 for body, 1.2 for headings

### Spacing
- **System**: 8px base unit (0.5rem increments)
- **Breakpoints**: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)

## 🔧 Configuration

### Tailwind Configuration
- Dark mode support with class strategy
- Custom color palette
- Extended animation utilities
- Mobile-first responsive design

### Build Configuration
- Vite for fast builds and HMR
- TypeScript for type safety
- ESLint for code quality
- PostCSS for Tailwind processing

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run linting
npm run lint
```

## 📦 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🔗 Backend Integration

This frontend is designed to work with a Node.js/Express backend that provides:

- RESTful API endpoints
- JWT-based authentication
- AI transaction parsing service
- Database operations (MongoDB/PostgreSQL)
- Real-time data synchronization

## 🎯 Roadmap

- [ ] Real-time notifications
- [ ] Budget planning and alerts
- [ ] Receipt photo scanning
- [ ] Multi-currency support
- [ ] Investment tracking
- [ ] Bank account integration
- [ ] Advanced reporting
- [ ] Goal setting and tracking

## 📄 License

MIT License - see LICENSE file for details.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS