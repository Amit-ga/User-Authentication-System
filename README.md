# User-Authentication-System
A simple web application with user registration, login functionality, and a basic dashboard.

# 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Amit-ga/User-Authentication-System.git <desired-folder-name>
cd <folder-name>
```

### 2. Backend Setup (Flask)
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### 3. Frontend Setup (React with Vite)
```bash
cd frontend
npm install
npm start  # opens on http://localhost:3000
```

> The frontend will call the backend via `http://localhost:5000/api`. You can configure CORS or proxies as needed.

---

## API Documentation

All routes are under `/api`.

### POST `/api/register`
**Description:** Register a new user.
- **Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "confirmPassword": "string"
}
```
- **Response:**
```json
{
  "token": "JWT-token"
}
```

### POST `/api/login`
**Description:** Authenticate existing user.
- **Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response:**
```json
{
  "token": "JWT-token"
}
```

---

## Testing Instructions

### 1. Make sure `pytest` is installed:
```bash
pip install pytest
```

### 2. Run the tests
```bash
cd backend\tests
pytest test_auth.py
```

Tests include parameterized checks for:
- Valid/invalid registration
- Valid/invalid login
- Missing or mismatched credentials

---

## Additional Notes
- The frontend uses **PrimeReact** + **PrimeFlex** for UI components and styling.
- The backend uses **Flask** with **JWT** authentication and **bcrypt** for password hashing.
- JWT is decoded in the frontend to get the logged-in user’s email.
- Frontend form validation (password strength, matching fields) is performed before submission.
- Backend also validates credentials to ensure they haven’t been tampered with during transmission from the frontend.
  Additionally, it uses the email_validator library, which performs both syntax and domain verification for email addresses.
- Protected dashboard route only loads if a valid token is stored in localStorage.
