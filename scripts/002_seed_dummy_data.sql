-- Locals App - Dummy Data for Indian Metro Cities
-- This script populates the database with realistic test data

-- Temporarily disable foreign key constraints to allow data insertion
ALTER TABLE profiles DISABLE TRIGGER ALL;
ALTER TABLE services DISABLE TRIGGER ALL;
ALTER TABLE messages DISABLE TRIGGER ALL;
ALTER TABLE ratings DISABLE TRIGGER ALL;
ALTER TABLE favorites DISABLE TRIGGER ALL;

-- Clear existing data (optional - comment out if you want to keep existing data)
-- DELETE FROM favorites;
-- DELETE FROM ratings;
-- DELETE FROM messages;
-- DELETE FROM services;
-- DELETE FROM profiles;

-- ============================================================================
-- DELHI PROVIDERS
-- ============================================================================

INSERT INTO profiles (id, email, first_name, last_name, avatar_url, bio, phone, latitude, longitude, address, city, state, zip_code, skills, hourly_rate, rating_avg, total_ratings, is_verified, is_admin, user_type, created_at, updated_at)
VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'rajesh.plumber@locals.test', 'Rajesh', 'Kumar', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh', 'Expert plumber with 15 years experience in Delhi', '+91-9876543210', 28.7041, 77.1025, 'Sector 12, Dwarka', 'Delhi', 'Delhi', '110075', 'Plumbing,Pipe Repair,Water Tank Installation', 500, 4.8, 45, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'amit.electrician@locals.test', 'Amit', 'Singh', 'https://api.dicebear.com/7.x/avataaars/svg?seed=amit', 'Licensed electrician specializing in home wiring', '+91-9876543211', 28.6139, 77.2090, 'Connaught Place', 'Delhi', 'Delhi', '110001', 'Electrical Work,Wiring,Panel Installation', 600, 4.9, 52, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'priya.tutor@locals.test', 'Priya', 'Sharma', 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya', 'Mathematics and Science tutor for classes 6-12', '+91-9876543212', 28.5355, 77.3910, 'Lajpat Nagar', 'Delhi', 'Delhi', '110024', 'Tutoring,Mathematics,Science', 400, 4.7, 38, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440004', 'vikram.carpenter@locals.test', 'Vikram', 'Patel', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram', 'Skilled carpenter for furniture and home renovation', '+91-9876543213', 28.4595, 77.0266, 'Rohini', 'Delhi', 'Delhi', '110085', 'Carpentry,Furniture,Home Renovation', 700, 4.6, 41, true, false, 'service_provider', NOW(), NOW()),

-- ============================================================================
-- MUMBAI PROVIDERS
-- ============================================================================

