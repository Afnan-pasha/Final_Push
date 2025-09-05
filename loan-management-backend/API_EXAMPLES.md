# Reference and Existing Loan API Examples

## Table of Contents
1. [Reference API Examples](#reference-api-examples)
2. [Existing Loan API Examples](#existing-loan-api-examples)
3. [Complete Workflow Examples](#complete-workflow-examples)
4. [Error Handling Examples](#error-handling-examples)

---

## Reference API Examples

### 1. Create a Reference

**Request:**
```http
POST /api/references/loan/123
Content-Type: application/json

{
  "name": "John Smith",
  "relationship": "Friend",
  "contactNumber": "9876543210",
  "address": "123 Main Street, New York, NY 10001"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "loanApplicationId": 123,
  "name": "John Smith",
  "relationship": "Friend",
  "contactNumber": "9876543210",
  "address": "123 Main Street, New York, NY 10001",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### 2. Create Multiple References for a Loan Application

**Reference 1 - Family Member:**
```http
POST /api/references/loan/123
Content-Type: application/json

{
  "name": "Sarah Johnson",
  "relationship": "Sister",
  "contactNumber": "5551234567",
  "address": "456 Oak Avenue, Los Angeles, CA 90210"
}
```

**Reference 2 - Professional Contact:**
```http
POST /api/references/loan/123
Content-Type: application/json

{
  "name": "Michael Brown",
  "relationship": "Manager",
  "contactNumber": "5559876543",
  "address": "789 Corporate Blvd, Chicago, IL 60601"
}
```

### 3. Get All References for a Loan Application

**Request:**
```http
GET /api/references/loan/123
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "loanApplicationId": 123,
    "name": "John Smith",
    "relationship": "Friend",
    "contactNumber": "9876543210",
    "address": "123 Main Street, New York, NY 10001",
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-01-15T10:30:00"
  },
  {
    "id": 2,
    "loanApplicationId": 123,
    "name": "Sarah Johnson",
    "relationship": "Sister",
    "contactNumber": "5551234567",
    "address": "456 Oak Avenue, Los Angeles, CA 90210",
    "createdAt": "2024-01-15T10:35:00",
    "updatedAt": "2024-01-15T10:35:00"
  }
]
```

### 4. Update a Reference

**Request:**
```http
PUT /api/references/1
Content-Type: application/json

{
  "name": "John Smith Jr.",
  "relationship": "Close Friend",
  "contactNumber": "9876543210",
  "address": "123 Main Street, Apt 5B, New York, NY 10001"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "loanApplicationId": 123,
  "name": "John Smith Jr.",
  "relationship": "Close Friend",
  "contactNumber": "9876543210",
  "address": "123 Main Street, Apt 5B, New York, NY 10001",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T11:45:00"
}
```

### 5. Get Reference Count

**Request:**
```http
GET /api/references/loan/123/count
```

**Response (200 OK):**
```json
3
```

---

## Existing Loan API Examples

### 1. Create an Existing Loan - Credit Card

**Request:**
```http
POST /api/existing-loans/loan/123
Content-Type: application/json

{
  "loanType": "Credit Card",
  "lender": "Chase Bank",
  "outstandingAmount": 15000.00,
  "emi": 1500.00,
  "tenureMonths": 12,
  "remainingMonths": 8
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "loanApplicationId": 123,
  "loanType": "Credit Card",
  "lender": "Chase Bank",
  "outstandingAmount": 15000.00,
  "emi": 1500.00,
  "tenureMonths": 12,
  "remainingMonths": 8,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### 2. Create an Existing Loan - Car Loan

**Request:**
```http
POST /api/existing-loans/loan/123
Content-Type: application/json

{
  "loanType": "Car Loan",
  "lender": "Wells Fargo Auto Finance",
  "outstandingAmount": 180000.00,
  "emi": 8500.00,
  "tenureMonths": 60,
  "remainingMonths": 36
}
```

### 3. Create an Existing Loan - Personal Loan

**Request:**
```http
POST /api/existing-loans/loan/123
Content-Type: application/json

{
  "loanType": "Personal Loan",
  "lender": "Bank of America",
  "outstandingAmount": 50000.00,
  "emi": 4200.00,
  "tenureMonths": 24,
  "remainingMonths": 15
}
```

### 4. Get All Existing Loans for a Loan Application

**Request:**
```http
GET /api/existing-loans/loan/123
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "loanApplicationId": 123,
    "loanType": "Credit Card",
    "lender": "Chase Bank",
    "outstandingAmount": 15000.00,
    "emi": 1500.00,
    "tenureMonths": 12,
    "remainingMonths": 8,
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-01-15T10:30:00"
  },
  {
    "id": 2,
    "loanApplicationId": 123,
    "loanType": "Car Loan",
    "lender": "Wells Fargo Auto Finance",
    "outstandingAmount": 180000.00,
    "emi": 8500.00,
    "tenureMonths": 60,
    "remainingMonths": 36,
    "createdAt": "2024-01-15T10:35:00",
    "updatedAt": "2024-01-15T10:35:00"
  }
]
```

### 5. Get Existing Loans Summary

**Request:**
```http
GET /api/existing-loans/loan/123/summary
```

**Response (200 OK):**
```json
{
  "count": 3,
  "totalOutstandingAmount": 245000.00,
  "totalEmi": 14200.00
}
```

### 6. Update an Existing Loan

**Request:**
```http
PUT /api/existing-loans/1
Content-Type: application/json

{
  "loanType": "Credit Card",
  "lender": "Chase Bank",
  "outstandingAmount": 12000.00,
  "emi": 1200.00,
  "tenureMonths": 12,
  "remainingMonths": 6
}
```

---

## Complete Workflow Examples

### Scenario 1: New Loan Application with References and Existing Loans

#### Step 1: Create Loan Application
```http
POST /api/loans/apply
Content-Type: application/json

{
  "loanType": "Home Loan",
  "loanAmount": 500000.00,
  "interestRate": 8.5,
  "loanTermMonths": 240,
  "purpose": "House Purchase"
}
```

**Response:** Loan Application ID = 456

#### Step 2: Add References
```http
POST /api/references/loan/456
Content-Type: application/json

{
  "name": "Robert Wilson",
  "relationship": "Father",
  "contactNumber": "5551112222",
  "address": "100 Family Lane, Boston, MA 02101"
}
```

```http
POST /api/references/loan/456
Content-Type: application/json

{
  "name": "Emily Davis",
  "relationship": "Supervisor",
  "contactNumber": "5553334444",
  "address": "200 Office Park, Boston, MA 02102"
}
```

#### Step 3: Add Existing Loans
```http
POST /api/existing-loans/loan/456
Content-Type: application/json

{
  "loanType": "Personal Loan",
  "lender": "Citibank",
  "outstandingAmount": 25000.00,
  "emi": 2100.00,
  "tenureMonths": 18,
  "remainingMonths": 10
}
```

#### Step 4: Get Complete Application Summary
```http
GET /api/loans/456
GET /api/references/loan/456
GET /api/existing-loans/loan/456/summary
```

### Scenario 2: Loan Application Review Process

#### Check References Count
```http
GET /api/references/loan/456/count
```
**Expected:** At least 2 references

#### Check Existing Loan Burden
```http
GET /api/existing-loans/loan/456/summary
```
**Response:**
```json
{
  "count": 1,
  "totalOutstandingAmount": 25000.00,
  "totalEmi": 2100.00
}
```

---

## Error Handling Examples

### 1. Validation Errors

**Request with Missing Required Field:**
```http
POST /api/references/loan/123
Content-Type: application/json

{
  "name": "",
  "relationship": "Friend",
  "contactNumber": "9876543210"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Reference name is required"
}
```

### 2. Invalid Loan Application ID

**Request:**
```http
POST /api/references/loan/99999
Content-Type: application/json

{
  "name": "John Doe",
  "relationship": "Friend",
  "contactNumber": "9876543210"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Error creating reference: Loan application not found with ID: 99999"
}
```

### 3. Reference Not Found

**Request:**
```http
GET /api/references/99999
```

**Response (404 Not Found):**
```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 404,
  "error": "Not Found"
}
```

### 4. Invalid Existing Loan Data

**Request:**
```http
POST /api/existing-loans/loan/123
Content-Type: application/json

{
  "loanType": "Personal Loan",
  "lender": "ABC Bank",
  "outstandingAmount": -5000.00,
  "emi": 500.00,
  "tenureMonths": 12,
  "remainingMonths": 6
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Outstanding amount must be positive"
}
```

---

## Frontend Integration Examples

### JavaScript/React Example

```javascript
// Create a reference
const createReference = async (loanApplicationId, referenceData) => {
  try {
    const response = await fetch(`/api/references/loan/${loanApplicationId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(referenceData)
    });
    
    if (response.ok) {
      const reference = await response.json();
      console.log('Reference created:', reference);
      return reference;
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    console.error('Error creating reference:', error);
    throw error;
  }
};

// Get existing loans summary
const getExistingLoansSummary = async (loanApplicationId) => {
  try {
    const response = await fetch(`/api/existing-loans/loan/${loanApplicationId}/summary`);
    const summary = await response.json();
    return summary;
  } catch (error) {
    console.error('Error fetching existing loans summary:', error);
    return { count: 0, totalOutstandingAmount: 0, totalEmi: 0 };
  }
};

// Usage example
const handleAddReference = async () => {
  const referenceData = {
    name: "John Smith",
    relationship: "Friend",
    contactNumber: "9876543210",
    address: "123 Main St, City, State"
  };
  
  try {
    const reference = await createReference(123, referenceData);
    // Update UI with new reference
  } catch (error) {
    // Handle error in UI
  }
};
```

### cURL Examples

```bash
# Create a reference
curl -X POST http://localhost:8080/api/references/loan/123 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "relationship": "Friend", 
    "contactNumber": "9876543210",
    "address": "123 Main St, City, State"
  }'

