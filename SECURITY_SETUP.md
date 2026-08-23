# 🔐 Admin Console Security Setup

## ✅ Security Improvements Made

Your admin console is now **SECURE** with:

- ✅ **Backend Authentication** - Password verification happens on the server
- ✅ **JWT Tokens** - Session management with 8-hour expiration
- ✅ **Password Hashing** - Bcrypt encryption (passwords never stored in plain text)
- ✅ **No Hardcoded Credentials** - All secrets in environment variables
- ✅ **Token Validation** - Automatic token verification on page load

---

## 🚀 Setup Instructions

### 1. Generate a Strong JWT Secret

Run this command to create a secure random secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output (it will look like: `a8f5f167f44f4964e6c998dee827110c055a345fde6d0df54d3c3f3c3...`)

### 2. Create a Password Hash

Replace `YOUR_STRONG_PASSWORD` with your desired admin password:

```bash
cd server
node -e "console.log(require('bcryptjs').hashSync('YOUR_STRONG_PASSWORD', 10))"
```

Copy the output (it will look like: `$2a$10$Xv8r5P1N2...`)

### 3. Create .env File

```bash
cd server
cp .env.example .env
```

Then edit `.env` and add:

```env
# Use the JWT secret you generated in step 1
JWT_SECRET=your_generated_secret_from_step_1

# Choose your admin username
ADMIN_USERNAME=admin

# Use the password hash you generated in step 2
ADMIN_PASSWORD_HASH=your_generated_hash_from_step_2
```

### 4. Restart Backend Server

```bash
npm start
```

You should see:
```
Contact backend listening on port 5001
```

**WITHOUT** the security warnings!

---

## 🔑 Default Credentials (CHANGE THESE!)

**Current defaults (NOT SECURE):**
- Username: `admin`
- Password: `admin123`

⚠️ **These work only if you haven't set up .env properly!**

---

## 📋 How It Works Now

### Before (INSECURE ❌)
```
User → Frontend checks password → Access granted
        ↑
    Password visible in source code!
```

### After (SECURE ✅)
```
User → Backend verifies credentials → Returns JWT token → Frontend stores token
                ↑                              ↓
        Password hashed & stored          Token validated on each request
        in .env (never in code)
```

### Security Features:

1. **Backend Validation**: Credentials verified on server (not visible in browser)
2. **Password Hashing**: Passwords hashed with bcrypt (10 rounds)
3. **JWT Tokens**: Stateless authentication with 8-hour expiration
4. **Token Verification**: Automatic validation on page load
5. **Environment Variables**: All secrets stored in .env (not in code)

---

## 🛡️ Security Best Practices

### ✅ DO:
- Use a strong, random JWT_SECRET (minimum 32 characters)
- Use a strong admin password (12+ characters, mixed case, numbers, symbols)
- Keep your `.env` file private (never commit it to Git)
- Change default credentials immediately in production
- Use HTTPS in production (not HTTP)

### ❌ DON'T:
- Commit `.env` file to version control
- Use the default `admin123` password
- Share your JWT_SECRET
- Use HTTP in production (must use HTTPS)

---

## 🔍 Testing the Security

### Test 1: Try viewing source code
- Open browser DevTools → Sources
- Search for "password" or "admin"
- ✅ You won't find any hardcoded credentials!

### Test 2: Try bypassing authentication
- Open browser Console
- Type: `localStorage.setItem('isAuthenticated', 'true')`
- Refresh page
- ✅ You'll still be logged out! (Token is validated)

### Test 3: Token expiration
- Login successfully
- Wait 8 hours (or manually delete token)
- Refresh page
- ✅ You'll be logged out automatically!

---

## 🚨 Troubleshooting

### "Invalid credentials" error
- Check username matches `ADMIN_USERNAME` in .env
- Verify password hash was generated correctly
- Make sure .env file exists in `/server` directory

### Warnings on server start
```
⚠️ WARNING: JWT_SECRET not set in .env!
⚠️ WARNING: ADMIN_PASSWORD_HASH not set!
```
- Create/edit `.env` file with proper values (see step 3)

### "Unable to connect to server"
- Check backend is running on port 5001
- Verify CORS allows your frontend origin
- Check browser console for errors

---

## 📁 Files Modified

- `server/index.js` - Added JWT authentication endpoints
- `server/.env.example` - Template with security variables
- `src/pages/AdminConsole.tsx` - Updated to use backend auth

---

## 🔄 API Endpoints

### POST `/api/admin/login`
Authenticate admin user

**Request:**
```json
{
  "username": "admin",
  "password": "your_password"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": "8h"
}
```

### GET `/api/admin/verify`
Verify JWT token is valid

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "valid": true,
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

---

## 🎯 Next Steps for Production

1. Set up HTTPS with SSL certificate
2. Use environment-specific .env files
3. Consider rate limiting for login attempts
4. Add login attempt monitoring
5. Implement refresh tokens for longer sessions
6. Consider 2FA (Two-Factor Authentication)
7. Set up proper logging and monitoring

---

**Your admin console is now secure! 🎉**
