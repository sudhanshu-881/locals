# Locals 1.0 - Development Plan
**Phase 1: MVP to Market-Ready**  
*Target: Complete transaction loop with booking, payments, and notifications*

---

## Overview

**Locals 1.0 Goal**: Transform the MVP into a market-ready product with complete transaction capabilities.

**Timeline**: 8-10 weeks  
**Team Size**: Full-stack development focus

---

## Phase Breakdown

### **Phase 1.0.1: Booking System** (Weeks 1-3)
**Goal**: Enable seekers to request services from providers

**Features:**
- Service Request Creation
- Request Management Dashboard
- Request Status Tracking (Pending → Accepted → In Progress → Completed)
- Request History

**Deliverables:**
- Service request form/modal
- Provider request inbox
- Request detail pages
- Status update workflow

---

### **Phase 1.0.2: Payment Integration** (Weeks 3-5)
**Goal**: Enable secure payment processing for service bookings

**Features:**
- Payment gateway integration (Razorpay)
- Escrow/advance payment system
- Payment confirmation flow
- Transaction history
- Refund mechanism (basic)

**Deliverables:**
- Razorpay integration
- Payment UI components
- Transaction tracking
- Receipt generation

---

### **Phase 1.0.3: Notifications** (Weeks 5-7)
**Goal**: Keep users engaged with real-time updates

**Features:**
- Push notifications (browser)
- Email notifications (transactional)
- In-app notification center
- Notification preferences

**Deliverables:**
- Push notification service
- Email service integration
- Notification UI components
- Preference management

---

### **Phase 1.0.4: Enhanced Features** (Weeks 7-9)
**Goal**: Improve UX and trust mechanisms

**Features:**
- Image uploads (profile, service photos)
- Geolocation/distance calculation
- Enhanced search with distance
- Basic availability management

**Deliverables:**
- Supabase Storage integration
- Distance calculation service
- Enhanced search UI
- Availability calendar (basic)

---

### **Phase 1.0.5: Testing & Polish** (Weeks 9-10)
**Goal**: Ensure production readiness

**Activities:**
- End-to-end testing
- Bug fixes
- Performance optimization
- Security audit
- Beta user testing

---

## Technical Architecture

### Database Schema Additions

```sql
-- Service Requests Table
CREATE TABLE service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seeker_id UUID NOT NULL REFERENCES profiles(id),
  provider_id UUID NOT NULL REFERENCES profiles(id),
  service_id UUID REFERENCES services(id),
  title TEXT NOT NULL,
  description TEXT,
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  status TEXT CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')),
  scheduled_date TIMESTAMP WITH TIME ZONE,
  amount DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments Table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES service_requests(id),
  payer_id UUID NOT NULL REFERENCES profiles(id),
  payee_id UUID NOT NULL REFERENCES profiles(id),
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_method TEXT,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications Table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### New API Routes

```
/api/requests
  POST   - Create service request
  GET    - List requests (filtered by user role)
  GET    /:id - Get request details
  PATCH  /:id - Update request status
  DELETE /:id - Cancel request

/api/payments
  POST   - Initiate payment
  POST   /verify - Verify payment webhook
  GET    - List user payments
  POST   /refund - Process refund

/api/notifications
  GET    - List user notifications
  PATCH  /:id/read - Mark as read
  PATCH  /read-all - Mark all as read
```

### New Pages/Components

**Pages:**
- `/requests` - Service requests dashboard
- `/requests/[id]` - Request details
- `/payments` - Payment history
- `/notifications` - Notification center

**Components:**
- `RequestForm` - Create service request
- `RequestCard` - Display request
- `PaymentButton` - Payment flow
- `NotificationCenter` - Notification UI
- `ImageUpload` - Profile/service image upload
- `DistanceBadge` - Show distance from user

---

## Dependencies to Add

```json
{
  "razorpay": "^2.9.2",
  "react-dropzone": "^14.2.3",
  "geolib": "^3.3.4",
  "react-calendar": "^4.7.0",
  "web-push": "^3.6.6",
  "nodemailer": "^6.9.7",
  "react-query": "^3.39.3"
}
```

---

## Environment Variables

```env
# Razorpay
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Email (Resend/SendGrid)
RESEND_API_KEY=your_resend_key
FROM_EMAIL=noreply@locals.app

# Supabase Storage
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=locals-media

# App URLs
NEXT_PUBLIC_APP_URL=https://locals.app
```

---

## Success Criteria

**Booking System:**
- ✅ Users can create service requests
- ✅ Providers can accept/reject requests
- ✅ Request status updates in real-time
- ✅ Request history is accessible

**Payment System:**
- ✅ Payments process securely via Razorpay
- ✅ Payment status syncs with requests
- ✅ Transaction history is accurate
- ✅ Refunds can be processed

**Notifications:**
- ✅ Push notifications work on browser
- ✅ Email notifications sent for key events
- ✅ Notification center displays all notifications
- ✅ Users can manage preferences

**Overall:**
- ✅ Complete transaction loop functional
- ✅ End-to-end test passes
- ✅ Performance: < 2s page load
- ✅ Security audit passed
- ✅ Beta users can complete bookings

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Payment gateway integration complexity | Start with Razorpay test mode, thorough testing |
| Notification delivery issues | Use reliable services (Resend for email, service workers for push) |
| Performance issues with image uploads | Implement compression, CDN, lazy loading |
| Real-time updates breaking | Use Supabase subscriptions, fallback polling |

---

## Post-Launch Metrics

Track these metrics after Locals 1.0 launch:
- Service request creation rate
- Request acceptance rate (provider)
- Payment completion rate
- Notification open rate
- User retention (D7, D30)

