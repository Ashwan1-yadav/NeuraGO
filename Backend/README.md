# NeuraGo Backend API Documentation

## 🔐 Authentication API

The authentication system provides user registration, login, profile management, and logout functionality.

### Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Express Validator for input validation

### API Endpoints

#### 1. User Registration
```http
POST /api/auth/register
```

**Request Body:**
```json
{
	"firstName": "string",
	"lastName": "string",
	"email": "string",
	"password": "string"
}
```

**Response (201):**
```json
{
	"user": {
		"firstname": "string",
		"lastname": "string",
		"email": "string"
	},
	"token": "JWT_TOKEN"
}
```

#### 2. User Login
```http
POST /api/auth/login
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
	"user": {
		"firstname": "string",
		"lastname": "string",
		"email": "string"
	},
	"token": "JWT_TOKEN"
}
```

#### 3. Get User Profile
```http
GET /api/auth/profile
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response (200):**
```json
{
	"firstname": "string",
	"lastname": "string",
	"email": "string"
}
```

#### 4. User Logout
```http
POST /api/auth/logout
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response (200):**
```json
{
	"message": "User Logged Out"
}
```

### Authentication Flow

1. **Token-based Authentication:**
	 - JWT (JSON Web Tokens) are used for authentication
	 - Tokens are stored in cookies and can be sent via Authorization header
	 - Tokens are verified using the `isLoggedIn` middleware

2. **Security Features:**
	 - Password hashing
	 - Token blacklisting for logout
	 - Input validation using express-validator
	 - Protected routes using middleware

### Setup Instructions

1. **Install Dependencies:**
```bash
npm install
```

2. **Environment Variables:**
Create a `.env` file in the root directory with:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

3. **Start the Server:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 500: Internal Server Error

### Middleware Usage

1. **Authentication Middleware (`isLoggedIn`):**
	 - Verifies JWT token
	 - Checks for token in cookies or Authorization header
	 - Validates against blocked tokens
	 - Attaches user to request object

### Models

1. **User Model:**
	 - Handles password hashing
	 - Generates authentication tokens
	 - Manages user data

2. **BlockedToken Model:**
	 - Stores invalidated tokens
	 - Used for logout functionality

### Best Practices

1. **Security:**
	 - Always use HTTPS in production
	 - Implement rate limiting
	 - Validate all inputs
	 - Use secure password hashing

2. **Development:**
	 - Follow REST API conventions
	 - Use meaningful status codes
	 - Implement proper error handling
	 - Document all endpoints

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

