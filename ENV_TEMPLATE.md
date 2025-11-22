# Environment Variables Template

**Use this as a reference when setting up your environment variables**

---

## 📝 Local Development (.env.local)

Create a `.env.local` file in the project root with the following variables:

```env
# ============================================================================
# SUPABASE CONFIGURATION (REQUIRED)
# ============================================================================
# Get these from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api

NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# ============================================================================
# APPLICATION CONFIGURATION
# ============================================================================
# Your local development URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🚀 Production (Vercel Environment Variables)

Add these in Vercel Dashboard → Your Project → Settings → Environment Variables:

### Required Variables

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key-here
```

### Optional Variables

```
SUPABASE_SERVICE_ROLE_KEY = your-service-role-key-here
NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
```

---

## 🔮 Future Phases (Optional - Not Required Yet)

These will be needed for future phases:

```env
# ============================================================================
# PAYMENT INTEGRATION (Phase 1.0.2)
# ============================================================================
# Get these from: https://dashboard.razorpay.com/app/keys

RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
RAZORPAY_WEBHOOK_SECRET=your-razorpay-webhook-secret

# ============================================================================
# EMAIL SERVICE (Phase 1.0.3)
# ============================================================================
# Get this from: https://resend.com/api-keys

RESEND_API_KEY=your-resend-api-key
FROM_EMAIL=noreply@locals.app

# ============================================================================
# SUPABASE STORAGE (Phase 1.0.4)
# ============================================================================
# Storage bucket name for images/uploads
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=locals-media
```

---

## 🔍 Where to Find These Values

### Supabase Keys

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### Razorpay Keys (Future)

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Go to **Settings** → **API Keys**
3. Copy Key ID and Key Secret

### Resend API Key (Future)

1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Create a new API key
3. Copy the key

---

## ⚠️ Important Notes

1. **Never commit `.env.local` to Git**
   - It's already in `.gitignore`
   - Never share your service role key

2. **Environment Variable Names**
   - Variables starting with `NEXT_PUBLIC_` are exposed to the browser
   - Variables without `NEXT_PUBLIC_` are server-only
   - Be careful what you expose to the client

3. **Production vs Development**
   - Use different Supabase projects for dev/prod (recommended)
   - Or use different environment variables in Vercel

4. **Vercel Auto-detection**
   - Vercel automatically sets `NEXT_PUBLIC_APP_URL`
   - You can override it if needed

---

## ✅ Verification Checklist

After setting up environment variables:

- [ ] `.env.local` created with required variables
- [ ] Supabase URL is correct (check for typos)
- [ ] Supabase keys are correct
- [ ] Local development works (`pnpm dev`)
- [ ] Vercel environment variables added
- [ ] Production deployment works

---

**Last Updated**: January 2025

