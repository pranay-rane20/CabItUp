
# Documentation for `/user/register` Endpoint

## Overview

The `/user/register` endpoint is used to register a new user. This endpoint accepts user details such as email, full name, and password, performs validation, and creates a new user record in the database if the input is valid.

---

## Endpoint Details

### URL

`POST /user/register`

### Request Headers

- **Content-Type**: `application/json`

### Request Body

The endpoint expects a JSON payload with the following fields:

| Field                | Type   | Required | Description                                                         |
| -------------------- | ------ | -------- | ------------------------------------------------------------------- |
| `email`              | String | Yes      | The user's email address. Must be a valid email format and unique.  |
| `fullname.firstname` | String | Yes      | The user's first name. Must be at least 2 characters long.          |
| `fullname.lastname`  | String | Yes      | The user's last name. Must be at least 2 characters long.           |
| `password`           | String | Yes      | The user's password. Must be strong and at least 8 characters long. |

#### Example Request Body

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

---

## Validation Rules

- **Email**:
  - Must be a valid email address.
  - Must not already exist in the database.
- **Full Name**:
  - `firstname` and `lastname` are required.
  - Minimum length for both fields is 2 characters.
- **Password**:
  - Must be at least 8 characters long.
  - Must be a strong password, containing at least one uppercase letter, one lowercase letter, one digit, and one special character.

---

## Response Details

### Success Response

**Status Code**: `201 Created`

**Body**:

```json
{
  "message": "User created successfully",
  "user": {
    "_id": "640d2fef88a53d2ebf0c1234",
    "email": "johndoe@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "createdAt": "2025-01-26T12:00:00.000Z",
    "updatedAt": "2025-01-26T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses

#### Validation Errors

**Status Code**: `400 Bad Request`

**Body**:

```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "First Name is required", "param": "fullname.firstname", "location": "body" }
  ]
}
```

#### User Already Exists

**Status Code**: `400 Bad Request`

**Body**:

```json
{
  "message": "User with this email already exists"
}
```

#### Internal Server Error

**Status Code**: `500 Internal Server Error`

**Body**:

```json
{
  "message": "An unexpected error occurred"
}
```

---

## Notes

- Ensure that the `process.env.JWT_SECRET` is configured in your environment for token generation.
- Passwords are hashed before storing them in the database.
- For validation, the endpoint leverages `express-validator` middleware.
