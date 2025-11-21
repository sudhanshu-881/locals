-- ============================================================================
-- LOCALS 1.0 - DATABASE SCHEMA ADDITIONS
-- Phase 1.0: Booking System, Payments, Notifications
-- Run this script to add new tables for Locals 1.0 features
-- ============================================================================

-- ============================================================================
-- 1. CREATE SERVICE REQUESTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seeker_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  status TEXT CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
  scheduled_date TIMESTAMP WITH TIME ZONE,
  amount DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on service_requests
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for service_requests
CREATE POLICY "service_requests_select_own"
  ON public.service_requests FOR SELECT
  USING (auth.uid() = seeker_id OR auth.uid() = provider_id);

CREATE POLICY "service_requests_insert_seeker"
  ON public.service_requests FOR INSERT
  WITH CHECK (auth.uid() = seeker_id);

CREATE POLICY "service_requests_update_provider"
  ON public.service_requests FOR UPDATE
  USING (auth.uid() = provider_id OR auth.uid() = seeker_id);

CREATE POLICY "service_requests_delete_own"
  ON public.service_requests FOR DELETE
  USING (auth.uid() = seeker_id);

-- Create indexes for service_requests
CREATE INDEX IF NOT EXISTS service_requests_seeker_idx ON public.service_requests(seeker_id);
CREATE INDEX IF NOT EXISTS service_requests_provider_idx ON public.service_requests(provider_id);
CREATE INDEX IF NOT EXISTS service_requests_status_idx ON public.service_requests(status);
CREATE INDEX IF NOT EXISTS service_requests_created_idx ON public.service_requests(created_at DESC);

-- ============================================================================
-- 2. CREATE PAYMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  payer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  payee_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_method TEXT,
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT UNIQUE,
  razorpay_signature TEXT,
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for payments
CREATE POLICY "payments_select_own"
  ON public.payments FOR SELECT
  USING (auth.uid() = payer_id OR auth.uid() = payee_id);

CREATE POLICY "payments_insert_own"
  ON public.payments FOR INSERT
  WITH CHECK (auth.uid() = payer_id);

-- Note: Payments should not be updated by users directly, only via webhook
CREATE POLICY "payments_update_admin"
  ON public.payments FOR UPDATE
  USING (false); -- Only server-side updates via webhook

-- Create indexes for payments
CREATE INDEX IF NOT EXISTS payments_request_idx ON public.payments(request_id);
CREATE INDEX IF NOT EXISTS payments_payer_idx ON public.payments(payer_id);
CREATE INDEX IF NOT EXISTS payments_payee_idx ON public.payments(payee_id);
CREATE INDEX IF NOT EXISTS payments_status_idx ON public.payments(status);
CREATE INDEX IF NOT EXISTS payments_razorpay_order_idx ON public.payments(razorpay_order_id);

