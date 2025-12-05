# MyFlix API Authentication

## Token-Based Authentication

This API uses JWT (JSON Web Token) for authentication on protected endpoints.

### Protected Endpoints
- `GET /movies` - Requires valid JWT token

### Public Endpoints
- `GET /movies/public` - No authentication required
- `POST /users` - Register new user
- `POST /auth/login` - User login

### How to Use

1. **Register a new user:**
```bash
POST /users
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password",
  "email": "your_email@example.com"
}
```

2. **Login:**
```bash
POST /auth/login
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

3. **Access protected endpoints:**
```bash
GET /movies
Authorization: Bearer <your_jwt_token>
```

### Environment Variables

- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT signing
- `PORT` - Server port (default: 8080)

### Deployment

This API is deployed on Heroku at: https://lit-shelf-96037-05158a2eb522.herokuapp.com/
