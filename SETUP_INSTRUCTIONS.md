# 🚀 Production Setup Instructions

Follow these steps to deploy Locals app to production with Supabase and Vercel.

---

## 📋 Step-by-Step Setup

### Step 1: Supabase Project Setup

#### 1.1 Create Supabase Account & Project

1. **Sign up for Supabase**
   - Go to [https://supabase.com](https://supabase.com)
   - Click "Start your project" or "Sign in"
   - Sign up with GitHub (recommended) or email

2. **Create New Project**
   - Click "New Project" button
   - Fill in details:
     - **Name**: `locals-app` (or your choice)
     - **Database Password**: Generate a strong password (⚠️ **Save this password!**)
     - **Region**: Select closest to your users (e.g., `Asia Pacific (Mumbai)`)
     - **Pricing Plan**: Free tier is fine for starting
   - Click "Create new project"
   - ⏱️ Wait 2-3 minutes for database initialization

#### 1.2 Get Supabase API Credentials

1. In your Supabase project dashboard, navigate to:
   - **Settings** (gear icon) → **API**

2. Copy these values (you'll need them for Vercel):
   - ✅ **Project URL**: `https://xxxxx.supabase.co`
   - ✅ **anon public key**: Starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - ✅ **service_role key**: Starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (⚠️ Keep secret!)

   📝 **Save these in a secure location - you'll need them soon!**

#### 1.3 Run Database Migration Scripts

1. **Open SQL Editor**
   - In Supabase dashboard, click **SQL Editor** in the left sidebar
   - Click **"New query"** button

2. **Run First Migration Script**
   - In your local project, open: `scripts/001_init_database.sql`
   - Copy the **entire content** of the file
   - Paste into Supabase SQL Editor
   - Click **"Run"** button (or press `Ctrl+Enter` / `Cmd+Enter`)
   - ✅ You should see "Success. No rows returned"

3. **Run Second Migration Script**
   - Open: `scripts/003_locals_1.0_schema.sql` in your local project
   - Copy the **entire content**
   - Paste into Supabase SQL Editor
   - Click **"Run"** button
   - ✅ You should see "Success. No rows returned"

4. **Verify Tables Created**
   - Go to **Table Editor** in Supabase dashboard
   - You should see these tables:
     - ✅ `profiles`
     - ✅ `services`
     - ✅ `messages`
     - ✅ `ratings`
     - ✅ `favorites`
     - ✅ `service_requests`
     - ✅ `payments`
     - ✅ `notifications`

#### 1.4 Configure Authentication

1. Go to **Authentication** → **Settings** in Supabase dashboard

2. Under **URL Configuration**, set:
   - **Site URL**: `http://localhost:3000` (we'll update this after Vercel deployment)

3. Under **Redirect URLs**, add:
   ```
   http://localhost:3000/**
   http://localhost:3000/auth/callback
   ```
   - (We'll add production URLs after Vercel deployment)

4. Click **"Save"**

---

### Step 2: Test Locally First

#### 2.1 Create Local Environment File

1. In your project root directory, create a file named `.env.local`

2. Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   📝 Replace the values with your actual Supabase credentials from Step 1.2

#### 2.2 Install Dependencies & Run

Open terminal in your project directory:

```bash
# Install dependencies
pnpm install
# or if you prefer npm:
npm install

# Start development server
pnpm dev
# or:
npm run dev
```

#### 2.3 Test Locally

1. Open browser: `http://localhost:3000`
2. Test sign up:
   - Go to `/auth/sign-up`
   - Create a test account
   - Check Supabase Dashboard → Authentication → Users to verify user created
3. Test login:
   - Go to `/auth/login`
   - Login with your test account
   - Should redirect to location setup or dashboard

✅ **If local testing works, proceed to Vercel deployment!**

---

### Step 3: Deploy to Vercel

#### 3.1 Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Sign up with GitHub (recommended - easier to connect repo)

#### 3.2 Import GitHub Repository

1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. Find your repository: `sudhanshu-881/locals` (or your repo name)
3. Click **"Import"** button

#### 3.3 Configure Project Settings

1. **Project Name**: `locals-app` (or your choice)
2. **Framework Preset**: Should auto-detect "Next.js" ✅
3. **Root Directory**: Leave as `./` (root)
4. **Build Command**: `pnpm build` (auto-detected)
5. **Output Directory**: `.next` (auto-detected)
6. **Install Command**: `pnpm install` (auto-detected)

#### 3.4 Add Environment Variables

**⚠️ IMPORTANT: Add these BEFORE clicking Deploy!**

1. Scroll down to **"Environment Variables"** section
2. Click to expand it
3. Add each variable one by one:

   | Variable | Value | Where to get |
   |----------|-------|--------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-id.supabase.co` | Supabase Settings → API → Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Supabase Settings → API → anon public |
   | `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Supabase Settings → API → service_role |
   | `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | Leave this - Vercel will auto-fill after first deploy |

4. For each variable:
   - Click **"Add Another"**
   - Enter variable name
   - Enter value
   - Select environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

#### 3.5 Deploy!

1. Click **"Deploy"** button at the bottom
2. ⏱️ Wait 2-5 minutes for build and deployment
3. Watch the build logs - should see "Build successful"
4. ✅ Your app is now live! Note your production URL:
   - Example: `https://locals-app-abc123.vercel.app`
   - Or: `https://locals-app.vercel.app` (if you have a custom domain)

---

### Step 4: Connect Supabase to Production

#### 4.1 Update Supabase Redirect URLs

1. Go back to Supabase Dashboard → **Authentication** → **Settings**

2. Under **Redirect URLs**, add your production URLs:
   ```
   https://your-app-name.vercel.app/**
   https://your-app-name.vercel.app/auth/callback
   ```
   Replace `your-app-name` with your actual Vercel app name

3. Update **Site URL** to your production URL:
   ```
   https://your-app-name.vercel.app
   ```

4. Click **"Save"**

#### 4.2 (Optional) Update Vercel Environment Variable

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. If your URL is different, update `NEXT_PUBLIC_APP_URL`
3. **Redeploy** if you changed it:
   - Go to **Deployments** tab
   - Click **"..."** on the latest deployment
   - Click **"Redeploy"**

---

### Step 5: Verify Production Deployment

#### 5.1 Test Your Production Site

Open your production URL and test:

1. **Homepage**
   - ✅ Site loads without errors
   - ✅ Navigation works

2. **Sign Up**
   - Go to `/auth/sign-up`
   - Create a new test account
   - ✅ Account created successfully
   - Check Supabase Dashboard → Authentication → Users to verify

3. **Login**
   - Go to `/auth/login`
   - Login with your account
   - ✅ Login successful
   - ✅ Redirects to location setup or dashboard

4. **Location Setup**
   - Complete location setup if prompted
   - ✅ Location saved

5. **Dashboard**
   - ✅ Dashboard loads
   - ✅ Profile information displayed

6. **Database Connection**
   - Perform actions (sign up, create profile)
   - Go to Supabase → Table Editor → `profiles`
   - ✅ See new data in tables

#### 5.2 Verify Everything Works

- [ ] Production site accessible
- [ ] Can sign up new users
- [ ] Can login
- [ ] Dashboard loads
- [ ] Data saves to Supabase
- [ ] No console errors in browser
- [ ] Build succeeded in Vercel

---

## 🎉 Success!

If all tests pass, your Locals app is now live in production! 🚀

---

## 📚 Next Steps

1. **Set up custom domain** (optional)
   - Vercel Dashboard → Settings → Domains
   - Add your domain

2. **Enable email verification** (optional)
   - Supabase → Authentication → Settings
   - Enable email confirmation

3. **Monitor your app**
   - Vercel Analytics
   - Supabase Dashboard logs

4. **Proceed with Phase 1.0.2** (Payment Integration)
   - When ready for payments

---

## 🆘 Troubleshooting

### Build fails on Vercel
- Check build logs in Vercel Dashboard
- Verify all environment variables are set correctly
- Test build locally: `pnpm build`

### Authentication not working
- Verify Supabase redirect URLs include production URL
- Check Site URL in Supabase settings
- Verify environment variables are correct

### Database errors
- Check Supabase logs: Dashboard → Logs
- Verify all migration scripts ran successfully
- Check RLS policies are correct

---

## 📖 Additional Resources

- **Detailed Guide**: See `PRODUCTION_SETUP.md`
- **Quick Start**: See `DEPLOYMENT_QUICK_START.md`
- **Environment Variables**: See `ENV_TEMPLATE.md`
- **Supabase Setup**: See `SUPABASE_SETUP.md`

---

**Need help?** Check the troubleshooting section or review the detailed guides!

