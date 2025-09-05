-- Sample data initialization - runs after schema.sql
-- This inserts initial test data

INSERT INTO loan_applications (loan_type, loan_amount, interest_rate, loan_term_months, monthly_emi, total_amount, status, purpose, collateral) VALUES
('Personal Loan', 50000.00, 12.50, 24, 2347.07, 56329.68, 'PENDING', 'Home renovation', 'None'),
('Car Loan', 300000.00, 8.50, 60, 6129.83, 367789.80, 'APPROVED', 'Vehicle purchase', 'Vehicle'),
('Home Loan', 2500000.00, 7.25, 240, 18737.66, 4497039.36, 'PENDING', 'House purchase', 'Property'),
('Business Loan', 1000000.00, 11.00, 120, 13493.54, 1619224.80, 'APPROVED', 'Business expansion', 'Business assets'),
('Education Loan', 800000.00, 9.50, 84, 12456.78, 1046369.52, 'PENDING', 'Higher education', 'None');

INSERT INTO notifications (title, message, type, is_read) VALUES
('Loan Application Submitted', 'Your personal loan application has been submitted successfully.', 'LOAN_APPLICATION', false),
('Loan Approved', 'Congratulations! Your car loan has been approved.', 'LOAN_APPROVAL', false),
('Document Required', 'Please upload income proof for your home loan application.', 'GENERAL', true),
('Payment Due', 'Your EMI payment is due in 3 days.', 'PAYMENT_DUE', false),
('Loan Disbursed', 'Your business loan amount has been disbursed to your account.', 'LOAN_DISBURSEMENT', true);