# Get all references
curl -X GET http://localhost:8080/api/references/loan/123

# Create existing loan
curl -X POST http://localhost:8080/api/existing-loans/loan/123 \
  -H "Content-Type: application/json" \
  -d '{
    "loanType": "Credit Card",
    "lender": "Chase Bank",
    "outstandingAmount": 15000.00,
    "emi": 1500.00,
    "tenureMonths": 12,
    "remainingMonths": 8
  }'

# Get existing loans summary
curl -X GET http://localhost:8080/api/existing-loans/loan/123/summary
```

---

## Testing Checklist

### Reference API Testing
- [ ] Create reference with all fields
- [ ] Create reference with only required fields
- [ ] Get all references for loan application
- [ ] Get specific reference by ID
- [ ] Update reference
- [ ] Delete reference
- [ ] Count references
- [ ] Validate required fields
- [ ] Test with invalid loan application ID

### Existing Loan API Testing
- [ ] Create existing loan with all fields
- [ ] Get all existing loans for loan application
- [ ] Get specific existing loan by ID
- [ ] Update existing loan
- [ ] Delete existing loan
- [ ] Get existing loans summary
- [ ] Validate positive amounts
- [ ] Test financial calculations
- [ ] Test with invalid data

This comprehensive guide provides practical examples for all the Reference and Existing Loan API endpoints with real-world scenarios and proper error handling.
