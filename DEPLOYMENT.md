# Locals App - Production Deployment Guide

**Complete guide for deploying Locals to production with Supabase and Vercel**

---

## 📋 Prerequisites

- GitHub account with repository access
- Supabase account (free tier works)
- Vercel account (free tier works)
- Domain (optional, Vercel provides free subdomain)

---

## 🚀 Step-by-Step Deployment

### Step 1: Set Up Supabase Project

1. **Create Supabase Project**
   - Go to [https://supabase.com](https://supabase.com)
   - Sign up or log in
   - Click "New Project"
   - Fill in project details:
     - **Name**: `locals-app` (or your preferred name)
     - **Database Password**: Generate a strong password (save it!)
     - **Region**: Choose closest to your users (e.g., `Asia Pacific (Mumbai)`)
     - **Pricing Plan**: Free tier is fine to start

2. **Wait for Project Setup** (2-3 minutes)
   - Supabase will set up your PostgreSQL database

3. **Get Your Supabase Credentials**
   - Go to **Settings** → **API**
   - You'll need:
     - **Project URL** (e.g., `https://xxxxx.supabase.co`)
     - **anon/public key** (long string starting with `eyJ...`)
     - **service_role key** (long string starting with `eyJ...`) - **Keep this secret!**

4. **Run Database Migration Scripts**
   - Go to **SQL Editor** in Supabase Dashboard
   - Run scripts in this order:
     
     **a) Initialize Base Schema:**
     - Open `scripts/001_init_database.sql`
     - Copy entire content
     - Paste into SQL Editor
     - Click "Run" (or press Ctrl+Enter)
     
     **b) Add Locals 1.0 Schema:**
     - Open `scripts/003_locals_1.0_schema.sql`
     - Copy entire content
     - Paste into SQL Editor
     - Click "Run"
     
     **c) (Optional) Seed Dummy Data:**
     - Open `scripts/002_seed_dummy_data.sql` OR
     - Run `scripts/seed-dummy-data.js` locally with environment variables set

5. **Verify Database Setup**
   - Go to **Table Editor** in Supabase Dashboard
   - You should see these tables:
     - ✅ `profiles`
     - ✅ `services`
     - ✅ `messages`
     - ✅ `ratings`
     - ✅ `favorites`
     - ✅ `service_requests`
     - ✅ `payments`
     - ✅ `notifications`

