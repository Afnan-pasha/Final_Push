-- Database Migration Script for References and Existing Loans
-- Run this to add new tables for References and Existing Loans

-- Add references table
CREATE TABLE IF NOT EXISTS references (
    id BIGSERIAL PRIMARY KEY,
    loan_application_id BIGINT NOT NULL REFERENCES loan_applications(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    relationship VARCHAR(50) NOT NULL,
    contact_number VARCHAR(15) NOT NULL,
    address VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add existing_loans table
CREATE TABLE IF NOT EXISTS existing_loans (
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

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_references_loan_application_id ON references(loan_application_id);
CREATE INDEX IF NOT EXISTS idx_existing_loans_loan_application_id ON existing_loans(loan_application_id);

-- Create loan_applications table without customer references
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table without customer references
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP
);

-- Create documents table (if needed)
CREATE TABLE IF NOT EXISTS documents (
    id BIGSERIAL PRIMARY KEY,
    loan_application_id BIGINT REFERENCES loan_applications(id) ON DELETE CASCADE,
    document_name VARCHAR(255) NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data for testing
INSERT INTO loan_applications (loan_type, loan_amount, interest_rate, loan_term_months, monthly_emi, total_amount, status, purpose, collateral) VALUES
('Personal Loan', 50000.00, 12.50, 24, 2347.07, 56329.68, 'PENDING', 'Home renovation', 'None'),
('Car Loan', 300000.00, 8.50, 60, 6129.83, 367789.80, 'APPROVED', 'Vehicle purchase', 'Vehicle'),
('Home Loan', 2500000.00, 7.25, 240, 18737.66, 4497039.36, 'PENDING', 'House purchase', 'Property');

INSERT INTO notifications (title, message, type, is_read) VALUES
('Loan Application Submitted', 'Your personal loan application has been submitted successfully.', 'LOAN_APPLICATION', false),
('Loan Approved', 'Congratulations! Your car loan has been approved.', 'LOAN_APPROVAL', false),
('Document Required', 'Please upload income proof for your home loan application.', 'GENERAL', true);
