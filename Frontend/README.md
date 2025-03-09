# NeuraGO Frontend

## 🚀 Overview
NeuraGO is a modern ride-hailing application built with React. The frontend provides a seamless user interface for both riders and drivers, featuring real-time location tracking, ride booking, and payment processing.

## 🛠 Tech Stack
- **Framework**: React + Vite
- **Styling**: TailwindCSS
- **State Management**: React Context
- **Real-time Communication**: Socket.IO
- **Routing**: React Router
- **HTTP Client**: Axios
- **Animations**: GSAP

## 📁 Project Structure

Frontend/
├── components/ # Reusable UI components
├── context/ # React Context providers
├── pages/ # Route components
├── utils/ # Helper functions and route protectors
└── src/ # Application core files

## 🧩 Components

### Ride Management
- `RideSelection.jsx` - Vehicle type and fare selection
- `RideConfirmation.jsx` - Ride booking confirmation
- `RideDriverInfo.jsx` - Driver and ride details
- `LookingForDriver.jsx` - Driver search interface

### Location Services
- `LocationPanel.jsx` - Location search and suggestions
- `NewRideAvailable.jsx` - New ride notifications for drivers
- `FinishRide.jsx` - Ride completion interface

## 📄 Pages

### User Pages
- `Home.jsx` - Landing page
- `Dashboard.jsx` - Main user interface
- `UserLogin.jsx` - User authentication
- `UserSignup.jsx` - New user registration
- `PaymentPage.jsx` - Payment processing

### Driver Pages
- `DriverDashboard.jsx` - Driver main interface
- `DriverLogin.jsx` - Driver authentication
- `DriverSignup.jsx` - Driver registration
- `DriverRiding.jsx` - Active ride interface

## 🔐 Authentication & Protection

### Route Protection
- `UserRouteProtector.jsx` - Protects user routes
- `DriverRouteProtector.jsx` - Protects driver routes

### Context Providers
- `UserContext.jsx` - Manages user state
- `DriverContext.jsx` - Manages driver state
- `SocketContext.jsx` - Handles real-time communication

## 🔌 Real-time Features

### Socket Events
- User/Driver connection
- Location updates
- Ride notifications
- Status changes

## 🎨 UI/UX Features
- Smooth transitions using GSAP
- Responsive design with TailwindCSS
- Interactive maps integration
- Real-time location tracking
- Dynamic fare calculation

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
VITE_BASE_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

## 📱 Features

### User Features
- Account creation and authentication
- Location search with suggestions
- Multiple vehicle type selection
- Real-time fare estimation
- Ride booking and tracking
- Payment processing

### Driver Features
- Driver registration and verification
- Real-time ride requests
- Location tracking
- Ride acceptance/rejection
- Earnings tracking
- Active ride management

## 🔒 Security Features
- Protected routes
- Token-based authentication
- Secure socket connections
- Session management

## 🎯 Environment Variables
- `VITE_BASE_URL`: Backend API endpoint

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📝 Development Guidelines

### Component Structure
- Use functional components
- Implement proper prop validation
- Follow React best practices
- Maintain consistent file naming

### Styling
- Use TailwindCSS classes
- Maintain responsive design
- Follow mobile-first approach
- Keep consistent spacing

### State Management
- Use Context API for global state
- Implement proper error handling
- Maintain loading states
- Handle edge cases

### Code Quality
- Follow ESLint rules
- Write clean, documented code
- Implement error boundaries
- Use proper TypeScript types

## 🔄 Application Flow
1. User/Driver authentication
2. Location selection
3. Ride booking/acceptance
4. Real-time tracking
5. Ride completion
6. Payment processing

## 📚 Additional Resources
- [React Documentation](https://reactjs.org/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Socket.IO Documentation](https://socket.io/)
- [GSAP Documentation](https://greensock.com/gsap/)


