-- Loan Management System Database Setup
-- Execute these commands in PostgreSQL (pgAdmin or psql)

-- Create database (run this as postgres superuser)
CREATE DATABASE loan_management_db;

-- Connect to the database and create tables
-- (The application will auto-create tables, but you can use this for manual setup)

-- Switch to the database
\c loan_management_db;

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(10),
    date_of_birth VARCHAR(255),
    address TEXT,
    annual_income DECIMAL(15,2),
    employment_status VARCHAR(255),
    credit_score INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create loan_applications table
CREATE TABLE IF NOT EXISTS loan_applications (
    id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT NOT NULL REFERENCES customers(id),
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

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT NOT NULL REFERENCES customers(id),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
    id BIGSERIAL PRIMARY KEY,
    loan_application_id BIGINT NOT NULL REFERENCES loan_applications(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_size BIGINT,
    file_path TEXT NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    upload_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create references table
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

-- Create existing_loans table
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_loan_applications_customer_id ON loan_applications(customer_id);
CREATE INDEX IF NOT EXISTS idx_loan_applications_status ON loan_applications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_customer_id ON notifications(customer_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_documents_loan_application_id ON documents(loan_application_id);
CREATE INDEX IF NOT EXISTS idx_documents_document_type ON documents(document_type);
CREATE INDEX IF NOT EXISTS idx_references_loan_application_id ON references(loan_application_id);
CREATE INDEX IF NOT EXISTS idx_existing_loans_loan_application_id ON existing_loans(loan_application_id);

-- Insert sample data (optional)
-- Sample customer
INSERT INTO customers (first_name, last_name, email, password, phone_number, annual_income, employment_status, credit_score)
VALUES ('John', 'Doe', 'john.doe@example.com', '$2a$10$example.hash.here', '1234567890', 50000.00, 'Employed', 750)
ON CONFLICT (email) DO NOTHING;

-- Sample loan application
INSERT INTO loan_applications (customer_id, loan_type, loan_amount, interest_rate, loan_term_months, monthly_emi, total_amount, status, purpose)
SELECT 
    c.id, 
    'Personal Loan', 
    100000.00, 
    12.50, 
    24, 
    4707.35, 
    112976.40, 
    'PENDING', 
    'Home renovation'
FROM customers c 
WHERE c.email = 'john.doe@example.com'
LIMIT 1;

-- Sample notification
INSERT INTO notifications (customer_id, title, message, type)
SELECT 
    c.id,
    'Welcome to Loan Management System',
    'Your account has been created successfully. You can now apply for loans.',
    'GENERAL'
FROM customers c 
WHERE c.email = 'john.doe@example.com'
LIMIT 1;

-- Sample references
INSERT INTO references (loan_application_id, name, relationship, contact_number, address)
SELECT 
    la.id,
    'Jane Smith',
    'Friend',
    '9876543210',
    '456 Oak Street, City, State'
FROM loan_applications la
JOIN customers c ON la.customer_id = c.id
WHERE c.email = 'john.doe@example.com'
LIMIT 1;

INSERT INTO references (loan_application_id, name, relationship, contact_number, address)
SELECT 
    la.id,
    'Robert Johnson',
    'Colleague',
    '5555123456',
    '789 Pine Avenue, City, State'
FROM loan_applications la
JOIN customers c ON la.customer_id = c.id
WHERE c.email = 'john.doe@example.com'
LIMIT 1;

-- Sample existing loans
INSERT INTO existing_loans (loan_application_id, loan_type, lender, outstanding_amount, emi, tenure_months, remaining_months)
SELECT 
    la.id,
    'Credit Card',
    'XYZ Bank',
    25000.00,
    2500.00,
    12,
    6
FROM loan_applications la
JOIN customers c ON la.customer_id = c.id
WHERE c.email = 'john.doe@example.com'
LIMIT 1;

INSERT INTO existing_loans (loan_application_id, loan_type, lender, outstanding_amount, emi, tenure_months, remaining_months)
SELECT 
    la.id,
    'Car Loan',
    'ABC Finance',
    150000.00,
    8500.00,
    60,
    36
FROM loan_applications la
JOIN customers c ON la.customer_id = c.id
WHERE c.email = 'john.doe@example.com'
LIMIT 1;
