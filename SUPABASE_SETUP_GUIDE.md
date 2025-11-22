# 🗄️ Supabase Setup Guide - Step by Step

**Follow this guide to set up your Supabase project for Locals app**

---

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ An email address (for Supabase account)
- ✅ GitHub account (optional but recommended for easier sign up)
- ✅ About 10-15 minutes of time

---

## 🚀 Step 1: Create Supabase Account

### 1.1 Sign Up for Supabase

1. **Open your web browser**
2. **Go to Supabase website**: [https://supabase.com](https://supabase.com)
3. **Click "Start your project"** or **"Sign in"** button (top right)
4. **Choose sign up method**:
   - **Option A**: Sign up with GitHub (recommended - easiest)
     - Click "Continue with GitHub"
     - Authorize Supabase to access your GitHub account
   - **Option B**: Sign up with Email
     - Enter your email address
     - Create a password
     - Verify your email address

5. **Complete sign up process**
   - Fill in your name (optional)
   - Accept terms and conditions
   - Click "Create account"

✅ **You now have a Supabase account!**

---

## 🏗️ Step 2: Create New Project

### 2.1 Create Project

1. **In Supabase Dashboard**, you should see "New Project" button
   - If you don't see it, click the "+" icon or "New Project" in the sidebar

2. **Fill in project details**:
   
   **Project Name**:
   - Enter: `locals-app` (or your preferred name)
   - This will be visible in your dashboard
   
   **Database Password**:
   - **IMPORTANT**: Click "Generate a password" or create a strong password
   - **SAVE THIS PASSWORD** in a secure location (password manager, notes app)
   - ⚠️ You'll need this password later for database access
   - Example: Copy it to a text file temporarily
   
   **Region**:
   - Click the dropdown to select a region
   - **Recommended**: `Asia Pacific (Mumbai)` for Indian users
   - Or choose closest to your users:
     - `US East (Ohio)` - US East
     - `EU West (Ireland)` - Europe
     - `Asia Pacific (Singapore)` - Asia Pacific
     - `Asia Pacific (Tokyo)` - Japan
   
   **Pricing Plan**:
   - Select **"Free"** plan (perfect for starting)
   - Free tier includes:
     - 500 MB database space
     - 2 GB bandwidth
     - 50,000 monthly active users
     - Perfect for development and small production apps

3. **Click "Create new project"** button
4. **Wait 2-3 minutes** while Supabase sets up your project
   - You'll see a loading screen: "Setting up your project"
   - This creates your PostgreSQL database and backend infrastructure

✅ **Your Supabase project is being created!**

---

## 🔑 Step 3: Get API Credentials

### 3.1 Access API Settings

1. **Wait for project setup to complete**
   - You'll see "Your project is ready!" message
   - You'll be redirected to your project dashboard

2. **Navigate to API Settings**:
   - In the left sidebar, click **"Settings"** (gear icon ⚙️)
   - Click **"API"** in the Settings submenu
   - Or go directly: Click on your project → Settings → API

### 3.2 Copy API Credentials

You'll see a section called **"Project API keys"** with these values:

1. **Project URL**:
   - Looks like: `https://xxxxxxxxxxxxx.supabase.co`
   - Click the copy icon next to it 📋
   - **Save this somewhere safe** (we'll use it soon)

2. **anon public key**:
   - Long string starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Labeled as "anon" or "public"
   - This is safe to expose to the browser
   - Click copy icon 📋
   - **Save this somewhere safe**

3. **service_role key**:
   - Long string starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Labeled as "service_role" or "secret"
   - ⚠️ **NEVER expose this to the browser or commit it to Git**
   - This key has admin privileges
   - Click copy icon 📋
   - **Save this in a VERY secure location**

### 3.3 Organize Your Credentials

Create a temporary file or use a notes app to store these:

```
SUPABASE PROJECT CREDENTIALS
============================

Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Database Password: (the one you saved earlier)

⚠️ KEEP THESE SECURE - Delete this file after setup
```

✅ **You have all your API credentials!**

---

## 🗃️ Step 4: Set Up Database Schema

### 4.1 Open SQL Editor

1. **In Supabase Dashboard**, click **"SQL Editor"** in the left sidebar
   - You'll see a list of saved queries (empty for new projects)

2. **Click "New query"** button
   - This opens a SQL editor window

### 4.2 Run First Migration Script

1. **Open the first SQL file in your local project**:
   - Navigate to: `scripts/001_init_database.sql`
   - Open it in your text editor (VS Code, Notepad, etc.)

2. **Copy the entire content**:
   - Select all content (Ctrl+A / Cmd+A)
   - Copy (Ctrl+C / Cmd+C)
   - This file contains ~300 lines of SQL

3. **Paste into Supabase SQL Editor**:
   - Paste the content into the SQL Editor
   - You should see SQL commands starting with `CREATE TABLE...`

4. **Run the script**:
   - Click the **"Run"** button (bottom right) OR
   - Press `Ctrl+Enter` (Windows/Linux) or `Cmd+Enter` (Mac)
   - Wait a few seconds for execution

5. **Check for success**:
   - You should see: ✅ "Success. No rows returned" message
   - If you see errors, check the error message and verify you copied the entire file

### 4.3 Run Second Migration Script

1. **Open the second SQL file**:
   - Navigate to: `scripts/003_locals_1.0_schema.sql`
   - This adds the booking system tables

2. **Copy the entire content**:
   - Select all and copy

3. **In Supabase SQL Editor**:
   - Click "New query" again (or clear the current query)
   - Paste the content

4. **Run the script**:
   - Click "Run" or press `Ctrl+Enter` / `Cmd+Enter`
   - Wait for completion

5. **Verify success**:
   - ✅ "Success. No rows returned" message

### 4.4 Verify Database Tables

1. **Open Table Editor**:
   - Click **"Table Editor"** in the left sidebar
   - You should now see a list of tables

2. **Check for these tables**:
   - ✅ `profiles` - User profiles
   - ✅ `services` - Service listings
   - ✅ `messages` - Direct messages
   - ✅ `ratings` - Ratings and reviews
   - ✅ `favorites` - Saved providers
   - ✅ `service_requests` - Service requests/booking
   - ✅ `payments` - Payment records (for future use)
   - ✅ `notifications` - Notification records (for future use)

✅ **Database schema is set up!**

---

## 🔐 Step 5: Configure Authentication

### 5.1 Open Authentication Settings

1. **Click "Authentication"** in the left sidebar
2. **Click "Settings"** (or go to Authentication → Settings)

### 5.2 Configure URL Settings

1. **Site URL**:
   - Set to: `http://localhost:3000`
   - This is for local development
   - We'll update this later for production

2. **Redirect URLs**:
   - Click "Add URL" or the input field
   - Add these URLs one by one:
     ```
     http://localhost:3000/**
     http://localhost:3000/auth/callback
     ```
   - After each URL, press Enter or click outside to save
   - (We'll add production URLs after Vercel deployment)

3. **Email Settings** (optional for now):
   - Email verification can be enabled later
   - For development, you can disable it temporarily

4. **Click "Save"** button at the bottom

✅ **Authentication is configured!**

---

## 💻 Step 6: Create Local Environment File

### 6.1 Create .env.local File

1. **Navigate to your project root directory**:
   ```bash
   cd C:\Users\sudhanshu\OneDrive\Desktop\locals
   ```

2. **Create `.env.local` file**:
   - In VS Code: Right-click in file explorer → New File → `.env.local`
   - Or use command line:
     ```bash
     # Windows PowerShell
     New-Item -Path .env.local -ItemType File
     
     # Or just create it in your editor
     ```

### 6.2 Add Environment Variables

Open `.env.local` and add your Supabase credentials:

```env
# ============================================================================
# SUPABASE CONFIGURATION
# ============================================================================
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ============================================================================
# APPLICATION CONFIGURATION
# ============================================================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Replace the values**:
- Replace `https://xxxxxxxxxxxxx.supabase.co` with your actual Project URL
- Replace `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` with your actual keys

### 6.3 Verify File is Ignored by Git

1. **Check `.gitignore` file**:
   - Open `.gitignore` in your project
   - It should contain `.env*` which prevents committing environment files

2. **Verify `.env.local` is ignored**:
   ```bash
   git status
   ```
   - `.env.local` should NOT appear in the list
   - If it does, add it to `.gitignore`

✅ **Environment file is created!**

---

## ✅ Step 7: Test Connection Locally

### 7.1 Install Dependencies (if not done)

```bash
pnpm install
# or
npm install
```

### 7.2 Start Development Server

```bash
pnpm dev
# or
npm run dev
```

### 7.3 Test in Browser

1. **Open browser**: [http://localhost:3000](http://localhost:3000)

2. **Test sign up**:
   - Go to `/auth/sign-up`
   - Fill in:
     - Email: `test@example.com`
     - Password: `test123456` (or any password)
   - Click "Sign up"
   - Check browser console for any errors

3. **Verify user created**:
   - Go to Supabase Dashboard → **Authentication** → **Users**
   - You should see your test user in the list

4. **Test login**:
   - Go to `/auth/login`
   - Login with the account you just created
   - Should redirect to location setup or dashboard

✅ **If everything works, Supabase is successfully connected!**

---

## 🎉 Success Checklist

- [ ] Supabase account created
- [ ] Project created and initialized
- [ ] API credentials copied and saved
- [ ] Database migration scripts run successfully
- [ ] All 8 tables visible in Table Editor
- [ ] Authentication settings configured
- [ ] `.env.local` file created with credentials
- [ ] Local development server runs without errors
- [ ] Can sign up a new user
- [ ] User appears in Supabase Dashboard

---

## 🆘 Troubleshooting

### Issue: Project creation is taking too long

**Solution**: 
- Wait 3-5 minutes (normal for first project)
- Refresh the page
- If still loading after 10 minutes, create a new project

### Issue: SQL migration errors

**Solutions**:
- Make sure you copied the ENTIRE file content
- Run scripts in order: `001_init_database.sql` first, then `003_locals_1.0_schema.sql`
- Check for any syntax errors in the error message
- Verify you're using the SQL Editor, not Table Editor

### Issue: Tables not appearing

**Solutions**:
- Refresh the Table Editor page
- Go to Table Editor and click refresh
- Verify migration scripts completed successfully
- Check SQL Editor history to see if scripts ran

### Issue: Authentication not working locally

**Solutions**:
- Verify `.env.local` file exists and has correct values
- Check that environment variables match your Supabase credentials exactly
- Restart your development server after creating `.env.local`
- Check browser console for error messages
- Verify redirect URLs in Supabase Authentication settings

### Issue: Environment variables not loading

**Solutions**:
- Make sure file is named exactly `.env.local` (with the dot at the start)
- Verify file is in the project root directory
- Restart the development server
- Check for typos in variable names (they're case-sensitive)

---

## 📚 Next Steps

After completing Supabase setup:

1. ✅ **Test locally** - Make sure everything works
2. 🚀 **Deploy to Vercel** - See `PRODUCTION_SETUP.md`
3. 🔗 **Connect production** - Update Supabase redirect URLs
4. 🎯 **Continue development** - Start building features

---

**Need help?** Check the troubleshooting section or review the Supabase documentation at [supabase.com/docs](https://supabase.com/docs)

