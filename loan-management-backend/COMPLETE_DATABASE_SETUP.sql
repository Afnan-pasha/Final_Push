-- Complete Database Setup Script for Loan Management System
-- Run this script to create all necessary tables and relationships

-- Drop existing tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS existing_loans CASCADE;
DROP TABLE IF EXISTS references CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS loan_applications CASCADE;

-- Create loan_applications table (main table)
CREATE TABLE loan_applications (
    id BIGSERIAL PRIMARY KEY,
    loan_type VARCHAR(255) NOT NULL,
    loan_amount DECIMAL(15,2) NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL,
    loan_term_months INTEGER NOT NULL,
    monthly_emi DECIMAL(15,2),
    total_amount DECIMAL(15,2),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    purpose TEXT,
    collateral TEXT,
    application_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    approval_date TIMESTAMP,
    rejection_reason TEXT,
    maker_comments TEXT,
    checker_comments TEXT,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create references table
CREATE TABLE references (
    id BIGSERIAL PRIMARY KEY,
    loan_application_id BIGINT NOT NULL REFERENCES loan_applications(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    relationship VARCHAR(50) NOT NULL,
    contact_number VARCHAR(15) NOT NULL,
    address VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create existing_loans table
CREATE TABLE existing_loans (
    id BIGSERIAL PRIMARY KEY,
    loan_application_id BIGINT NOT NULL REFERENCES loan_applications(id) ON DELETE CASCADE,
    loan_type VARCHAR(50) NOT NULL,
    lender VARCHAR(100) NOT NULL,
    outstanding_amount DECIMAL(15,2) NOT NULL,
    emi DECIMAL(10,2) NOT NULL,
    tenure_months INTEGER NOT NULL,
    remaining_months INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP
);

-- Create documents table
CREATE TABLE documents (
    id BIGSERIAL PRIMARY KEY,
    loan_application_id BIGINT REFERENCES loan_applications(id) ON DELETE CASCADE,
    document_name VARCHAR(255) NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_references_loan_application_id ON references(loan_application_id);
CREATE INDEX idx_existing_loans_loan_application_id ON existing_loans(loan_application_id);
CREATE INDEX idx_documents_loan_application_id ON documents(loan_application_id);
CREATE INDEX idx_loan_applications_status ON loan_applications(status);
CREATE INDEX idx_loan_applications_application_date ON loan_applications(application_date);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- Insert sample loan applications for testing
INSERT INTO loan_applications (loan_type, loan_amount, interest_rate, loan_term_months, monthly_emi, total_amount, status, purpose, collateral) VALUES
('Personal Loan', 50000.00, 12.50, 24, 2347.07, 56329.68, 'PENDING', 'Home renovation', 'None'),
('Car Loan', 300000.00, 8.50, 60, 6129.83, 367789.80, 'APPROVED', 'Vehicle purchase', 'Vehicle'),
('Home Loan', 2500000.00, 7.25, 240, 18737.66, 4497039.36, 'UNDER_REVIEW', 'House purchase', 'Property'),
('Business Loan', 1000000.00, 10.75, 84, 15234.56, 1279703.04, 'PENDING', 'Business expansion', 'Business assets');

-- Insert sample references
INSERT INTO references (loan_application_id, name, relationship, contact_number, address) VALUES
(1, 'John Smith', 'Friend', '9876543210', '123 Main St, City'),
(1, 'Jane Doe', 'Colleague', '9876543211', '456 Oak Ave, City'),
(2, 'Robert Johnson', 'Brother', '9876543212', '789 Pine St, City'),
(3, 'Mary Wilson', 'Sister', '9876543213', '321 Elm St, City');

-- Insert sample existing loans
INSERT INTO existing_loans (loan_application_id, loan_type, lender, outstanding_amount, emi, tenure_months, remaining_months) VALUES
(1, 'Credit Card', 'HDFC Bank', 25000.00, 2500.00, 12, 8),
(2, 'Personal Loan', 'SBI', 150000.00, 8500.00, 36, 18),
(3, 'Car Loan', 'ICICI Bank', 400000.00, 12000.00, 60, 42);

-- Insert sample notifications
INSERT INTO notifications (title, message, type, is_read) VALUES
('Loan Application Submitted', 'Your personal loan application has been submitted successfully.', 'LOAN_APPLICATION', false),
('Loan Approved', 'Congratulations! Your car loan has been approved.', 'LOAN_APPROVAL', false),
('Document Required', 'Please upload income proof for your home loan application.', 'GENERAL', true),
('Application Under Review', 'Your home loan application is currently under review.', 'LOAN_APPLICATION', false);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to all tables with updated_at column
CREATE TRIGGER update_loan_applications_updated_at BEFORE UPDATE ON loan_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_references_updated_at BEFORE UPDATE ON references FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_existing_loans_updated_at BEFORE UPDATE ON existing_loans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Verify tables were created successfully
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_name IN ('loan_applications', 'references', 'existing_loans', 'notifications', 'documents')
ORDER BY table_name;

-- Show table row counts
SELECT 
    'loan_applications' as table_name, COUNT(*) as row_count FROM loan_applications
UNION ALL
SELECT 
    'references' as table_name, COUNT(*) as row_count FROM references
UNION ALL
SELECT 
    'existing_loans' as table_name, COUNT(*) as row_count FROM existing_loans
UNION ALL
SELECT 
    'notifications' as table_name, COUNT(*) as row_count FROM notifications;
