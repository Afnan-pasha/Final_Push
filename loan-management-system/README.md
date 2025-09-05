# Standard Chartered Banking System

A comprehensive banking system built with React and Material-UI, featuring Standard Chartered's maker-checker workflow for loan application processing and personal banking services.

## Features

### Customer Features
- **Dashboard**: Overview of Standard Chartered banking services and loan applications
- **Apply for Loan**: Multi-step loan application form for Home, Personal, and Vehicle loans
- **Loan Status**: Track application progress with timeline
- **Notifications**: Real-time updates on application status
- **Profile Management**: Update personal information and change password

### Maker Features (Standard Chartered Loan Officers)
- **Dashboard**: Overview of pending applications and statistics
- **Application Review**: Detailed review of Standard Chartered loan applications
- **Approve/Reject**: Make decisions on loan applications with comments
- **Application Management**: Search, filter, and manage applications

### Checker Features (Standard Chartered Senior Officers)
- **Dashboard**: Overview of maker-approved applications
- **Final Review**: Final approval/rejection of applications
- **Application Management**: Review maker decisions and make final calls
- **Comprehensive Analysis**: Risk assessment and loan calculations

## Technology Stack

- **Frontend**: React 18, Material-UI 5, Framer Motion
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Styling**: Material-UI Theme, Emotion
- **Notifications**: React Toastify
- **Forms**: React Hook Form
- **HTTP Client**: Axios

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   └── ProtectedRoute.js
│   └── layout/
│       ├── Layout.js
│       ├── Navbar.js
│       └── Sidebar.js
├── context/
│   ├── AuthContext.js
│   └── LoanContext.js
├── pages/
│   ├── customer/
│   │   ├── CustomerDashboard.js
│   │   ├── ApplyLoan.js
│   │   ├── LoanStatus.js
│   │   └── Notifications.js
│   ├── maker/
│   │   ├── MakerDashboard.js
│   │   ├── LoanApplications.js
│   │   └── ApplicationReview.js
│   ├── checker/
│   │   ├── CheckerDashboard.js
│   │   ├── CheckerApplications.js
│   │   └── CheckerReview.js
│   ├── Login.js
│   └── Profile.js
├── theme/
│   └── theme.js
└── App.js
```

## User Roles

### Customer
- Apply for loans (Home, Personal, Vehicle)
- Track application status
- Receive notifications
- Manage profile

### Maker
- Review loan applications
- Approve or reject applications
- Add comments and feedback
- View application analytics

### Checker
- Final review of maker-approved applications
- Final approval or rejection
- Override maker decisions if necessary
- Comprehensive risk assessment

## Loan Application Process

1. **Customer Submission**: Customer fills out comprehensive application form
2. **Maker Review**: Maker reviews application details and makes initial decision
3. **Checker Review**: Checker performs final review of maker-approved applications
4. **Final Decision**: Application is either finally approved or rejected

## Key Features

### Multi-step Application Form
- Personal Information
- Employment Details
- Loan Requirements
- Existing Loans
- References
- Document Upload
- Review & Submit

### Real-time Status Tracking
- Application timeline
- Status updates
- Comments from reviewers
- Notification system

### Comprehensive Review System
- CIBIL score analysis
- EMI calculations
- Risk assessment
- Document verification
- Comment system

### Role-based Access Control
- Protected routes based on user roles
- Role-specific dashboards
- Permission-based features

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Default Users

The system comes with pre-configured users for testing:

### Customer
- Email: customer@example.com
- Password: password123

### Maker
- Email: maker@example.com
- Password: password123

### Checker
- Email: checker@example.com
- Password: password123

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.