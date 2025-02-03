# NeuraGo Backend API Documentation

## User Management System

### Architecture
The user management system follows a layered architecture:
- Routes (`userRouter.js`): Handles HTTP routes and input validation
- Controllers (`userController.js`): Manages request/response logic
- Services (`userService.js`): Contains business logic
- Models (`userModel.js`): Defines data structure and database interactions

### API Endpoints

#### User Registration
- **Route**: POST user/register
- **Description**: Register a new user
- **Validation**:
	- firstName: Min 3 characters
	- email: Valid email format
	- password: Min 8 characters
- **Request Body**:
```json
{
	"firstName": "string",
	"lastName": "string",
	"email": "string",
	"password": "string"
}
```
- **Response**: Returns user object and authentication token

#### User Login
- **Route**: POST user/login
- **Description**: Authenticate user and generate token
- **Validation**:
	- email: Valid email format
	- password: Min 8 characters
- **Request Body**:
```json
{
	"email": "string",
	"password": "string"
}
```
- **Response**: Returns user object and authentication token

#### User Profile
- **Route**: GET user/profile
- **Description**: Get authenticated user's profile
- **Authentication**: Required
- **Response**: Returns user profile data

#### User Logout
- **Route**: GET user/logout
- **Description**: Logout user and invalidate token
- **Authentication**: Required
- **Response**: Logout confirmation message

### Security Features
1. Password Hashing: Uses bcrypt for secure password storage
2. JWT Authentication: Implements JSON Web Tokens for session management
3. Token Blacklisting: Maintains blocked tokens list for secure logout
4. Password Selection: Password field excluded from general queries

## 🚗 Driver Management System

### Overview
The Driver Management System provides comprehensive functionality for managing delivery drivers, including registration, authentication, and vehicle information management.

### Architecture
The system follows a layered architecture:
- Routes (`driverRouter.js`): HTTP routes and input validation
- Controllers (`driverController.js`): Request/response handling
- Services (`driverService.js`): Business logic
- Models (`driverModel.js`): Data structure and database interactions

### API Endpoints

#### 1. Driver Registration
```http
POST /driver/register
```

**Request Body:**
```json
{
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "vehicleColor": "string",
    "vehicleType": "car|bike|van",
    "vehicleNoPlate": "string",
    "vehicleCapacity": "number"
}
```

**Validation:**
- firstName: Minimum 3 characters
- email: Valid email format
- password: Minimum 6 characters
- vehicleColor: Required, minimum 3 characters
- vehicleType: Must be one of: "car", "bike", "van"
- vehicleNoPlate: Required, minimum 9 characters
- vehicleCapacity: Required, minimum value 1

**Response (201):**
```json
{
    "driver": {
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "vehicleColor": "string",
        "vehicleType": "string",
        "vehicleNoPlate": "string",
        "vehicleCapacity": "number",
        "status": "inactive"
    },
    "token": "JWT_TOKEN"
}
```

#### 2. Driver Login
```http
POST /driver/login
```

**Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```

**Response (200):**
```json
{
    "driver": {
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "vehicleDetails": {
            "color": "string",
            "type": "string",
            "noPlate": "string",
            "capacity": "number"
        },
        "status": "string"
    },
    "token": "JWT_TOKEN"
}
```

#### 3. Driver Profile
```http
GET /driver/profile
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response (200):**
```json
{
    "driver": {
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "vehicleDetails": {
            "color": "string",
            "type": "string",
            "noPlate": "string",
            "capacity": "number"
        },
        "status": "string"
    }
}
```

#### 4. Driver Logout
```http
GET /driver/logout
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response (200):**
```json
{
    "message": "Driver Logged Out"
}
```

### Data Model

#### Driver Schema
```javascript
{
    firstName: String,      // Required, min 3 chars
    lastName: String,       // Optional, min 3 chars
    email: String,         // Required, unique
    password: String,      // Required, min 6 chars
    socketId: String,      // Optional
    status: String,        // "active" or "inactive"
    vehicleColor: String,  // Required
    vehicleType: String,   // Required: "car", "bike", or "van"
    vehicleNoPlate: String,// Required
    vehicleCapacity: Number,// Required, min: 1
    location: {
        latitude: Number,  // Optional
        longitude: Number  // Optional
    }
}
```

### Security Features
1. **Password Security:**
   - Bcrypt hashing for passwords
   - Password field excluded from queries

2. **Authentication:**
   - JWT-based authentication
   - Token blacklisting for logout
   - Middleware protection for routes

3. **Input Validation:**
   - Express-validator implementation
   - Comprehensive field validation
   - Vehicle information verification

4. **Status Management:**
   - Active/Inactive status tracking
   - Real-time status updates


