# myFlix API - Heroku Deployment Guide

## Prerequisites
1. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
2. Heroku account created
3. MongoDB Atlas account (for production database)

## Setup Steps

### 1. Create MongoDB Atlas Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for Heroku
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/myflix`

### 2. Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Navigate to API folder
cd my-api

# Create Heroku app
heroku create your-myflix-api

# Set environment variables
heroku config:set MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/myflix"
heroku config:set JWT_SECRET="your-super-secret-random-string-here"
heroku config:set CORS_ORIGIN="https://your-frontend.netlify.app"

# Deploy
git subtree push --prefix my-api heroku main

# Or if you're in the my-api folder:
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a your-myflix-api
git push heroku main

# Check logs
heroku logs --tail
```

### 3. Verify Deployment

```bash
# Check if app is running
heroku open

# Test health endpoint
curl https://your-myflix-api.herokuapp.com/health
```

### 4. Update Frontend

Update your frontend `.env` file:
```
VITE_API_BASE_URL=https://your-myflix-api.herokuapp.com
```

## Environment Variables on Heroku

Set these via Heroku dashboard or CLI:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/myflix` |
| `JWT_SECRET` | Secret for JWT tokens | Random string (min 32 chars) |
| `CORS_ORIGIN` | Allowed frontend URLs (comma-separated) | `https://myflix.netlify.app,https://myflix.vercel.app` |
| `PORT` | Server port (auto-set by Heroku) | Auto |

## Seeding the Database

After deployment, seed movies:

```bash
# Option 1: Create a seed script and run locally pointing to Atlas
# Update your local .env to use Atlas MONGO_URI
node scripts/seed-movies.js

# Option 2: Use Heroku run
heroku run node scripts/seed-movies.js
```

## Troubleshooting

### Check logs
```bash
heroku logs --tail
```

### Restart dyno
```bash
heroku restart
```

### Check config
```bash
heroku config
```

### Test MongoDB connection
```bash
heroku run node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected')).catch(console.error)"
```

## Post-Deployment Checklist

- [ ] Health endpoint responds: `/health`
- [ ] MongoDB connected (check logs)
- [ ] CORS configured with frontend URL
- [ ] JWT_SECRET is set and secure
- [ ] Movies seeded in database
- [ ] Signup endpoint works
- [ ] Login endpoint works
- [ ] Protected endpoints require auth

## Alternative: Deploy with Git Subtree

If your repo has both frontend and backend:

```bash
# From root of your project
git subtree push --prefix my-api heroku main
```

## Common Issues

**"Cannot GET /"**: Normal - API has no root route. Check `/health` instead.

**CORS error**: Update `CORS_ORIGIN` config variable with your frontend URL.

**MongoDB connection failed**: Check MongoDB Atlas whitelist and connection string.

**Module not found**: Ensure all dependencies are in `dependencies`, not `devDependencies`.
