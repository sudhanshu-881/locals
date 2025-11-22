# Locals App - Quick Start Guide

**Get up and running in 15 minutes**

---

## ⚡ Quick Setup (3 Steps)

### Step 1: Supabase Setup (5 minutes)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com) → New Project
   - Save your project URL and API keys

2. **Run Database Scripts**
   - Open Supabase SQL Editor
   - Run `scripts/001_init_database.sql`
   - Run `scripts/003_locals_1.0_schema.sql`

3. **Configure Authentication**
   - Go to Authentication → URL Configuration
   - Set Site URL: `http://localhost:3000`
   - Add Redirect URL: `http://localhost:3000/**`

**📖 Detailed guide:** See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

---

### Step 2: Local Development (2 minutes)

1. **Install Dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Create Environment File**
   Create `.env.local` in project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Start Development Server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Test Locally**
   - Open [http://localhost:3000](http://localhost:3000)
   - Sign up for a test account
   - Verify everything works

---

### Step 3: Deploy to Production (5 minutes)

1. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) → Import Project
   - Connect your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Click Deploy

2. **Update Supabase Redirect URLs**
   - Add your Vercel URL to Supabase redirect URLs
   - Update Site URL to your production URL

3. **Test Production**
   - Visit your Vercel URL
   - Test sign up/login

**📖 Detailed guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## ✅ You're Done!

Your Locals app is now live! 🎉

---

## 🔧 Troubleshooting

**Can't connect to Supabase?**
- Check your environment variables are correct
- Verify Supabase project is active

**Authentication not working?**
- Check redirect URLs in Supabase settings
- Verify Site URL matches your app URL

**Need more help?**
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed troubleshooting
- Check [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for database issues

---

## 📚 Next Steps

- [ ] Test all features locally
- [ ] Deploy to production
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring
- [ ] Plan Phase 1.0.2 (Payments)

---

**Last Updated**: January 2025

