# Locals App - Developer Guide

This guide provides a comprehensive overview of the Locals App project, from setup to deployment. It is intended for future developers who will be working on the project.

## 1. Introduction

Locals is a hyper-local service marketplace that connects users with skilled professionals in their neighborhood. It allows users to both offer their services and find help from others in their community.

## 2. Tech Stack

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

## 3. Project Structure

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
└── docs/                     # Documentation (legacy)
```

## 4. Setup Instructions

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
   - Follow the [Supabase Setup Guide](./SUPABASE_SETUP.md) for detailed instructions.
   - Create a Supabase project.
   - Run the following database scripts from the `scripts/` directory in the Supabase SQL Editor:
     - `001_init_database.sql`
     - `003_locals_1.0_schema.sql`
   - Configure Authentication URLs in Supabase:
     - **Site URL:** `http://localhost:3000`
     - **Redirect URL:** `http://localhost:3000/**`

4. **Create environment file**
   Create a `.env.local` file in the root directory with the following content:
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
   - Sign up for a test account.

## 5. Development Plan

The development of Locals is divided into several phases.

### Phase 1.0.1: Booking System (Completed)
- Service request creation
- Request management dashboard
- Request status tracking
- Request history

### Phase 1.0.2: Payment Integration (Upcoming)
- Payment gateway integration (Razorpay)
- Escrow/advance payment system
- Payment confirmation flow
- Transaction history

### Phase 1.0.3: Notifications (Upcoming)
- Push notifications (browser)
- Email notifications (transactional)
- In-app notification center

### Phase 1.0.4: Enhanced Features (Upcoming)
- Image uploads
- Geolocation/distance calculation
- Enhanced search with distance

## 6. Deployment

The application is deployed on Vercel.

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com) and import your GitHub repository.

3. **Add Environment Variables**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL` (auto-set by Vercel)

4. **Deploy**
   - Click "Deploy".

5. **Post-Deployment**
   - Update Supabase redirect URLs to your Vercel URL.
   - Update the Site URL in Supabase to your production URL.

## 7. Contributing

This is a personal project, but suggestions and feedback are welcome.

## 8. Troubleshooting

**Can't connect to Supabase?**
- Check if your environment variables are correct.
- Verify that your Supabase project is active.

**Authentication not working?**
- Check the redirect URLs in the Supabase settings.
- Verify that the Site URL matches your app URL.

For more detailed troubleshooting, refer to the legacy documentation in the `docs/` directory.
