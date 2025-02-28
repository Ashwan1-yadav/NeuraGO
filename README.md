<div align="center">
	<img src="./assets/neurago-banner.png" alt="NeuraGo Banner" width="100%">
	<h1>NeuraGo - Smart Urban Mobility</h1>
	
</div>




## 🚀 About NeuraGo

NeuraGo is a cutting-edge ride-hailing platform that connects passengers with drivers for seamless urban transportation. Built with modern technologies, it offers real-time tracking, secure payments, and an intuitive user experience for both riders and drivers.

### ✨ Key Features

- 🔐 Secure user authentication and authorization
- 📍 Real-time location tracking
- 💰 Secure payments using Razorpay
- 📱 Responsive and mobile-friendly interface
- 🚗 Driver-passenger matching algorithm
- ⭐ Rating and review system

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js
- **Authentication**: JWT
- **Real-time Updates**: Socket.io
- **Maps**: Google Maps API


## 🏗️ Installation

1. Clone the repository:
	 ```bash
	 git clone https://github.com/ashwan1-yadav/NeuraGo.git
	 cd NeuraGo
	 ```

2. Install dependencies for Backend:
	 ```bash
	 cd Backend
	 npm install
	 ```

3. Install dependencies for Frontend:
	 ```bash
	 cd ../Frontend
	 npm install
	 ```

4. Set up environment variables:
	 Create `.env` files in both Backend and Frontend directories:

	 Backend `.env`:
	 ```
	 PORT=3000
	 MONGO_URL=your_mongodb_url
	 JWT_SECRET=your_jwt_secret
	 GOOGLE_MAPS_API_KEY="your_google_maps_api_key"
	 ```

	 Frontend `.env`:
	 ```
	 VITE_BASE_URL="http://localhost:3000"
	 ```

5. Start the development servers:

	 Backend:
	 ```bash
	 cd Backend
	 npm run dev
	 ```

	 Frontend:
	 ```bash
	 cd Frontend
	 npm start
	 ```

## 🎯 Usage

1. Create an account or login
2. Set your pickup location and destination
3. Choose your ride type
4. Confirm and track your ride
 

## Demo Video
<div align="center">
	<img src="./assets/neurago_demo.gif" alt="NeuraGo Banner" width="80%">
</div>

## 👥 Contributing

Welcome contributors! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request




---

<div align="center">
	Made with ❤️ NeuraGo 
</div>
