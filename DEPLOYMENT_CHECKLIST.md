# Production Deployment Checklist

**Follow this checklist step-by-step to deploy Locals to production**

---

## 📋 Pre-Deployment Checklist

### Step 1: Supabase Setup

- [ ] **Create Supabase Project**
  - [ ] Go to [supabase.com](https://supabase.com) and create new project
  - [ ] Choose region (recommended: Asia Pacific - Mumbai)
  - [ ] Save database password securely
  - [ ] Wait for project to be ready (2-3 minutes)

- [ ] **Get API Keys**
  - [ ] Go to Settings → API in Supabase Dashboard
  - [ ] Copy Project URL → Save as `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] Copy anon public key → Save as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] Copy service_role key → Save as `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

- [ ] **Run Database Scripts**
  - [ ] Open SQL Editor in Supabase Dashboard
  - [ ] Run `scripts/001_init_database.sql` → ✅ Success
  - [ ] Run `scripts/003_locals_1.0_schema.sql` → ✅ Success
  - [ ] Verify tables created in Table Editor:
    - [ ] `profiles`
    - [ ] `services`
    - [ ] `messages`
    - [ ] `ratings`
    - [ ] `favorites`
    - [ ] `service_requests`
    - [ ] `payments`
    - [ ] `notifications`

- [ ] **Configure Authentication**
  - [ ] Go to Authentication → URL Configuration
  - [ ] Set Site URL: `http://localhost:3000` (update after deployment)
  - [ ] Add Redirect URLs:
    - [ ] `http://localhost:3000/**`
    - [ ] `http://localhost:3000/auth/callback`

---

### Step 2: Local Testing

- [ ] **Setup Local Environment**
  - [ ] Clone repository: `git clone https://github.com/sudhanshu-881/locals.git`
  - [ ] Install dependencies: `pnpm install`
  - [ ] Create `.env.local` file in project root
  - [ ] Add environment variables (see ENV_TEMPLATE.md)

- [ ] **Test Locally**
  - [ ] Start dev server: `pnpm dev`
  - [ ] Open [http://localhost:3000](http://localhost:3000)
  - [ ] Test sign up flow → ✅ Works
  - [ ] Test login flow → ✅ Works
  - [ ] Test profile creation → ✅ Works
  - [ ] Test location setup → ✅ Works
  - [ ] Test service discovery → ✅ Works
  - [ ] Test service request creation → ✅ Works
  - [ ] Test messaging (if implemented) → ✅ Works

- [ ] **Verify Database Connection**
  - [ ] Check Supabase Dashboard → Authentication → Users
  - [ ] See test user created → ✅ Visible
  - [ ] Check Table Editor → profiles table
  - [ ] See profile row for test user → ✅ Visible

---

### Step 3: Prepare for Deployment

- [ ] **Code is Ready**
  - [ ] All changes committed to Git
  - [ ] Pushed to GitHub: `git push origin main`
  - [ ] No build errors locally
  - [ ] No TypeScript errors
  - [ ] No linting errors (or acceptable)

- [ ] **Documentation Updated**
  - [ ] README.md updated
  - [ ] Environment variables documented
  - [ ] Deployment guide ready

---

## 🚀 Deployment Steps

### Step 4: Deploy to Vercel

- [ ] **Create Vercel Project**
  - [ ] Go to [vercel.com](https://vercel.com)
  - [ ] Sign up/Login (use GitHub if possible)
  - [ ] Click "Add New Project"
  - [ ] Import GitHub repository: `sudhanshu-881/locals`
  - [ ] Click "Import"

- [ ] **Configure Project Settings**
  - [ ] Project Name: `locals-app` (or your choice)
  - [ ] Framework Preset: Next.js (auto-detected)
  - [ ] Root Directory: `./` (default)
  - [ ] Build Command: `pnpm build` (or `npm run build`)
  - [ ] Output Directory: `.next` (default)
  - [ ] Install Command: `pnpm install` (or `npm install`)

- [ ] **Add Environment Variables**
  - [ ] Go to Environment Variables section
  - [ ] Add `NEXT_PUBLIC_SUPABASE_URL` = `https://your-project-id.supabase.co`
  - [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `your-anon-key-here`
  - [ ] (Optional) Add `SUPABASE_SERVICE_ROLE_KEY` = `your-service-role-key-here`
  - [ ] Select "Production", "Preview", and "Development" environments
  - [ ] Save environment variables

- [ ] **Deploy**
  - [ ] Click "Deploy" button
  - [ ] Wait for build to complete (2-5 minutes)
  - [ ] Build successful → ✅ No errors
  - [ ] Deployment successful → ✅ Status: Ready

- [ ] **Get Production URL**
  - [ ] Copy Vercel deployment URL (e.g., `https://locals-app.vercel.app`)
  - [ ] Save this URL for next steps

---

### Step 5: Configure Production Settings

- [ ] **Update Supabase Redirect URLs**
  - [ ] Go to Supabase Dashboard → Authentication → URL Configuration
  - [ ] Update Site URL to your Vercel URL: `https://your-app.vercel.app`
  - [ ] Add Redirect URLs:
    - [ ] `https://your-app.vercel.app/**`
    - [ ] `https://your-app.vercel.app/auth/callback`
  - [ ] Save changes

- [ ] **Update Vercel Environment Variables** (if needed)
  - [ ] Go to Vercel Dashboard → Your Project → Settings → Environment Variables
  - [ ] Update `NEXT_PUBLIC_APP_URL` to your production URL (optional, Vercel auto-sets)
  - [ ] Redeploy if you made changes

---

### Step 6: Test Production

- [ ] **Basic Functionality Test**
  - [ ] Visit production URL: `https://your-app.vercel.app`
  - [ ] Page loads → ✅ Works
  - [ ] No console errors → ✅ Check DevTools Console

- [ ] **Authentication Test**
  - [ ] Click "Sign Up" → ✅ Form appears
  - [ ] Create test account → ✅ Success
  - [ ] Check email verification (if enabled) → ✅ Works
  - [ ] Login with test account → ✅ Success
  - [ ] Redirect to dashboard → ✅ Works

- [ ] **Core Features Test**
  - [ ] Profile creation → ✅ Works
  - [ ] Location setup → ✅ Works
  - [ ] Service discovery (`/discover`) → ✅ Works
  - [ ] Provider profiles (`/provider/[id]`) → ✅ Works
  - [ ] Service request creation → ✅ Works
  - [ ] Requests dashboard (`/requests`) → ✅ Works
  - [ ] Request status updates → ✅ Works
  - [ ] Messaging (if implemented) → ✅ Works

- [ ] **Database Verification**
  - [ ] Check Supabase Dashboard → Authentication → Users
  - [ ] See production user → ✅ Visible
  - [ ] Check Table Editor → profiles table
  - [ ] See production profile → ✅ Visible
  - [ ] Check service_requests table
  - [ ] See test request (if created) → ✅ Visible

---

### Step 7: Post-Deployment

- [ ] **Monitor Deployment**
  - [ ] Check Vercel Dashboard → Deployments
  - [ ] Verify deployment is active
  - [ ] Check for any errors or warnings

- [ ] **Set Up Custom Domain** (Optional)
  - [ ] Go to Vercel Dashboard → Settings → Domains
  - [ ] Add your custom domain (e.g., `locals.app`)
  - [ ] Configure DNS records as instructed
  - [ ] Wait for DNS propagation (up to 24 hours)
  - [ ] Update Supabase redirect URLs with custom domain

- [ ] **Set Up Monitoring** (Optional)
  - [ ] Enable Vercel Analytics (if available)
  - [ ] Set up error tracking (e.g., Sentry)
  - [ ] Configure uptime monitoring

---

## ✅ Final Checklist

- [ ] Production URL is working
- [ ] All core features tested and working
- [ ] Authentication works in production
- [ ] Database connections working
- [ ] No console errors
- [ ] No build errors
- [ ] Environment variables configured
- [ ] Supabase redirect URLs updated
- [ ] Custom domain configured (if applicable)
- [ ] Monitoring set up (optional)

---

## 🎉 Deployment Complete!

Your Locals app is now live in production! 🚀

**Next Steps:**
- [ ] Share the production URL with test users
- [ ] Monitor for errors and issues
- [ ] Plan Phase 1.0.2 (Payment Integration)
- [ ] Set up analytics and monitoring

---

## 🆘 Troubleshooting

If something doesn't work:

1. **Check Vercel Deployment Logs**
   - Go to Vercel Dashboard → Deployments → Latest deployment
   - Check build logs for errors

2. **Check Browser Console**
   - Open DevTools → Console tab
   - Look for error messages

3. **Check Supabase Dashboard**
   - Verify project is active (not paused)
   - Check API keys are correct
   - Verify redirect URLs are configured

4. **Common Issues**
   - Build errors → Check environment variables
   - Authentication not working → Check redirect URLs
   - Database errors → Check RLS policies
   - Connection errors → Verify Supabase URL and keys

5. **Get Help**
   - Check [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section
   - Review [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for database issues
   - Check Supabase and Vercel documentation

---

**Last Updated**: January 2025

