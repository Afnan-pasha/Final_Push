-- Add customer identification fields to loan_applications table
ALTER TABLE loan_applications 
ADD COLUMN customer_email VARCHAR(255),
ADD COLUMN customer_id BIGINT;

-- Create index on customer_email for better query performance
CREATE INDEX idx_loan_applications_customer_email ON loan_applications(customer_email);

-- Create index on customer_id for better query performance  
CREATE INDEX idx_loan_applications_customer_id ON loan_applications(customer_id);
