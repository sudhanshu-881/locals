-- scripts/007_service_request_updates.sql

-- Add a new column to the service_requests table to track the status of a service request
ALTER TABLE service_requests
ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'pending';
