# Reference and Existing Loan API Documentation

## Overview
This document describes the new API endpoints for managing References and Existing Loans associated with loan applications.

## Reference API Endpoints

### Base URL: `/api/references`

#### 1. Create Reference
- **POST** `/api/references/loan/{loanApplicationId}`
- **Description**: Create a new reference for a loan application
- **Request Body**:
```json
{
  "name": "John Doe",
  "relationship": "Friend",
  "contactNumber": "1234567890",
  "address": "123 Main St, City, State"
}
```
- **Response**: `201 Created` with ReferenceResponse object

#### 2. Get References by Loan Application
- **GET** `/api/references/loan/{loanApplicationId}`
- **Description**: Retrieve all references for a specific loan application
- **Response**: `200 OK` with array of ReferenceResponse objects

#### 3. Get Reference by ID
- **GET** `/api/references/{id}`
- **Description**: Retrieve a specific reference by ID
- **Response**: `200 OK` with ReferenceResponse object or `404 Not Found`

#### 4. Update Reference
- **PUT** `/api/references/{id}`
- **Description**: Update an existing reference
- **Request Body**: Same as create reference
- **Response**: `200 OK` with updated ReferenceResponse object

#### 5. Delete Reference
- **DELETE** `/api/references/{id}`
- **Description**: Delete a specific reference
- **Response**: `200 OK` with success message or `404 Not Found`

#### 6. Count References
- **GET** `/api/references/loan/{loanApplicationId}/count`
- **Description**: Get count of references for a loan application
- **Response**: `200 OK` with count number

#### 7. Delete All References for Loan Application
- **DELETE** `/api/references/loan/{loanApplicationId}`
- **Description**: Delete all references for a specific loan application
- **Response**: `200 OK` with success message

## Existing Loan API Endpoints

### Base URL: `/api/existing-loans`

#### 1. Create Existing Loan
- **POST** `/api/existing-loans/loan/{loanApplicationId}`
- **Description**: Create a new existing loan record for a loan application
- **Request Body**:
```json
{
  "loanType": "Personal Loan",
  "lender": "ABC Bank",
  "outstandingAmount": 50000.00,
  "emi": 5000.00,
  "tenureMonths": 24,
  "remainingMonths": 12
}
```
- **Response**: `201 Created` with ExistingLoanResponse object

#### 2. Get Existing Loans by Loan Application
- **GET** `/api/existing-loans/loan/{loanApplicationId}`
- **Description**: Retrieve all existing loans for a specific loan application
- **Response**: `200 OK` with array of ExistingLoanResponse objects

#### 3. Get Existing Loan by ID
- **GET** `/api/existing-loans/{id}`
- **Description**: Retrieve a specific existing loan by ID
- **Response**: `200 OK` with ExistingLoanResponse object or `404 Not Found`

#### 4. Update Existing Loan
- **PUT** `/api/existing-loans/{id}`
- **Description**: Update an existing loan record
- **Request Body**: Same as create existing loan
- **Response**: `200 OK` with updated ExistingLoanResponse object

#### 5. Delete Existing Loan
- **DELETE** `/api/existing-loans/{id}`
- **Description**: Delete a specific existing loan record
- **Response**: `200 OK` with success message or `404 Not Found`

#### 6. Count Existing Loans
- **GET** `/api/existing-loans/loan/{loanApplicationId}/count`
- **Description**: Get count of existing loans for a loan application
- **Response**: `200 OK` with count number

#### 7. Get Existing Loans Summary
- **GET** `/api/existing-loans/loan/{loanApplicationId}/summary`
- **Description**: Get summary of existing loans including totals
- **Response**: `200 OK` with summary object:
```json
{
  "count": 2,
  "totalOutstandingAmount": 100000.00,
  "totalEmi": 10000.00
}
```

#### 8. Delete All Existing Loans for Loan Application
- **DELETE** `/api/existing-loans/loan/{loanApplicationId}`
- **Description**: Delete all existing loans for a specific loan application
- **Response**: `200 OK` with success message

## Data Models

### ReferenceResponse
```json
{
  "id": 1,
  "loanApplicationId": 123,
  "name": "John Doe",
  "relationship": "Friend",
  "contactNumber": "1234567890",
  "address": "123 Main St, City, State",
  "createdAt": "2024-01-01T10:00:00",
  "updatedAt": "2024-01-01T10:00:00"
}
```

### ExistingLoanResponse
```json
{
  "id": 1,
  "loanApplicationId": 123,
  "loanType": "Personal Loan",
  "lender": "ABC Bank",
  "outstandingAmount": 50000.00,
  "emi": 5000.00,
  "tenureMonths": 24,
  "remainingMonths": 12,
  "createdAt": "2024-01-01T10:00:00",
  "updatedAt": "2024-01-01T10:00:00"
}
```

## Validation Rules

### Reference Validation
- `name`: Required, max 100 characters
- `relationship`: Required, max 50 characters
- `contactNumber`: Required, max 15 characters
- `address`: Optional, max 500 characters

### Existing Loan Validation
- `loanType`: Required, max 50 characters
- `lender`: Required, max 100 characters
- `outstandingAmount`: Required, must be positive
- `emi`: Required, must be positive
- `tenureMonths`: Required, must be positive
- `remainingMonths`: Required

## Error Responses
All endpoints return appropriate HTTP status codes:
- `400 Bad Request`: Validation errors or invalid data
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server errors

Error response format:
```json
{
  "error": "Error message describing the issue"
}
```

## Integration Notes
- Both Reference and ExistingLoan entities are linked to LoanApplication via foreign key
- Cascade delete is enabled - deleting a loan application will delete associated references and existing loans
- All endpoints support CORS for frontend integration
- Authentication and authorization should be implemented as per existing loan application endpoints
