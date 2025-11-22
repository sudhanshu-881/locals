# 🚀 Quick Start: Production Deployment

**Fast-track guide to get Locals app live in production**

---

## ⚡ Quick Steps (15-20 minutes)

### 1️⃣ Supabase Setup (5-10 min)

```bash
# 1. Create project at https://supabase.com/dashboard
# 2. Get credentials from Settings → API:
#    - Project URL
#    - anon public key  
#    - service_role key
# 3. Run SQL migrations in SQL Editor:
#    - scripts/001_init_database.sql
#    - scripts/003_locals_1.0_schema.sql
```

### 2️⃣ Local Testing (3-5 min)

```bash
# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF

# Install and test
pnpm install
pnpm dev
# Test at http://localhost:3000
```

### 3️⃣ Vercel Deployment (5-7 min)

```bash
# 1. Go to https://vercel.com/dashboard
# 2. Import GitHub repo: sudhanshu-881/locals
# 3. Add environment variables:
#    - NEXT_PUBLIC_SUPABASE_URL
#    - NEXT_PUBLIC_SUPABASE_ANON_KEY
#    - SUPABASE_SERVICE_ROLE_KEY
# 4. Deploy!
```

### 4️⃣ Connect Supabase to Production (2-3 min)

```bash
# 1. In Supabase: Authentication → Settings
# 2. Add redirect URLs:
#    - https://your-app.vercel.app/**
#    - https://your-app.vercel.app/auth/callback
# 3. Update Site URL to production URL
```

---

## 📝 Environment Variables Checklist

Add these to Vercel (Settings → Environment Variables):

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `NEXT_PUBLIC_APP_URL` (auto-filled after deploy)

---

## ✅ Final Verification

- [ ] Production URL accessible
- [ ] Can sign up new account
- [ ] Can login
- [ ] Dashboard loads
- [ ] Data saves to Supabase

---

**For detailed instructions, see `PRODUCTION_SETUP.md`**

