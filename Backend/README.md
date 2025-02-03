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
- **Route**: POST /register
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
- **Route**: POST /login
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
- **Route**: GET /profile
- **Description**: Get authenticated user's profile
- **Authentication**: Required
- **Response**: Returns user profile data

#### User Logout
- **Route**: GET /logout
- **Description**: Logout user and invalidate token
- **Authentication**: Required
- **Response**: Logout confirmation message

### Security Features
1. Password Hashing: Uses bcrypt for secure password storage
2. JWT Authentication: Implements JSON Web Tokens for session management
3. Token Blacklisting: Maintains blocked tokens list for secure logout
4. Password Selection: Password field excluded from general queries

## Driver Management System

# Driver Management API Documentation

## Overview
The Driver API provides endpoints for managing driver accounts, including registration, authentication, and vehicle information management.

### Architecture
The driver management system follows a layered architecture similar to the user system:
- Routes (`driverRouter.js`): Handles HTTP routes and input validation
- Controllers (`driverController.js`): Manages request/response logic
- Services (`driverService.js`): Contains business logic
- Models (`driverModel.js`): Defines data structure and database interactions

### API Endpoints

#### Driver Registration
- **Route**: POST /api/driver/register
- **Description**: Register a new driver
- **Validation**:
	- firstName: Min 3 characters
	- email: Valid email format
	- password: Min 6 characters
	- vehicleColor: Required, min 3 characters
	- vehicleType: Must be one of: "car", "bike", "van"
	- vehicleNoPlate: Required, min 9 characters
	- vehicleCapacity: Required, minimum value 1
- **Request Body**:
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
- **Response**: Returns driver object and authentication token

#### Driver Login
- **Route**: POST /api/driver/login
- **Description**: Authenticate driver and generate token
- **Validation**:
	- email: Valid email format
	- password: Min 6 characters
- **Request Body**:
```json
{
	"email": "string",
	"password": "string"
}
```
- **Response**: Returns driver object and authentication token

### Driver Model Schema
- firstName: String (Required, min 3 chars)
- lastName: String (Optional, min 3 chars)
- email: String (Required, unique)
- password: String (Required)
- socketId: String (Optional)
- status: String (enum: ["active", "inactive"])
- vehicleColor: String (Required)
- vehicleType: String (Required, enum: ["car", "bike", "van"])
- vehicleNoPlate: String (Required)
- vehicleCapacity: Number (Required, min: 1)
- location: Object (latitude, longitude)

### Security Features
1. Password Hashing: Uses bcrypt for secure password storage
2. JWT Authentication: Implements JSON Web Tokens for session management
3. Input Validation: Comprehensive validation using express-validator
4. Status Tracking: Monitors driver's active/inactive status



