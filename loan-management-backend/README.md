# Loan Management System Backend

A comprehensive Spring Boot backend for loan management system with PostgreSQL integration.

## Features

- **Customer Authentication**: JWT-based authentication and registration
- **Loan Application**: Apply for loans with EMI calculations
- **Customer Dashboard**: Statistics and loan overview
- **Loan Status Tracking**: Track loan application status
- **Notifications**: Real-time notifications for loan updates
- **Customer Profile Management**: Update customer information

## Technology Stack

- **Framework**: Spring Boot 3.2.0
- **Database**: PostgreSQL
- **Security**: Spring Security with JWT
- **Build Tool**: Maven
- **Java Version**: 17

## Project Structure

```
src/
├── main/
│   ├── java/com/loanmanagement/
│   │   ├── config/
│   │   │   └── SecurityConfig.java
│   │   ├── controller/
│   │   │   ├── AuthController.java
│   │   │   ├── CustomerController.java
│   │   │   ├── DashboardController.java
│   │   │   ├── LoanController.java
│   │   │   └── NotificationController.java
│   │   ├── dto/
│   │   │   ├── CustomerRegistrationRequest.java
│   │   │   ├── DashboardResponse.java
│   │   │   ├── JwtRequest.java
│   │   │   ├── JwtResponse.java
│   │   │   ├── LoanApplicationRequest.java
│   │   │   ├── LoanApplicationResponse.java
│   │   │   └── NotificationResponse.java
│   │   ├── entity/
│   │   │   ├── Customer.java
│   │   │   ├── LoanApplication.java
│   │   │   └── Notification.java
│   │   ├── exception/
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── repository/
│   │   │   ├── CustomerRepository.java
│   │   │   ├── LoanApplicationRepository.java
│   │   │   └── NotificationRepository.java
│   │   ├── security/
│   │   │   ├── JwtAuthenticationEntryPoint.java
│   │   │   ├── JwtRequestFilter.java
│   │   │   └── JwtTokenUtil.java
│   │   ├── service/
│   │   │   ├── CustomerService.java
│   │   │   ├── DashboardService.java
│   │   │   ├── LoanApplicationService.java
│   │   │   └── NotificationService.java
│   │   └── LoanManagementBackendApplication.java
│   └── resources/
│       └── application.properties
```

## Setup Instructions

### Prerequisites

1. **Java 17** or higher
2. **Maven 3.6+**
3. **PostgreSQL 12+**
4. **IntelliJ IDEA** (recommended)

### Database Setup

1. Install PostgreSQL and create a database:
```sql
CREATE DATABASE loan_management_db;
```

2. Update database credentials in `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/loan_management_db
spring.datasource.username=postgres
spring.datasource.password=your_password
```

### Running the Application

1. **Using IntelliJ IDEA**:
   - Open the project in IntelliJ IDEA
   - Wait for Maven dependencies to download
   - Run `LoanManagementBackendApplication.java`

2. **Using Maven Command Line**:
```bash
mvn spring-boot:run
```

3. **Using JAR file**:
```bash
mvn clean package
java -jar target/loan-management-backend-0.0.1-SNAPSHOT.jar
```

The application will start on `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new customer
- `POST /api/auth/login` - Customer login

### Loan Management
- `POST /api/loans/apply` - Apply for a loan
- `GET /api/loans/my-loans` - Get customer's loans
- `GET /api/loans/{loanId}` - Get loan details
- `POST /api/loans/{loanId}/cancel` - Cancel loan application
- `POST /api/loans/calculate-emi` - Calculate EMI

### Dashboard
- `GET /api/dashboard` - Get dashboard data with statistics

### Notifications
- `GET /api/notifications` - Get all notifications
- `GET /api/notifications/unread` - Get unread notifications
- `GET /api/notifications/count/unread` - Get unread count
- `POST /api/notifications/{id}/mark-read` - Mark notification as read
- `POST /api/notifications/mark-all-read` - Mark all as read
- `DELETE /api/notifications/{id}` - Delete notification

### Customer Profile
- `GET /api/customers/profile` - Get customer profile
- `PUT /api/customers/profile` - Update customer profile

## Authentication

The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Sample Requests

### Register Customer
```json
POST /api/auth/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phoneNumber": "1234567890",
  "dateOfBirth": "1990-01-01",
  "address": "123 Main St",
  "annualIncome": 50000.0,
  "employmentStatus": "Employed",
  "creditScore": 750
}
```

### Apply for Loan
```json
POST /api/loans/apply
{
  "loanType": "Personal Loan",
  "loanAmount": 100000,
  "interestRate": 12.5,
  "loanTermMonths": 24,
  "purpose": "Home renovation",
  "collateral": "None"
}
```

## Database Schema

The application automatically creates the following tables:
- `customers` - Customer information and authentication
- `loan_applications` - Loan applications with status tracking
- `notifications` - Customer notifications

## Configuration

Key configuration properties in `application.properties`:

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/loan_management_db
spring.datasource.username=postgres
spring.datasource.password=password

# JWT
jwt.secret=mySecretKey123456789012345678901234567890
jwt.expiration=86400000

# Server
server.port=8080

# CORS
cors.allowed-origins=http://localhost:3000
```

## Development Notes

- The application uses Spring Security for authentication and authorization
- JWT tokens expire after 24 hours (configurable)
- CORS is enabled for frontend integration
- All API responses are in JSON format
- Comprehensive error handling with meaningful error messages
- Input validation using Bean Validation annotations

## Testing

You can test the APIs using:
- **Postman** - Import the API collection
- **curl** commands
- **Frontend application** (React/Angular)

## Troubleshooting

1. **Database Connection Issues**:
   - Ensure PostgreSQL is running
   - Check database credentials in `application.properties`
   - Verify database exists

2. **JWT Token Issues**:
   - Check token expiration
   - Ensure proper Authorization header format
   - Verify JWT secret configuration

3. **CORS Issues**:
   - Update `cors.allowed-origins` in `application.properties`
   - Check SecurityConfig CORS configuration

## Support

For issues or questions, please check the logs and ensure all dependencies are properly configured.
