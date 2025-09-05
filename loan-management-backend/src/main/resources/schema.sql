-- Schema initialization - runs before data.sql
-- This creates the table structure

CREATE TABLE IF NOT EXISTS loan_applications (
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

CREATE TABLE IF NOT EXISTS notifications (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS documents (
    id BIGSERIAL PRIMARY KEY,
    loan_application_id BIGINT REFERENCES loan_applications(id) ON DELETE CASCADE,
    document_name VARCHAR(255) NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
