
# API Documentation

This document provides detailed information about the endpoints for the `CabItUp` application, including routes for users and captains.

---

## User Routes

### 1. `/user/register`

#### **Overview**

The `/user/register` endpoint is used to register a new user. This endpoint accepts user details, validates the input, and creates a new user record.

#### **Endpoint Details**

- **URL**: `POST /user/register`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "password": "StrongPassword123!"
  }
  ```
- **Response**:
  - Success: `201 Created`
  - Error: `400 Bad Request`, `500 Internal Server Error`

---

### 2. `/user/login`

#### **Overview**

Authenticates a user and returns a JWT token for subsequent requests.

#### **Endpoint Details**

- **URL**: `POST /user/login`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "StrongPassword123!"
  }
  ```
- **Response**:
  - Success: `200 OK`
  - Error: `401 Unauthorized`, `500 Internal Server Error`

---

### 3. `/user/logout`

#### **Overview**

Logs out an authenticated user by invalidating their token.

#### **Endpoint Details**

- **URL**: `POST /user/logout`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  - Success: `200 OK`
  - Error: `401 Unauthorized`

---

### 4. `/user/profile`

#### **Overview**

Allows authenticated users to retrieve and update their profile information.

#### **Endpoint Details**

- **URL**: 
  - `GET /user/profile`: Retrieve profile
  - `PUT /user/profile`: Update profile
- **Headers**: `Authorization: Bearer <token>`
- **Request Body for PUT**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "phone": "1234567890"
  }
  ```
- **Response**:
  - Success: `200 OK`
  - Error: `400 Bad Request`, `401 Unauthorized`

---

## Captain Routes

### 1. `/captain/register`

#### **Overview**

The `/captain/register` endpoint is used to register a new captain. This includes details about the captain and their vehicle.

#### **Endpoint Details**

- **URL**: `POST /captain/register`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Jane Smith",
    "email": "janesmith@example.com",
    "password": "SecurePass456!",
    "phone": "9876543210",
    "vehicleDetails": {
      "model": "Toyota Prius",
      "license": "XYZ1234"
    }
  }
  ```
- **Response**:
  - Success: `201 Created`
  - Error: `400 Bad Request`, `500 Internal Server Error`

---

## Notes

- Ensure all environment variables (e.g., `JWT_SECRET`, `DB_URI`) are properly configured.
- Use a strong hashing mechanism (e.g., bcrypt) for passwords.
- JWT tokens are required for authentication in protected routes.
- All endpoints follow RESTful conventions.