6. **Configure Authentication**
   - Go to **Authentication** → **Settings**
   - Enable **Email** provider (already enabled by default)
   - Configure **Site URL**: Set to `http://localhost:3000` for now (we'll update this after Vercel deployment)
   - Add **Redirect URLs**: `http://localhost:3000/**`
   - (After Vercel deployment) Add your production URL: `https://your-app.vercel.app/**`

---

### Step 2: Prepare Local Environment

1. **Clone/Check Repository**
   ```bash
   cd locals
   git pull origin main
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Create Environment File**
   Create a `.env.local` file in the root directory:
   
   ```env
   # Supabase Configuration (REQUIRED)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

   # Application URL (update after deployment)
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Test Locally**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
   - Open [http://localhost:3000](http://localhost:3000)
   - Test sign up/login functionality
   - Verify database connections work

---

### Step 3: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Import Repository to Vercel**
   - Go to [https://vercel.com](https://vercel.com)
   - Sign up or log in
   - Click "Add New Project"
   - Import your GitHub repository `sudhanshu-881/locals`
   - Click "Import"

2. **Configure Project**
   - **Project Name**: `locals-app` (or your choice)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `pnpm build` (or `npm run build`)
   - **Output Directory**: `.next` (default)

3. **Add Environment Variables**
   In Vercel project settings, add these environment variables:
   
   **Required:**
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key-here
   ```
   
   **Optional (for seeding/scripts):**
   ```
   SUPABASE_SERVICE_ROLE_KEY = your-service-role-key-here
   ```
   
   **Optional (for future phases):**
   ```
   RAZORPAY_KEY_ID = your-razorpay-key-id
   RAZORPAY_KEY_SECRET = your-razorpay-key-secret
   RESEND_API_KEY = your-resend-api-key
   FROM_EMAIL = noreply@locals.app
   NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET = locals-media
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-5 minutes)
   - You'll get a URL like: `https://locals-app.vercel.app`

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow prompts
   - When asked for environment variables, enter them or add later in dashboard

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

### Step 4: Configure Supabase for Production

1. **Update Site URL**
   - Go to Supabase Dashboard → **Authentication** → **URL Configuration**
   - Update **Site URL** to your Vercel URL: `https://your-app.vercel.app`
   
2. **Add Redirect URLs**
   - Add these redirect URLs:
     - `https://your-app.vercel.app/**`
     - `https://your-app.vercel.app/auth/callback`
     - `http://localhost:3000/**` (for local development)

3. **Update Vercel Environment Variables**
   - Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
   - Update `NEXT_PUBLIC_APP_URL` to your production URL
   - Redeploy if needed

---

### Step 5: Verify Production Deployment

1. **Test Basic Functionality**
   - Visit your production URL
   - Test sign up flow
   - Test login flow
   - Test profile creation
   - Test location setup

2. **Test Core Features**
   - Browse providers (`/discover`)
   - View provider profiles (`/provider/[id]`)
   - Create service request
   - View requests dashboard
   - Test messaging (if implemented)

3. **Check Console for Errors**
   - Open browser DevTools
   - Check Console and Network tabs
   - Verify no connection errors

---

### Step 6: Set Up Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
   - Click "Add Domain"
   - Enter your domain (e.g., `locals.app`)

2. **Configure DNS**
   - Follow Vercel's DNS configuration instructions
   - Add CNAME or A record as instructed

3. **Update Supabase Redirect URLs**
   - Add your custom domain to Supabase redirect URLs

---

## 🔧 Troubleshooting

### Build Errors

**Error: Module not found**
- Make sure all dependencies are in `package.json`
- Run `pnpm install` locally to verify

**Error: Environment variables missing**
- Check Vercel environment variables are set
- Make sure variable names match exactly (case-sensitive)

### Runtime Errors

**Error: Supabase connection failed**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check Supabase project is active (not paused)
- Verify RLS policies allow public access where needed

**Error: Authentication redirect loop**
- Check Supabase redirect URLs include your Vercel URL
- Verify `NEXT_PUBLIC_APP_URL` is set correctly
- Clear browser cookies and try again

**Error: Database query fails**
- Check RLS policies in Supabase
- Verify user is authenticated
- Check table exists in Supabase Table Editor

### Database Issues

**Tables missing**
- Re-run SQL migration scripts in Supabase SQL Editor
- Check for errors in SQL execution

**RLS policy errors**
- Verify policies allow authenticated users to access data
- Check policies match user roles (seeker/provider/admin)

---

## 📝 Environment Variables Reference

### Required Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | Supabase Dashboard → Settings → API |

### Optional Variables (Future Phases)

| Variable | Description | When Needed |
|----------|-------------|-------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) | Database seeding, admin operations |
| `RAZORPAY_KEY_ID` | Razorpay API key ID | Phase 1.0.2 (Payments) |
| `RAZORPAY_KEY_SECRET` | Razorpay API key secret | Phase 1.0.2 (Payments) |
| `RESEND_API_KEY` | Resend email API key | Phase 1.0.3 (Notifications) |
| `FROM_EMAIL` | Email address for sending emails | Phase 1.0.3 (Notifications) |
| `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` | Storage bucket name | Phase 1.0.4 (Image uploads) |
| `NEXT_PUBLIC_APP_URL` | Your production app URL | For email links, redirects |

---

## ✅ Deployment Checklist

- [ ] Supabase project created and configured
- [ ] Database migration scripts run successfully
- [ ] All tables visible in Supabase Table Editor
- [ ] Supabase API keys copied
- [ ] Local environment tested (`pnpm dev`)
- [ ] Vercel project created and connected to GitHub
- [ ] Environment variables added to Vercel
- [ ] First deployment successful
- [ ] Production URL working
- [ ] Supabase redirect URLs updated
- [ ] Sign up/login tested in production
- [ ] Core features tested
- [ ] Custom domain configured (if applicable)

---

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- ✅ Deploy on every push to `main` branch
- ✅ Create preview deployments for pull requests
- ✅ Run build checks before deploying

**To deploy manually:**
- Push to GitHub: `git push origin main`
- Or trigger from Vercel Dashboard → Deployments → Redeploy

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Supabase + Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

**Need Help?** Check the troubleshooting section or create an issue in the repository.

---

**Last Updated**: January 2025