-- ============================================================================
-- 3. CREATE NOTIFICATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('request_created', 'request_accepted', 'request_rejected', 'request_completed', 'payment_received', 'payment_failed', 'message', 'rating', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notifications
CREATE POLICY "notifications_select_own"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "notifications_update_own"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Notifications are inserted by server-side only
CREATE POLICY "notifications_insert_server"
  ON public.notifications FOR INSERT
  WITH CHECK (false); -- Only server-side inserts via triggers/functions

-- Create indexes for notifications
CREATE INDEX IF NOT EXISTS notifications_user_idx ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_read_idx ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS notifications_created_idx ON public.notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_user_unread_idx ON public.notifications(user_id, is_read) WHERE is_read = FALSE;

-- ============================================================================
-- 4. CREATE TRIGGER TO UPDATE SERVICE_REQUEST UPDATED_AT
-- ============================================================================
CREATE OR REPLACE FUNCTION public.update_service_request_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_service_request_updated ON public.service_requests;
CREATE TRIGGER on_service_request_updated
  BEFORE UPDATE ON public.service_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_service_request_updated_at();

-- ============================================================================
-- 5. CREATE TRIGGER TO UPDATE PAYMENT UPDATED_AT
-- ============================================================================
CREATE OR REPLACE FUNCTION public.update_payment_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_payment_updated ON public.payments;
CREATE TRIGGER on_payment_updated
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_payment_updated_at();

-- ============================================================================
-- 6. CREATE FUNCTION TO CREATE NOTIFICATION ON REQUEST STATUS CHANGE
-- ============================================================================
CREATE OR REPLACE FUNCTION public.notify_request_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  notification_title TEXT;
  notification_message TEXT;
  notification_type TEXT;
BEGIN
  -- Only notify on status changes
  IF OLD.status = NEW.status THEN
    RETURN NEW;
  END IF;

  -- Determine notification details based on new status
  CASE NEW.status
    WHEN 'accepted' THEN
      notification_type := 'request_accepted';
      notification_title := 'Request Accepted';
      notification_message := 'Your service request has been accepted by the provider.';
    WHEN 'in_progress' THEN
      notification_type := 'request_completed';
      notification_title := 'Service Started';
      notification_message := 'The provider has started working on your request.';
    WHEN 'completed' THEN
      notification_type := 'request_completed';
      notification_title := 'Service Completed';
      notification_message := 'Your service request has been marked as completed.';
    WHEN 'cancelled' THEN
      notification_type := 'request_rejected';
      notification_title := 'Request Cancelled';
      notification_message := 'Your service request has been cancelled.';
    ELSE
      RETURN NEW;
  END CASE;

  -- Insert notification for seeker
  INSERT INTO public.notifications (user_id, type, title, message, link, metadata)
  VALUES (
    NEW.seeker_id,
    notification_type,
    notification_title,
    notification_message,
    '/requests/' || NEW.id,
    jsonb_build_object('request_id', NEW.id, 'provider_id', NEW.provider_id)
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_request_status_change ON public.service_requests;
CREATE TRIGGER on_request_status_change
  AFTER UPDATE OF status ON public.service_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_request_status_change();

-- ============================================================================
-- 7. CREATE FUNCTION TO NOTIFY ON NEW REQUEST
-- ============================================================================
CREATE OR REPLACE FUNCTION public.notify_new_request()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert notification for provider about new request
  INSERT INTO public.notifications (user_id, type, title, message, link, metadata)
  VALUES (
    NEW.provider_id,
    'request_created',
    'New Service Request',
    'You have received a new service request: ' || NEW.title,
    '/requests/' || NEW.id,
    jsonb_build_object('request_id', NEW.id, 'seeker_id', NEW.seeker_id)
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_new_request ON public.service_requests;
CREATE TRIGGER on_new_request
  AFTER INSERT ON public.service_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_request();

-- ============================================================================
-- 8. CREATE FUNCTION TO NOTIFY ON PAYMENT STATUS CHANGE
-- ============================================================================
CREATE OR REPLACE FUNCTION public.notify_payment_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  notification_title TEXT;
  notification_message TEXT;
BEGIN
  -- Only notify on status changes to completed or failed
  IF OLD.status = NEW.status THEN
    RETURN NEW;
  END IF;

  IF NEW.status = 'completed' THEN
    -- Notify payer (payment successful)
    INSERT INTO public.notifications (user_id, type, title, message, link, metadata)
    VALUES (
      NEW.payer_id,
      'payment_received',
      'Payment Successful',
      'Your payment of ₹' || NEW.amount || ' has been processed successfully.',
      '/payments/' || NEW.id,
      jsonb_build_object('payment_id', NEW.id, 'request_id', NEW.request_id)
    );

    -- Notify payee (payment received)
    INSERT INTO public.notifications (user_id, type, title, message, link, metadata)
    VALUES (
      NEW.payee_id,
      'payment_received',
      'Payment Received',
      'You have received ₹' || NEW.amount || ' for service request.',
      '/payments/' || NEW.id,
      jsonb_build_object('payment_id', NEW.id, 'request_id', NEW.request_id)
    );
  ELSIF NEW.status = 'failed' THEN
    -- Notify payer (payment failed)
    INSERT INTO public.notifications (user_id, type, title, message, link, metadata)
    VALUES (
      NEW.payer_id,
      'payment_failed',
      'Payment Failed',
      'Your payment of ₹' || NEW.amount || ' could not be processed. Please try again.',
      '/requests/' || NEW.request_id,
      jsonb_build_object('payment_id', NEW.id, 'request_id', NEW.request_id)
    );
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_payment_status_change ON public.payments;
CREATE TRIGGER on_payment_status_change
  AFTER UPDATE OF status ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_payment_status_change();

-- ============================================================================
-- SCHEMA ADDITION COMPLETE
-- ============================================================================