('550e8400-e29b-41d4-a716-446655440005', 'suresh.ac@locals.test', 'Suresh', 'Desai', 'https://api.dicebear.com/7.x/avataaars/svg?seed=suresh', 'AC repair and maintenance specialist', '+91-9876543214', 19.0760, 72.8777, 'Bandra', 'Mumbai', 'Maharashtra', '400050', 'AC Repair,Maintenance,Installation', 800, 4.8, 48, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440006', 'neha.designer@locals.test', 'Neha', 'Gupta', 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha', 'Interior designer with modern aesthetic', '+91-9876543215', 19.1136, 72.8697, 'Fort', 'Mumbai', 'Maharashtra', '400001', 'Interior Design,Space Planning,Decoration', 1000, 4.9, 55, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440007', 'arjun.fitness@locals.test', 'Arjun', 'Reddy', 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun', 'Personal fitness trainer and nutritionist', '+91-9876543216', 19.0176, 72.8479, 'Colaba', 'Mumbai', 'Maharashtra', '400005', 'Fitness Training,Nutrition,Yoga', 900, 4.7, 42, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440008', 'kavya.photography@locals.test', 'Kavya', 'Nair', 'https://api.dicebear.com/7.x/avataaars/svg?seed=kavya', 'Professional photographer for events and portraits', '+91-9876543217', 19.2183, 72.9781, 'Andheri', 'Mumbai', 'Maharashtra', '400069', 'Photography,Videography,Editing', 1200, 4.8, 50, true, false, 'service_provider', NOW(), NOW()),

-- ============================================================================
-- BANGALORE PROVIDERS
-- ============================================================================

('550e8400-e29b-41d4-a716-446655440009', 'ravi.plumber@locals.test', 'Ravi', 'Kumar', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ravi', 'Experienced plumber in Bangalore', '+91-9876543218', 12.9716, 77.5946, 'Indiranagar', 'Bangalore', 'Karnataka', '560038', 'Plumbing,Repairs,Installation', 450, 4.6, 35, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440010', 'deepak.painter@locals.test', 'Deepak', 'Singh', 'https://api.dicebear.com/7.x/avataaars/svg?seed=deepak', 'Professional painter with 10 years experience', '+91-9876543219', 12.9352, 77.6245, 'Koramangala', 'Bangalore', 'Karnataka', '560034', 'Painting,Wall Finishing,Texture', 550, 4.7, 40, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440011', 'sneha.yoga@locals.test', 'Sneha', 'Verma', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha', 'Certified yoga instructor and wellness coach', '+91-9876543220', 12.9698, 77.7499, 'Whitefield', 'Bangalore', 'Karnataka', '560066', 'Yoga,Meditation,Wellness', 600, 4.9, 48, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440012', 'arun.mechanic@locals.test', 'Arun', 'Rao', 'https://api.dicebear.com/7.x/avataaars/svg?seed=arun', 'Certified auto mechanic for all car models', '+91-9876543221', 12.8395, 77.6245, 'Marathahalli', 'Bangalore', 'Karnataka', '560037', 'Auto Repair,Maintenance,Diagnostics', 700, 4.8, 44, true, false, 'service_provider', NOW(), NOW()),

-- ============================================================================
-- HYDERABAD PROVIDERS
-- ============================================================================

('550e8400-e29b-41d4-a716-446655440013', 'sanjay.electrician@locals.test', 'Sanjay', 'Reddy', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sanjay', 'Licensed electrician in Hyderabad', '+91-9876543222', 17.3850, 78.4867, 'Banjara Hills', 'Hyderabad', 'Telangana', '500034', 'Electrical,Wiring,Solar Installation', 550, 4.7, 39, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440014', 'anjali.tutor@locals.test', 'Anjali', 'Sharma', 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali', 'English and Hindi language tutor', '+91-9876543223', 17.3645, 78.4735, 'Jubilee Hills', 'Hyderabad', 'Telangana', '500033', 'Language Tutoring,English,Hindi', 350, 4.8, 46, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440015', 'mohit.cleaning@locals.test', 'Mohit', 'Verma', 'https://api.dicebear.com/7.x/avataaars/svg?seed=mohit', 'Professional cleaning and housekeeping services', '+91-9876543224', 17.4009, 78.4772, 'Madhapur', 'Hyderabad', 'Telangana', '500081', 'Cleaning,Housekeeping,Maintenance', 300, 4.6, 52, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440016', 'divya.makeup@locals.test', 'Divya', 'Patel', 'https://api.dicebear.com/7.x/avataaars/svg?seed=divya', 'Professional makeup artist for events', '+91-9876543225', 17.3850, 78.4867, 'Kondapur', 'Hyderabad', 'Telangana', '500084', 'Makeup,Bridal,Event Styling', 800, 4.9, 51, true, false, 'service_provider', NOW(), NOW()),

-- ============================================================================
-- CHENNAI PROVIDERS
-- ============================================================================

('550e8400-e29b-41d4-a716-446655440017', 'kumar.plumber@locals.test', 'Kumar', 'Iyer', 'https://api.dicebear.com/7.x/avataaars/svg?seed=kumar', 'Plumbing expert in Chennai', '+91-9876543226', 13.0827, 80.2707, 'Mylapore', 'Chennai', 'Tamil Nadu', '600004', 'Plumbing,Water Systems,Repairs', 400, 4.7, 37, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440018', 'lakshmi.cooking@locals.test', 'Lakshmi', 'Krishnan', 'https://api.dicebear.com/7.x/avataaars/svg?seed=lakshmi', 'Professional cooking classes and catering', '+91-9876543227', 13.0499, 80.2485, 'T. Nagar', 'Chennai', 'Tamil Nadu', '600017', 'Cooking Classes,Catering,Meal Prep', 500, 4.8, 43, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440019', 'rajesh.ac@locals.test', 'Rajesh', 'Murthy', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh2', 'AC and refrigeration specialist', '+91-9876543228', 13.1939, 80.1176, 'Velachery', 'Chennai', 'Tamil Nadu', '600042', 'AC Repair,Refrigeration,Maintenance', 650, 4.6, 40, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440020', 'priya.dance@locals.test', 'Priya', 'Nair', 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya2', 'Classical and contemporary dance instructor', '+91-9876543229', 13.0827, 80.2707, 'Adyar', 'Chennai', 'Tamil Nadu', '600020', 'Dance,Bharatanatyam,Fitness', 550, 4.9, 49, true, false, 'service_provider', NOW(), NOW()),

-- ============================================================================
-- KOLKATA PROVIDERS
-- ============================================================================

('550e8400-e29b-41d4-a716-446655440021', 'ashok.carpenter@locals.test', 'Ashok', 'Banerjee', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ashok', 'Skilled carpenter in Kolkata', '+91-9876543230', 22.5726, 88.3639, 'Ballygunge', 'Kolkata', 'West Bengal', '700019', 'Carpentry,Furniture,Repairs', 500, 4.7, 38, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440022', 'meera.tutor@locals.test', 'Meera', 'Dutta', 'https://api.dicebear.com/7.x/avataaars/svg?seed=meera', 'Physics and Chemistry tutor', '+91-9876543231', 22.5597, 88.3482, 'Alipore', 'Kolkata', 'West Bengal', '700027', 'Tutoring,Physics,Chemistry', 450, 4.8, 44, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440023', 'sunil.painter@locals.test', 'Sunil', 'Ghosh', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sunil', 'Professional painter and decorator', '+91-9876543232', 22.5773, 88.3792, 'Park Circus', 'Kolkata', 'West Bengal', '700017', 'Painting,Decoration,Wall Art', 450, 4.6, 36, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440024', 'anjana.beauty@locals.test', 'Anjana', 'Roy', 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjana', 'Beauty and skincare specialist', '+91-9876543233', 22.5645, 88.3631, 'Kalighat', 'Kolkata', 'West Bengal', '700026', 'Beauty,Skincare,Makeup', 600, 4.9, 50, true, false, 'service_provider', NOW(), NOW()),

-- ============================================================================
-- PUNE PROVIDERS
-- ============================================================================

('550e8400-e29b-41d4-a716-446655440025', 'nikhil.electrician@locals.test', 'Nikhil', 'Joshi', 'https://api.dicebear.com/7.x/avataaars/svg?seed=nikhil', 'Electrician with solar expertise', '+91-9876543234', 18.5204, 73.8567, 'Koregaon Park', 'Pune', 'Maharashtra', '411001', 'Electrical,Solar,Maintenance', 600, 4.8, 42, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440026', 'pooja.fitness@locals.test', 'Pooja', 'Kulkarni', 'https://api.dicebear.com/7.x/avataaars/svg?seed=pooja', 'Fitness trainer and nutritionist', '+91-9876543235', 18.5195, 73.9042, 'Viman Nagar', 'Pune', 'Maharashtra', '411014', 'Fitness,Nutrition,Yoga', 700, 4.7, 45, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440027', 'rahul.plumber@locals.test', 'Rahul', 'Deshmukh', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul', 'Plumbing and water system expert', '+91-9876543236', 18.5344, 73.8993, 'Hadapsar', 'Pune', 'Maharashtra', '411028', 'Plumbing,Water Systems,Repairs', 500, 4.6, 39, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440028', 'shruti.tutor@locals.test', 'Shruti', 'Sharma', 'https://api.dicebear.com/7.x/avataaars/svg?seed=shruti', 'Mathematics and competitive exam tutor', '+91-9876543237', 18.5204, 73.8567, 'Baner', 'Pune', 'Maharashtra', '411045', 'Tutoring,Mathematics,Competitive Exams', 550, 4.9, 48, true, false, 'service_provider', NOW(), NOW()),

-- ============================================================================
-- AHMEDABAD PROVIDERS
-- ============================================================================

('550e8400-e29b-41d4-a716-446655440029', 'vikram.ac@locals.test', 'Vikram', 'Patel', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram2', 'AC repair and maintenance', '+91-9876543238', 23.0225, 72.5714, 'Ahmedabad', 'Ahmedabad', 'Gujarat', '380001', 'AC Repair,Maintenance,Installation', 550, 4.7, 41, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440030', 'neha.tutor@locals.test', 'Neha', 'Joshi', 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha2', 'English language and communication tutor', '+91-9876543239', 23.0330, 72.5198, 'Ahmedabad', 'Ahmedabad', 'Gujarat', '380015', 'Tutoring,English,Communication', 400, 4.8, 47, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440031', 'arjun.carpenter@locals.test', 'Arjun', 'Desai', 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun2', 'Carpenter and furniture maker', '+91-9876543240', 23.0225, 72.5714, 'Ahmedabad', 'Ahmedabad', 'Gujarat', '380009', 'Carpentry,Furniture,Repairs', 600, 4.6, 38, true, false, 'service_provider', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440032', 'divya.cleaning@locals.test', 'Divya', 'Sharma', 'https://api.dicebear.com/7.x/avataaars/svg?seed=divya2', 'Professional cleaning services', '+91-9876543241', 23.0330, 72.5198, 'Ahmedabad', 'Ahmedabad', 'Gujarat', '380006', 'Cleaning,Housekeeping,Maintenance', 350, 4.9, 53, true, false, 'service_provider', NOW(), NOW()),

-- ============================================================================
-- SERVICE SEEKERS (across different cities)
-- ============================================================================

('550e8400-e29b-41d4-a716-446655440033', 'seeker1@locals.test', 'Rohan', 'Verma', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohan', 'Looking for home services in Delhi', '+91-9876543242', 28.6139, 77.2090, 'New Delhi', 'Delhi', 'Delhi', '110001', '', 0, 0, 0, true, false, 'service_seeker', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440034', 'seeker2@locals.test', 'Anjali', 'Desai', 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali2', 'Need fitness and wellness services', '+91-9876543243', 19.0760, 72.8777, 'Mumbai', 'Mumbai', 'Maharashtra', '400050', '', 0, 0, 0, true, false, 'service_seeker', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440035', 'seeker3@locals.test', 'Arjun', 'Nair', 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun3', 'Looking for tutoring services', '+91-9876543244', 12.9716, 77.5946, 'Bangalore', 'Bangalore', 'Karnataka', '560038', '', 0, 0, 0, true, false, 'service_seeker', NOW(), NOW());

-- ============================================================================
-- SERVICES
-- ============================================================================

INSERT INTO services (id, provider_id, service_name, description, category, price_per_hour, created_at, updated_at)
VALUES
-- Delhi Services
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Pipe Repair', 'Quick and reliable pipe repair service', 'Plumbing', 500, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Water Tank Installation', 'Professional water tank installation', 'Plumbing', 600, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'Home Wiring', 'Complete home electrical wiring', 'Electrical', 600, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'Panel Installation', 'Electrical panel installation and repair', 'Electrical', 700, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', 'Math Tutoring', 'One-on-one mathematics tutoring', 'Education', 400, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440003', 'Science Tutoring', 'Science classes for school students', 'Education', 400, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440004', 'Furniture Making', 'Custom furniture design and making', 'Carpentry', 700, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440004', 'Home Renovation', 'Complete home renovation services', 'Carpentry', 800, NOW(), NOW()),

-- Mumbai Services
('650e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440005', 'AC Repair', 'Air conditioner repair and maintenance', 'AC Services', 800, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440005', 'AC Installation', 'Professional AC installation', 'AC Services', 900, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440006', 'Interior Design', 'Modern interior design consultation', 'Design', 1000, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440006', 'Space Planning', 'Professional space planning services', 'Design', 1200, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440007', 'Personal Training', 'One-on-one fitness training', 'Fitness', 900, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440007', 'Nutrition Consultation', 'Personalized nutrition planning', 'Fitness', 800, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440008', 'Event Photography', 'Professional event photography', 'Photography', 1200, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440008', 'Portrait Session', 'Professional portrait photography', 'Photography', 1000, NOW(), NOW()),

-- Bangalore Services
('650e8400-e29b-41d4-a716-446655440017', '550e8400-e29b-41d4-a716-446655440009', 'Plumbing Repair', 'Quick plumbing repairs', 'Plumbing', 450, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440018', '550e8400-e29b-41d4-a716-446655440009', 'Water System Installation', 'Water system installation', 'Plumbing', 550, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440019', '550e8400-e29b-41d4-a716-446655440010', 'Interior Painting', 'Professional interior painting', 'Painting', 550, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440010', 'Exterior Painting', 'Exterior wall painting', 'Painting', 600, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440011', 'Yoga Classes', 'Regular yoga classes', 'Wellness', 600, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440011', 'Meditation Sessions', 'Guided meditation sessions', 'Wellness', 500, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440012', 'Car Repair', 'General car repair and maintenance', 'Auto', 700, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440024', '550e8400-e29b-41d4-a716-446655440012', 'Car Diagnostics', 'Car diagnostics and troubleshooting', 'Auto', 600, NOW(), NOW()),

-- Hyderabad Services
('650e8400-e29b-41d4-a716-446655440025', '550e8400-e29b-41d4-a716-446655440013', 'Electrical Wiring', 'Home electrical wiring', 'Electrical', 550, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440026', '550e8400-e29b-41d4-a716-446655440013', 'Solar Installation', 'Solar panel installation', 'Electrical', 800, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440027', '550e8400-e29b-41d4-a716-446655440014', 'English Tutoring', 'English language tutoring', 'Education', 350, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440028', '550e8400-e29b-41d4-a716-446655440014', 'Hindi Tutoring', 'Hindi language tutoring', 'Education', 350, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440029', '550e8400-e29b-41d4-a716-446655440015', 'House Cleaning', 'Professional house cleaning', 'Cleaning', 300, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440015', 'Deep Cleaning', 'Deep cleaning service', 'Cleaning', 400, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440016', 'Bridal Makeup', 'Professional bridal makeup', 'Beauty', 800, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440016', 'Event Makeup', 'Event makeup services', 'Beauty', 700, NOW(), NOW()),

-- Chennai Services
('650e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440017', 'Plumbing Services', 'General plumbing services', 'Plumbing', 400, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440034', '550e8400-e29b-41d4-a716-446655440017', 'Water Repair', 'Water system repair', 'Plumbing', 450, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440035', '550e8400-e29b-41d4-a716-446655440018', 'Cooking Classes', 'Professional cooking classes', 'Cooking', 500, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440036', '550e8400-e29b-41d4-a716-446655440018', 'Catering Services', 'Event catering services', 'Cooking', 600, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440037', '550e8400-e29b-41d4-a716-446655440019', 'AC Maintenance', 'AC maintenance and repair', 'AC Services', 650, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440038', '550e8400-e29b-41d4-a716-446655440019', 'Refrigeration Repair', 'Refrigerator repair services', 'AC Services', 600, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440039', '550e8400-e29b-41d4-a716-446655440020', 'Dance Classes', 'Classical dance classes', 'Dance', 550, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440020', 'Fitness Dance', 'Fitness dance classes', 'Dance', 500, NOW(), NOW()),

-- Kolkata Services
('650e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440021', 'Carpentry Work', 'General carpentry services', 'Carpentry', 500, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440021', 'Furniture Repair', 'Furniture repair and restoration', 'Carpentry', 450, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440043', '550e8400-e29b-41d4-a716-446655440022', 'Physics Tutoring', 'Physics tutoring for students', 'Education', 450, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440044', '550e8400-e29b-41d4-a716-446655440022', 'Chemistry Tutoring', 'Chemistry tutoring services', 'Education', 450, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440045', '550e8400-e29b-41d4-a716-446655440023', 'Interior Painting', 'Interior painting services', 'Painting', 450, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440046', '550e8400-e29b-41d4-a716-446655440023', 'Wall Decoration', 'Wall decoration and art', 'Painting', 500, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440047', '550e8400-e29b-41d4-a716-446655440024', 'Beauty Services', 'General beauty services', 'Beauty', 600, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440048', '550e8400-e29b-41d4-a716-446655440024', 'Skincare', 'Professional skincare services', 'Beauty', 700, NOW(), NOW()),

-- Pune Services
('650e8400-e29b-41d4-a716-446655440049', '550e8400-e29b-41d4-a716-446655440025', 'Electrical Services', 'General electrical services', 'Electrical', 600, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440025', 'Solar Setup', 'Solar system setup', 'Electrical', 800, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440026', 'Fitness Training', 'Personal fitness training', 'Fitness', 700, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440052', '550e8400-e29b-41d4-a716-446655440026', 'Nutrition Planning', 'Personalized nutrition plans', 'Fitness', 600, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440053', '550e8400-e29b-41d4-a716-446655440027', 'Plumbing Repair', 'Plumbing repair services', 'Plumbing', 500, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440054', '550e8400-e29b-41d4-a716-446655440027', 'Water System', 'Water system services', 'Plumbing', 550, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440055', '550e8400-e29b-41d4-a716-446655440028', 'Math Tutoring', 'Mathematics tutoring', 'Education', 550, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440056', '550e8400-e29b-41d4-a716-446655440028', 'Exam Preparation', 'Competitive exam preparation', 'Education', 600, NOW(), NOW()),

-- Ahmedabad Services
('650e8400-e29b-41d4-a716-446655440057', '550e8400-e29b-41d4-a716-446655440029', 'AC Repair', 'Air conditioner repair', 'AC Services', 550, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440058', '550e8400-e29b-41d4-a716-446655440029', 'AC Maintenance', 'AC maintenance services', 'AC Services', 600, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440059', '550e8400-e29b-41d4-a716-446655440030', 'English Tutoring', 'English language tutoring', 'Education', 400, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440060', '550e8400-e29b-41d4-a716-446655440030', 'Communication Skills', 'Communication skills training', 'Education', 450, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440061', '550e8400-e29b-41d4-a716-446655440031', 'Carpentry Services', 'General carpentry services', 'Carpentry', 600, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440062', '550e8400-e29b-41d4-a716-446655440031', 'Furniture Making', 'Custom furniture making', 'Carpentry', 700, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440063', '550e8400-e29b-41d4-a716-446655440032', 'House Cleaning', 'Professional house cleaning', 'Cleaning', 350, NOW(), NOW()),
('650e8400-e29b-41d4-a716-446655440064', '550e8400-e29b-41d4-a716-446655440032', 'Office Cleaning', 'Office cleaning services', 'Cleaning', 400, NOW(), NOW());

-- ============================================================================
-- RATINGS AND REVIEWS
-- ============================================================================

INSERT INTO ratings (id, provider_id, seeker_id, rating, review, created_at, updated_at)
VALUES
('750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440033', 5, 'Excellent plumbing work! Very professional and on time.', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440034', 5, 'Great service, highly recommended!', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440033', 5, 'Very skilled electrician, fixed everything perfectly.', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440035', 5, 'Amazing tutor! My child improved significantly.', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440033', 5, 'Beautiful furniture work, very creative!', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440034', 5, 'AC repair was quick and efficient.', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440034', 5, 'Fantastic interior design! Transformed my space.', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440034', 5, 'Best fitness trainer ever! Very motivating.', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440034', 5, 'Professional photographer, amazing photos!', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440035', 5, 'Reliable plumber, fixed the issue immediately.', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440035', 5, 'Excellent painting work, very neat!', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440035', 5, 'Great yoga instructor, very peaceful classes.', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440035', 5, 'Expert mechanic, knows his work well.', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440033', 5, 'Professional electrician, very reliable.', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440033', 5, 'Excellent tutor, very patient and knowledgeable.', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440033', 5, 'Very thorough cleaning service!', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440017', '550e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440033', 5, 'Beautiful makeup work, looked amazing!', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440018', '550e8400-e29b-41d4-a716-446655440017', '550e8400-e29b-41d4-a716-446655440034', 5, 'Quick and efficient plumbing service.', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440019', '550e8400-e29b-41d4-a716-446655440018', '550e8400-e29b-41d4-a716-446655440034', 5, 'Delicious cooking classes, learned so much!', NOW(), NOW()),
('750e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440019', '550e8400-e29b-41d4-a716-446655440034', 5, 'Expert AC repair, very professional.', NOW(), NOW());

-- ============================================================================
-- MESSAGES
-- ============================================================================

INSERT INTO messages (id, sender_id, recipient_id, content, is_read, created_at, updated_at)
VALUES
('850e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440001', 'Hi, I need plumbing work done. Are you available?', true, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('850e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440033', 'Yes, I am available. What is the issue?', true, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('850e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440001', 'Water is leaking from the kitchen tap. Can you fix it?', true, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('850e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440033', 'Sure, I can fix that. When would you like me to come?', true, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('850e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440034', '550e8400-e29b-41d4-a716-446655440005', 'Hi, interested in your interior design services', true, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('850e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440034', 'Hello! Yes, I would love to help. Tell me about your space.', true, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('850e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440034', '550e8400-e29b-41d4-a716-446655440005', 'I have a 2BHK apartment that needs redesigning', true, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('850e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440034', 'Great! I can definitely help. Let me know your budget and style preference.', true, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('850e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440035', '550e8400-e29b-41d4-a716-446655440011', 'Hi, I want to join your yoga classes', false, NOW() - INTERVAL '6 hours', NOW() - INTERVAL '6 hours'),
('850e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440035', 'Welcome! We have classes every morning and evening. Which time suits you?', false, NOW() - INTERVAL '5 hours', NOW() - INTERVAL '5 hours'),
('850e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440035', '550e8400-e29b-41d4-a716-446655440011', 'Morning classes would be perfect for me', false, NOW() - INTERVAL '4 hours', NOW() - INTERVAL '4 hours'),
('850e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440035', 'Perfect! Classes start at 6 AM. See you tomorrow!', false, NOW() - INTERVAL '3 hours', NOW() - INTERVAL '3 hours'),
('850e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440002', 'Need electrical work done in my home', false, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours'),
('850e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440033', 'Hi! What kind of electrical work do you need?', false, NOW() - INTERVAL '1 hour', NOW() - INTERVAL '1 hour'),
('850e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440002', 'Need to install new switches and fix some wiring', false, NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '30 minutes'),
('850e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440033', 'I can help with that. Can you send me your address?', false, NOW() - INTERVAL '15 minutes', NOW() - INTERVAL '15 minutes');

-- Re-enable foreign key constraints
ALTER TABLE profiles ENABLE TRIGGER ALL;
ALTER TABLE services ENABLE TRIGGER ALL;
ALTER TABLE messages ENABLE TRIGGER ALL;
ALTER TABLE ratings ENABLE TRIGGER ALL;
ALTER TABLE favorites ENABLE TRIGGER ALL;

-- Update profile ratings based on ratings table
UPDATE profiles SET 
  rating_avg = (SELECT COALESCE(AVG(rating), 0) FROM ratings WHERE provider_id = profiles.id),
  total_ratings = (SELECT COUNT(*) FROM ratings WHERE provider_id = profiles.id)
WHERE user_type = 'service_provider';

-- Verify data insertion
SELECT 'Profiles' as table_name, COUNT(*) as count FROM profiles
UNION ALL
SELECT 'Services', COUNT(*) FROM services
UNION ALL
SELECT 'Ratings', COUNT(*) FROM ratings
UNION ALL
SELECT 'Messages', COUNT(*) FROM messages;
