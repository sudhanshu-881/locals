# Supabase Setup Guide for Locals App

**Complete guide for setting up Supabase database and authentication**

---

## 📋 Quick Start

1. Create Supabase project
2. Run database migration scripts
3. Configure authentication
4. Get API keys
5. Test connection

---

## 🚀 Step 1: Create Supabase Project

### 1.1 Sign Up / Login

- Go to [https://supabase.com](https://supabase.com)
- Click "Start your project" or "Sign in"
- Sign up with GitHub, Google, or email

### 1.2 Create New Project

1. Click **"New Project"** in dashboard
2. Fill in project details:
   - **Organization**: Create new or select existing
   - **Name**: `locals-app` (or your preferred name)
   - **Database Password**: 
     - Click "Generate password" or create your own
     - **IMPORTANT**: Save this password! You'll need it for database access
   - **Region**: 
     - Choose closest to your users
     - Recommended: `Asia Pacific (Mumbai)` for India
   - **Pricing Plan**: 
     - **Free tier** is perfect for development/testing
     - Upgrade later if needed

3. Click **"Create new project"**

### 1.3 Wait for Setup

- Supabase will provision your PostgreSQL database
- This takes 2-3 minutes
- You'll see a progress indicator

---

## 🔑 Step 2: Get API Keys

Once your project is ready:

1. Go to **Settings** → **API** (in left sidebar)
2. You'll see your project credentials:

### Required Keys

**Project URL:**
```
https://xxxxx.supabase.co
```
- This is your `NEXT_PUBLIC_SUPABASE_URL`

**anon public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
- This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Safe to use in client-side code

**service_role key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
- This is your `SUPABASE_SERVICE_ROLE_KEY`
- **KEEP SECRET!** Never expose in client-side code
- Only use in server-side code or environment variables

### Save These Keys

Copy these keys and save them securely. You'll need them for:
- Local development (`.env.local`)
- Vercel deployment (environment variables)

---

## 🗄️ Step 3: Run Database Migration Scripts

### 3.1 Open SQL Editor

1. Go to **SQL Editor** in Supabase Dashboard (left sidebar)
2. Click **"New query"**

### 3.2 Run Initial Database Schema

1. Open `scripts/001_init_database.sql` from your project
2. Copy the **entire content** of the file
3. Paste into Supabase SQL Editor
4. Click **"Run"** (or press `Ctrl+Enter` / `Cmd+Enter`)

**Expected Output:**
- ✅ Query executed successfully
- ✅ No errors

**What this creates:**
- `profiles` table (user profiles)
- `services` table (provider services)
- `messages` table (direct messaging)
- `ratings` table (ratings and reviews)
- `favorites` table (saved providers)
- Row Level Security (RLS) policies
- Database triggers and functions

### 3.3 Run Locals 1.0 Schema

1. Open `scripts/003_locals_1.0_schema.sql` from your project
2. Copy the **entire content**
3. Paste into Supabase SQL Editor
4. Click **"Run"**

**Expected Output:**
- ✅ Query executed successfully

**What this creates:**
- `service_requests` table (booking system)
- `payments` table (ready for Phase 1.0.2)
- `notifications` table (ready for Phase 1.0.3)
- Additional RLS policies
- Database triggers for notifications

### 3.4 Verify Tables Created

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

If any table is missing, re-run the corresponding SQL script.

---

## 🔐 Step 4: Configure Authentication

### 4.1 Email Authentication (Default)

Email authentication is enabled by default. Verify settings:

1. Go to **Authentication** → **Providers**
2. Ensure **Email** is enabled (green toggle)
3. Optional: Configure email templates
   - Go to **Authentication** → **Email Templates**
   - Customize sign-up, login, password reset emails

### 4.2 Configure URL Settings

1. Go to **Authentication** → **URL Configuration**

2. **Site URL** (for local development):
   ```
   http://localhost:3000
   ```
   - This is your app's base URL
   - Update to production URL after deployment

3. **Redirect URLs** (add these):
   ```
   http://localhost:3000/**
   http://localhost:3000/auth/callback
   ```
   - After Vercel deployment, also add:
   ```
   https://your-app.vercel.app/**
   https://your-app.vercel.app/auth/callback
   ```

### 4.3 (Optional) Additional Providers

You can enable other authentication providers:

- **Google OAuth**
- **GitHub OAuth**
- **Facebook OAuth**

For now, email authentication is sufficient.

---

## 🧪 Step 5: Test Database Connection

### 5.1 Test Locally

1. Create `.env.local` file in project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. Start development server:
   ```bash
   pnpm dev
   ```

3. Test sign up:
   - Go to `http://localhost:3000/auth/sign-up`
   - Create a test account
   - Check Supabase Dashboard → **Authentication** → **Users**
   - You should see your new user

4. Check profile created:
   - Go to **Table Editor** → `profiles` table
   - You should see a profile row for your user

### 5.2 Test Database Queries

In Supabase SQL Editor, run:

```sql
-- Check profiles table
SELECT * FROM profiles LIMIT 10;

-- Check RLS is working
SELECT COUNT(*) FROM profiles;
```

---

## 📊 Step 6: (Optional) Seed Dummy Data

### Option A: Using SQL Script

1. Open `scripts/002_seed_dummy_data.sql`
2. Copy and run in Supabase SQL Editor

### Option B: Using Node.js Script

1. Add service role key to `.env.local`:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

2. Run seed script:
   ```bash
   node scripts/seed-dummy-data.js
   ```

**Note:** Seeding is optional. Only needed for testing with sample data.

---

## 🔒 Step 7: Security Checklist

- [ ] Database password saved securely
- [ ] Service role key kept secret (never in client code)
- [ ] RLS policies enabled on all tables
- [ ] Only anon key used in client-side code
- [ ] Authentication redirect URLs configured
- [ ] Email authentication enabled
- [ ] Strong database password set

---

## 🐛 Troubleshooting

### Issue: "Failed to connect to Supabase"

**Solutions:**
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct (check for typos)
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Check Supabase project is active (not paused)
- Check internet connection

### Issue: "Table does not exist"

**Solutions:**
- Re-run SQL migration scripts
- Check for errors in SQL Editor
- Verify scripts ran completely

### Issue: "RLS policy violation"

**Solutions:**
- Check user is authenticated
- Verify RLS policies allow the operation
- Check user role (seeker/provider/admin)

### Issue: "Authentication redirect loop"

**Solutions:**
- Check redirect URLs in Supabase settings
- Verify `NEXT_PUBLIC_APP_URL` matches your site URL
- Clear browser cookies

### Issue: "Profile not created on sign up"

**Solutions:**
- Check trigger `on_auth_user_created` exists
- Verify trigger function `handle_new_user()` exists
- Re-run `001_init_database.sql` to recreate triggers

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase + Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

## ✅ Setup Checklist

- [ ] Supabase project created
- [ ] Project URL and API keys saved
- [ ] `001_init_database.sql` executed successfully
- [ ] `003_locals_1.0_schema.sql` executed successfully
- [ ] All tables visible in Table Editor
- [ ] Authentication configured
- [ ] Redirect URLs set
- [ ] Local connection tested
- [ ] Test user created successfully
- [ ] Profile created automatically on sign up

---

**You're all set!** Your Supabase database is ready. Now proceed with [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel deployment.

---

**Last Updated**: January 2025

