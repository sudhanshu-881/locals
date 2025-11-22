# 🚀 Production Deployment Setup Guide

**Complete step-by-step guide to deploy Locals app to production**

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Supabase Setup](#step-1-supabase-setup)
3. [Step 2: Local Testing](#step-2-local-testing)
4. [Step 3: Vercel Deployment](#step-3-vercel-deployment)
5. [Step 4: Connect Supabase to Production](#step-4-connect-supabase-to-production)
6. [Step 5: Verification & Testing](#step-5-verification--testing)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, make sure you have:

- ✅ GitHub account with your repository pushed
- ✅ Supabase account ([sign up here](https://supabase.com))
- ✅ Vercel account ([sign up here](https://vercel.com))
- ✅ Node.js 18+ installed locally
- ✅ pnpm or npm installed

---

## Step 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in the details:
   - **Name**: `locals-app` (or your preferred name)
   - **Database Password**: Generate and save a strong password
   - **Region**: Choose closest to your users (recommended: `Asia Pacific (Mumbai)` for Indian users)
   - **Pricing Plan**: Free tier is sufficient to start
4. Click **"Create new project"**
5. Wait 2-3 minutes for project initialization

### 1.2 Get Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy these values (you'll need them later):
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` ⚠️ **Keep this secret!**

### 1.3 Run Database Migrations

1. Go to **SQL Editor** in Supabase Dashboard
2. Run these scripts **in order**:

#### a) Initialize Base Schema
1. Open `scripts/001_init_database.sql` from your project
2. Copy the entire content
3. In Supabase SQL Editor, paste and click **"Run"** (or press `Ctrl+Enter`)
4. Verify success message

#### b) Add Locals 1.0 Schema
1. Open `scripts/003_locals_1.0_schema.sql` from your project
2. Copy the entire content
3. In Supabase SQL Editor, paste and click **"Run"**
4. Verify success message

#### c) (Optional) Seed Dummy Data
If you want test data:
1. Open `scripts/002_seed_dummy_data.sql` OR
2. Run `scripts/seed-dummy-data.js` locally after setting up `.env.local`

### 1.4 Verify Database Tables

1. Go to **Table Editor** in Supabase Dashboard
2. You should see these tables:
   - ✅ `profiles`
   - ✅ `services`
   - ✅ `messages`
   - ✅ `ratings`
   - ✅ `favorites`
   - ✅ `service_requests`
   - ✅ `payments`
   - ✅ `notifications`

### 1.5 Configure Authentication Settings

1. Go to **Authentication** → **Settings** in Supabase Dashboard
2. Configure **URL Configuration**:
   - **Site URL**: `http://localhost:3000` (update after Vercel deployment)
   - **Redirect URLs**: Add these:
     ```
     http://localhost:3000/**
     http://localhost:3000/auth/callback
     https://your-app-name.vercel.app/**
     https://your-app-name.vercel.app/auth/callback
     ```
   - (You'll update the Vercel URL after deployment)

---

## Step 2: Local Testing

### 2.1 Create Local Environment File

1. In your project root, create `.env.local` file
2. Copy the content from `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
3. Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### 2.2 Install Dependencies & Run Locally

```bash
# Install dependencies
pnpm install
# or
npm install

# Run development server
pnpm dev
# or
npm run dev
```

### 2.3 Test Locally

1. Open `http://localhost:3000` in your browser
2. Test sign up flow:
   - Go to `/auth/sign-up`
   - Create a test account
   - Verify email in Supabase Dashboard → Authentication → Users
3. Test login flow:
   - Go to `/auth/login`
   - Login with your test account
4. Test location setup and dashboard access

✅ **If everything works locally, proceed to Vercel deployment!**

---

## Step 3: Vercel Deployment

### 3.1 Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository:
   - Select **"Import Git Repository"**
   - Find `sudhanshu-881/locals` (or your repo name)
   - Click **"Import"**

### 3.2 Configure Project Settings

1. **Project Name**: `locals-app` (or your preferred name)
2. **Framework Preset**: Vercel should auto-detect **Next.js**
3. **Root Directory**: Leave as `./` (root)
4. **Build and Output Settings**: Leave default (Vercel auto-detects)

### 3.3 Add Environment Variables

**Before clicking Deploy**, add environment variables:

1. Click **"Environment Variables"** section
2. Add these variables one by one:

   | Variable Name | Value | Description |
   |--------------|-------|-------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-id.supabase.co` | Your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Your Supabase anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Your Supabase service role key |
   | `NEXT_PUBLIC_APP_URL` | `https://your-app-name.vercel.app` | Your Vercel URL (auto-filled after first deploy) |

3. **Important**: Select environments for each variable:
   - ✅ **Production**
   - ✅ **Preview**
   - ✅ **Development** (if you want)

### 3.4 Deploy

1. Click **"Deploy"** button
2. Wait 2-5 minutes for build and deployment
3. Your app will be live at: `https://your-app-name.vercel.app`

### 3.5 Get Your Production URL

After deployment, note your production URL:
- It will be something like: `https://locals-app-xxxxx.vercel.app`
- Or if you have a custom domain: `https://yourdomain.com`

---

## Step 4: Connect Supabase to Production

### 4.1 Update Supabase Redirect URLs

1. Go back to Supabase Dashboard → **Authentication** → **Settings**
2. Find **Redirect URLs** section
3. Add your production URLs:
   ```
   https://your-app-name.vercel.app/**
   https://your-app-name.vercel.app/auth/callback
   ```
4. Update **Site URL** to your production URL:
   ```
   https://your-app-name.vercel.app
   ```
5. Click **"Save"**

### 4.2 Update Vercel Environment Variable (if needed)

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Update `NEXT_PUBLIC_APP_URL` to your actual production URL (if different)
3. **Redeploy** your application:
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

---

## Step 5: Verification & Testing

### 5.1 Test Production Site

1. Open your production URL: `https://your-app-name.vercel.app`
2. Test the following:

#### ✅ Sign Up Flow
- Go to `/auth/sign-up`
- Create a new account
- Check email for verification (if email verification is enabled)
- Verify user appears in Supabase Dashboard → Authentication → Users

#### ✅ Login Flow
- Go to `/auth/login`
- Login with your account
- Should redirect to dashboard or location setup

#### ✅ Location Setup
- Complete location setup if prompted
- Should redirect to dashboard

#### ✅ Dashboard
- Should see dashboard with your profile
- Test navigation

#### ✅ Service Discovery
- Go to `/discover`
- Should see service providers (if any)

#### ✅ Profile Management
- Go to `/profile`
- Update profile information
- Verify changes are saved

### 5.2 Check Database Connection

1. Perform actions in production (sign up, create profile)
2. Go to Supabase Dashboard → **Table Editor**
3. Verify data is being created in tables:
   - Check `profiles` table for new users
   - Check other tables as needed

### 5.3 Monitor Deployment

1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Check build logs for any errors
3. Monitor **Analytics** and **Logs** tabs

---

## Troubleshooting

### Issue: Build fails on Vercel

**Solutions:**
- Check build logs in Vercel Dashboard
- Verify all environment variables are set
- Ensure `package.json` has correct build scripts
- Check for TypeScript errors: `pnpm build` locally first

### Issue: Authentication not working in production

**Solutions:**
- Verify Supabase redirect URLs include production URL
- Check Site URL in Supabase Authentication settings
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Clear browser cookies and try again

### Issue: Database queries failing

**Solutions:**
- Check Row Level Security (RLS) policies in Supabase
- Verify user is authenticated
- Check Supabase logs: Dashboard → Logs → Postgres Logs
- Ensure all tables exist and migrations ran successfully

### Issue: Environment variables not working

**Solutions:**
- Variables starting with `NEXT_PUBLIC_` are exposed to browser
- Variables without `NEXT_PUBLIC_` are server-only
- After adding new env variables, redeploy the application
- Verify variable names match exactly (case-sensitive)

### Issue: Images not loading

**Solutions:**
- Check `next.config.mjs` has `images.unoptimized = true`
- Verify public folder assets are committed to git
- Check image paths in code

---

## ✅ Production Checklist

Before considering deployment complete, verify:

- [ ] Supabase project created and configured
- [ ] Database migrations run successfully
- [ ] All tables visible in Supabase Table Editor
- [ ] Supabase API keys copied
- [ ] Local environment tested and working (`pnpm dev`)
- [ ] `.env.local` file created (for local development)
- [ ] Vercel project created and connected to GitHub
- [ ] All environment variables added to Vercel
- [ ] First deployment successful
- [ ] Production URL working and accessible
- [ ] Supabase redirect URLs updated with production URL
- [ ] Sign up tested in production
- [ ] Login tested in production
- [ ] Dashboard accessible after login
- [ ] Database connection verified (data being saved)

---

## 🎉 Next Steps After Deployment

Once your production site is live:

1. **Test all features** thoroughly
2. **Set up custom domain** (optional, in Vercel Settings → Domains)
3. **Enable email verification** in Supabase (Authentication → Settings)
4. **Set up monitoring** (Vercel Analytics)
5. **Configure backups** in Supabase (Database → Backups)
6. **Proceed with Phase 1.0.2** (Payment Integration) when ready

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- Project Documentation:
  - `README.md` - Project overview
  - `DEPLOYMENT.md` - Detailed deployment guide
  - `SUPABASE_SETUP.md` - Supabase-specific setup
  - `ENV_TEMPLATE.md` - Environment variables reference

---

## 🆘 Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Review build logs in Vercel Dashboard
3. Check Supabase logs in Dashboard → Logs
4. Verify all environment variables are set correctly
5. Test locally first to isolate issues

---

**Last Updated**: January 2025  
**Status**: Production Ready ✅

