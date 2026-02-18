# Anime Store

Anime Store is a full-stack web application built using React (Vite), Node.js, Express, and MongoDB.  
It is designed as a modern anime merchandise e-commerce prototype featuring product browsing, cart functionality, and basic authentication.

This project was developed as an academic project and serves as a foundation for a scalable commercial anime merchandise platform.

---

## Tech Stack

Frontend:
- React (Vite)
- CSS
- Framer Motion
- Axios

Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)

Other:
- JWT Authentication
- REST API Architecture

---

## Features

- Product listing with detailed view
- Add to cart functionality
- User registration and login
- Basic authentication using JWT
- Order placement (demo implementation)
- Responsive UI design
- Animated UI interactions

Note: Payment gateway and advanced production-level security features are not implemented yet.

---

## Project Structure

```
anime-store/
│
├── public/                 # Frontend (React + Vite)
│   ├── src/
│   ├── index.html
│   └── package.json
│
├── src/                    # Backend source code
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── package.json
├── .gitignore
└── README.md
```

Adjust structure if your implementation slightly differs.

---

## Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/kartik-dayatar/anime-store.git
cd anime-store
```

---

### 2. Install Backend Dependencies

```bash
npm install
```

---

### 3. Install Frontend Dependencies

```bash
cd public
npm install
```

---

## Environment Variables

Create a `.env` file in the backend root directory with the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace values with your actual configuration.

---

## Running the Application

### Start Backend

From the root directory:

```bash
npm run start
```

or

```bash
node src/server.js
```

---

### Start Frontend

In a separate terminal:

```bash
cd public
npm run dev
```

Frontend will typically run at:

```
http://localhost:5173
```

Backend typically runs at:

```
http://localhost:5000
```

---

## API Overview

Example routes:

- POST /api/auth/register
- POST /api/auth/login
- GET /api/products
- POST /api/orders

Routes may vary depending on your implementation.

---

## Future Improvements

- Payment gateway integration (Stripe / Razorpay)
- Admin dashboard for product management
- Product filtering and search
- Wishlist feature
- Secure password hashing improvements
- Deployment setup (Docker + Cloud hosting)
- CI/CD pipeline

---

## Deployment Notes

Before deploying to production:

- Add input validation and sanitization
- Add proper error handling middleware
- Enable CORS configuration properly
- Move secrets to secure environment variables
- Optimize frontend build using `npm run build`
- Use a production MongoDB cluster

---

## License

This project currently does not include a license file.  
If you intend to make it open source, consider adding an MIT License.

---

## Author

Kartik Dayatar

GitHub: https://github.com/kartik-dayatar
