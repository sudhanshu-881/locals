# Locals App - Hyper-Local Service Marketplace

**Connect with skilled professionals in your neighborhood. Whether you need help or want to offer your services, Locals makes it simple, secure, and seamless.**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Powered by Supabase](https://img.shields.io/badge/Powered%20by-Supabase-black?style=for-the-badge&logo=supabase)](https://supabase.com)

---

## 🚀 Quick Start

**Want to get started quickly?** Check out the [Quick Start Guide](./QUICK_START.md)

### 3-Step Setup:

1. **Set up Supabase** (5 min) - [Guide](./SUPABASE_SETUP.md)
2. **Run locally** (2 min) - Install dependencies and start dev server
3. **Deploy to production** (5 min) - [Guide](./DEPLOYMENT.md)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup Instructions](#-setup-instructions)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Project Status](#-project-status)

---

## ✨ Features

### ✅ Completed (Phase 1.0.1)

- 🔐 **Authentication & User Management**
  - Email/password authentication via Supabase
  - User profiles with location, skills, ratings
  - Multiple user roles (Seeker, Provider, Both, Admin)
  - Protected routes and middleware

- 📱 **Service Discovery**
  - Browse service providers by category and location
  - Search and filter functionality
  - Provider profile pages with ratings and services
  - Location-based discovery

- 💬 **Communication**
  - Direct messaging between users
  - Real-time message updates
  - Conversation management

- ⭐ **Ratings & Reviews**
  - 1-5 star rating system
  - Text reviews
  - Rating aggregation on profiles

- 📅 **Booking System**
  - Create service requests
  - Request status workflow (Pending → Accepted → In Progress → Completed)
  - Request management dashboard
  - Filter requests by status

- 👤 **User Dashboard**
  - Personal dashboard with stats
  - Profile management
  - Settings page
  - Admin dashboard

### 🔜 Coming Soon

- 💳 Payment Integration (Phase 1.0.2)
- 🔔 Push Notifications (Phase 1.0.3)
- 📸 Image Uploads (Phase 1.0.4)
- 📍 Geolocation/Distance Calculation (Phase 1.0.4)

---

## 🛠 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - UI primitives
- **shadcn/ui** - UI components

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Row Level Security (RLS)

### Deployment
- **Vercel** - Hosting and deployment
- **GitHub** - Version control

---

## 📁 Project Structure

```
locals/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   ├── auth/                 # Authentication pages
│   ├── dashboard/            # User dashboard
│   ├── discover/             # Service discovery
│   ├── requests/             # Service requests
│   ├── messages/             # Messaging
│   └── admin/                # Admin dashboard
├── components/               # React components
│   ├── ui/                   # UI components (shadcn/ui)
│   ├── dashboard/            # Dashboard components
│   ├── requests/             # Request components
│   └── admin/                # Admin components
├── lib/                      # Utility functions
│   └── supabase/             # Supabase clients
├── scripts/                  # Database scripts
│   ├── 001_init_database.sql # Base schema
│   ├── 003_locals_1.0_schema.sql # Phase 1.0 schema
│   └── seed-dummy-data.js    # Seed script
├── public/                   # Static assets
└── docs/                     # Documentation
    ├── DEPLOYMENT.md         # Deployment guide
    ├── SUPABASE_SETUP.md     # Supabase setup
    └── QUICK_START.md        # Quick start guide
```

---

## 🔧 Setup Instructions

### Prerequisites

- Node.js 18+ installed
- pnpm or npm installed
- Supabase account (free tier works)
- Git installed

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/sudhanshu-881/locals.git
   cd locals
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up Supabase**
   - Follow the [Supabase Setup Guide](./SUPABASE_SETUP.md)
   - Create a Supabase project
   - Run database migration scripts
   - Get your API keys

4. **Create environment file**
   Create `.env.local` in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. **Open your browser**
   - Visit [http://localhost:3000](http://localhost:3000)
   - Sign up for a test account
   - Start exploring!

---

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Add Environment Variables**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL` (auto-set by Vercel)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live! 🎉

**Detailed guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

### Post-Deployment

1. **Update Supabase redirect URLs**
   - Add your Vercel URL to Supabase Authentication settings
   - Update Site URL to your production URL

2. **Test production**
   - Visit your Vercel URL
   - Test sign up/login
   - Verify all features work

---

## 📚 Documentation

- **[Quick Start Guide](./QUICK_START.md)** - Get started in 15 minutes
- **[Deployment Guide](./DEPLOYMENT.md)** - Complete deployment instructions
- **[Supabase Setup](./SUPABASE_SETUP.md)** - Database setup guide
- **[Business Analysis](./BUSINESS_ANALYSIS.md)** - Product strategy and market analysis
- **[Development Plan](./DEVELOPMENT_PLAN.md)** - Phased development roadmap
- **[Progress Tracking](./LOCALS_1.0_PROGRESS.md)** - Current progress and achievements
- **[Achievements](./ACHIEVEMENTS.md)** - Completed features summary

---

## 📊 Project Status

### Current Phase: 1.0.1 Complete ✅

**Phase 1.0.1: Booking System** - **COMPLETED**
- ✅ Service request creation
- ✅ Request status workflow
- ✅ Request management dashboard
- ✅ Database schema for bookings
- ✅ API routes for requests
- ✅ UI components for requests

### Next Phases

**Phase 1.0.2: Payment Integration** (Pending)
- Razorpay integration
- Payment processing
- Transaction history

**Phase 1.0.3: Notifications** (Pending)
- Push notifications
- Email notifications
- Notification center

**Phase 1.0.4: Enhanced Features** (Pending)
- Image uploads
- Geolocation/distance calculation
- Enhanced search

---

## 🔐 Environment Variables

### Required

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key |

### Optional (Future Phases)

| Variable | Description |
|----------|-------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-only) |
| `RAZORPAY_KEY_ID` | Razorpay API key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay API key secret |
| `RESEND_API_KEY` | Resend email API key |
| `FROM_EMAIL` | Email address for sending emails |
| `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` | Storage bucket name |
| `NEXT_PUBLIC_APP_URL` | Your app URL |

---

## 🧪 Testing

### Test Accounts

After seeding dummy data, you can use test accounts:
- Email: `seeker@test.com` / Password: `password123`
- Email: `provider@test.com` / Password: `password123`

### Local Testing Checklist

- [ ] Sign up flow works
- [ ] Login flow works
- [ ] Profile creation works
- [ ] Location setup works
- [ ] Service discovery works
- [ ] Provider profiles display correctly
- [ ] Service requests can be created
- [ ] Request status updates work
- [ ] Messaging works (if implemented)

---

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

---

## 📄 License

This project is private and proprietary.

---

## 🆘 Support

**Need Help?**
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section
- Review [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for database issues
- Check Supabase and Vercel documentation

---

## 🎯 Roadmap

- [ ] Phase 1.0.2: Payment Integration
- [ ] Phase 1.0.3: Notifications System
- [ ] Phase 1.0.4: Enhanced Features
- [ ] Phase 2.0: Mobile App (React Native)
- [ ] Phase 3.0: Advanced Analytics
- [ ] Phase 4.0: Multi-language Support

---

**Built with ❤️ using Next.js, React, Supabase, and Vercel**

**Last Updated**: January 2025
