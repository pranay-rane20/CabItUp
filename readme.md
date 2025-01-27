# Documentation for `/user/register`, `/user/login`, and `/user/profile` Endpoints

## Overview

This document provides comprehensive details about the `/user/register`, `/user/login`, and `/user/profile` endpoints for user registration, login, and profile management in the system.

---

## `/user/register` Endpoint

### Overview

The `/user/register` endpoint is designed for new users to create an account in the system. It accepts user details such as email, full name, and password, performs validation checks, and creates a new user record in the database if the input is valid. This endpoint is crucial for onboarding new users and ensuring that their information is securely stored.

### Endpoint Details

#### URL

`POST /user/register`

#### Request Headers

- **Content-Type**: `application/json`

#### Request Body

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

### Validation Rules

- **Email**:
  - Must be a valid email address.
  - Must not already exist in the database.
- **Full Name**:
  - `firstname` and `lastname` are required.
  - Minimum length for both fields is 2 characters.
- **Password**:
  - Must be at least 8 characters long.
  - Must be a strong password, containing at least one uppercase letter, one lowercase letter, one digit, and one special character.

### Response Details

#### Success Response

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

#### Error Responses

- **Validation Errors**: If the input data fails validation checks, the server will respond with a `400 Bad Request` status code and a list of errors detailing what went wrong.
- **User Already Exists**: If a user attempts to register with an email that is already in use, the server will respond with a `400 Bad Request` status code and a message indicating that the user already exists.
- **Internal Server Error**: In case of unexpected issues, the server will respond with a `500 Internal Server Error` status code.

---

## `/user/login` Endpoint

### Overview

The `/user/login` endpoint is used to authenticate existing users. It accepts the user's email and password, validates the credentials, and returns a JSON Web Token (JWT) for subsequent requests if the credentials are valid. This endpoint is essential for user authentication and session management.

### Endpoint Details

#### URL

`POST /user/login`

#### Request Headers

- **Content-Type**: `application/json`

#### Request Body

The endpoint expects a JSON payload with the following fields:

| Field     | Type   | Required | Description                                        |
| --------- | ------ | -------- | -------------------------------------------------- |
| `email`   | String | Yes      | The user's email address. Must be a valid email format. |
| `password`| String | Yes      | The user's password. Must match the stored password. |

#### Example Request Body

```json
{
  "email": "johndoe@example.com",
  "password": "StrongPassword123!"
}
```

### Validation Rules

- **Email**:
  - Must be a valid email address.
  - Must exist in the database.
- **Password**:
  - Must match the password stored in the database for the given email.

### Response Details

#### Success Response

**Status Code**: `200 OK`

**Body**:

```json
{
  "message": "Login successful",
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

#### Error Responses

- **Invalid Email or Password**: If the provided credentials are incorrect, the server will respond with a `401 Unauthorized` status code and a message indicating that the email or password is invalid.
- **Internal Server Error**: In case of unexpected issues, the server will respond with a `500 Internal Server Error` status code.

---

## `/user/profile` Endpoint

### Overview

The `/user/profile` endpoint allows authenticated users to retrieve and update their profile information. This endpoint requires a valid JSON Web Token (JWT) for authentication. It is essential for users to manage their personal information securely.

### Endpoint Details

#### URL

- **GET /user/profile**: Retrieve the user's profile information.
- **PUT /user/profile**: Update the user's profile information.

#### Request Headers

- **Content-Type**: `application/json`
- **Authorization**: `Bearer <token>`

#### GET Request

The GET request does not require a body. It retrieves the current user's profile information.

#### PUT Request

The PUT request expects a JSON payload with the fields that the user wishes to update, such as email, full name, or password.

### Response Details

#### Success Response

**Status Code**: `200 OK`

**Body**:

```json
{
  "user": {
    "_id": "640d2fef88a53d2ebf0c1234",
    "email": "johndoe@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "createdAt": "2025-01-26T12:00:00.000Z",
    "updatedAt": "2025-01-26T12:00:00.000Z"
  }
}
```

#### Error Responses

- **Unauthorized Access**: If the user is not authenticated, the server will respond with a `401 Unauthorized` status code.
- **Internal Server Error**: In case of unexpected issues, the server will respond with a `500 Internal Server Error` status code.

---

# Documentation for `/captain/register`, `/captain/login`, and `/captain/profile` Endpoints

## Overview

This document provides comprehensive details about the `/captain/register`, `/captain/login`, and `/captain/profile` endpoints for captain registration, login, and profile management in the system.

---

## `/captain/register` Endpoint

### Overview

The `/captain/register` endpoint is designed for new captains to create an account in the system. It accepts captain details such as email, full name, password, and vehicle information, performs validation checks, and creates a new captain record in the database if the input is valid. This endpoint is crucial for onboarding new captains and ensuring that their information is securely stored.

### Endpoint Details

#### URL

`POST /captain/register`

#### Request Headers

- **Content-Type**: `application/json`

#### Request Body

The endpoint expects a JSON payload with the following fields:

| Field                    | Type   | Required | Description                                                         |
| ------------------------ | ------ | -------- | ------------------------------------------------------------------- |
| `email`                  | String | Yes      | The captain's email address. Must be a valid email format and unique.  |
| `fullname.firstname`     | String | Yes      | The captain's first name. Must be at least 3 characters long.          |
| `fullname.lastname`      | String | Yes      | The captain's last name. Minimum length is 3 characters.           |
| `password`               | String | Yes      | The captain's password. Must be strong and at least 6 characters long. |
| `vehicle.color`          | String | Yes      | The color of the captain's vehicle. Must be at least 3 characters long. |
| `vehicle.plate`          | String | Yes      | The vehicle's plate number. Must be at least 3 characters long.    |
| `vehicle.capacity`       | Number | Yes      | The vehicle's capacity. Must be an integer greater than or equal to 1. |
| `vehicle.vehicleType`    | String | Yes      | The type of vehicle. Must be one of the following: `car`, `bike`, `auto`. |

#### Example Request Body

```json
{
  "email": "captain@example.com",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "password": "StrongPassword123!",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ 1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Validation Rules

- **Email**:
  - Must be a valid email address.
  - Must not already exist in the database.
- **Full Name**:
  - `firstname` and `lastname` are required.
  - Minimum length for both fields is 3 characters.
- **Password**:
  - Must be at least 6 characters long.
  - Must be a strong password, containing at least one uppercase letter, one lowercase letter, one digit, and one special character.
- **Vehicle**:
  - `color`, `plate`, and `vehicleType` are required.
  - `capacity` must be an integer greater than or equal to 1.

### Response Details

#### Success Response

**Status Code**: `201 Created`

**Body**:

```json
{
  "token": "JWT_TOKEN_HERE",
  "captain": {
    "_id": "640d2fef88a53d2ebf0c1234",
    "email": "captain@example.com",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "vehicle": {
      "color": "Red",
      "plate": "XYZ 1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "createdAt": "2025-01-26T12:00:00.000Z",
    "updatedAt": "2025-01-26T12:00:00.000Z"
  }
}
```

#### Error Responses

- **Validation Errors**: If the input data fails validation checks, the server will respond with a `400 Bad Request` status code and a list of errors detailing what went wrong.
- **Captain Already Exists**: If a captain attempts to register with an email that is already in use, the server will respond with a `400 Bad Request` status code and a message indicating that the captain already exists.
- **Internal Server Error**: In case of unexpected issues, the server will respond with a `500 Internal Server Error` status code.

---

## `/captain/login` Endpoint

### Overview

The `/captain/login` endpoint is used to authenticate existing captains. It accepts the captain's email and password, validates the credentials, and returns a JSON Web Token (JWT) for subsequent requests if the credentials are valid. This endpoint is essential for captain authentication and session management.

### Endpoint Details

#### URL

`POST /captain/login`

#### Request Headers

- **Content-Type**: `application/json`

#### Request Body

The endpoint expects a JSON payload with the following fields:

| Field     | Type   | Required | Description                                        |
| --------- | ------ | -------- | -------------------------------------------------- |
| `email`   | String | Yes      | The captain's email address. Must be a valid email format. |
| `password`| String | Yes      | The captain's password. Must match the stored password. |

#### Example Request Body

```json
{
  "email": "captain@example.com",
  "password": "StrongPassword123!"
}
```

### Validation Rules

- **Email**:
  - Must be a valid email address.
  - Must exist in the database.
- **Password**:
  - Must match the password stored in the database for the given email.

### Response Details

#### Success Response

**Status Code**: `200 OK`

**Body**:

```json
{
  "message": "Login successful",
  "captain": {
    "_id": "640d2fef88a53d2ebf0c1234",
    "email": "captain@example.com",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "vehicle": {
      "color": "Red",
      "plate": "XYZ 1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "createdAt": "2025-01-26T12:00:00.000Z",
    "updatedAt": "2025-01-26T12:00:00.000Z"
  },
  "token": "JWT_TOKEN_HERE"
}
```

#### Error Responses

- **Invalid Email or Password**: If the provided credentials are incorrect, the server will respond with a `401 Unauthorized` status code and a message indicating that the email or password is invalid.
- **Internal Server Error**: In case of unexpected issues, the server will respond with a `500 Internal Server Error` status code.

---

## `/captain/profile` Endpoint

### Overview

The `/captain/profile` endpoint allows authenticated captains to retrieve and update their profile information. This endpoint requires a valid JSON Web Token (JWT) for authentication. It is essential for captains to manage their personal information securely.

### Endpoint Details

#### URL

- **GET /captain/profile**: Retrieve the captain's profile information.
- **PUT /captain/profile**: Update the captain's profile information.

#### Request Headers

- **Content-Type**: `application/json`
- **Authorization**: `Bearer <token>`

#### GET Request

The GET request does not require a body. It retrieves the current captain's profile information.

#### PUT Request

The PUT request expects a JSON payload with the fields that the captain wishes to update, such as email, full name, password, or vehicle information.

### Response Details

#### Success Response

**Status Code**: `200 OK`

**Body**:

```json
{
  "captain": {
    "_id": "640d2fef88a53d2ebf0c1234",
    "email": "captain@example.com",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "vehicle": {
      "color": "Red",
      "plate": "XYZ 1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "createdAt": "2025-01-26T12:00:00.000Z",
    "updatedAt": "2025-01-26T12:00:00.000Z"
  }
}
```

#### Error Responses

- **Unauthorized Access**: If the captain is not authenticated, the server will respond with a `401 Unauthorized` status code.
- **Internal Server Error**: In case of unexpected issues, the server will respond with a `500 Internal Server Error` status code.

---

## Notes

- Ensure that the `process.env.JWT_SECRET` is configured in your environment for token generation.
- Passwords are hashed before storing them in the database.
- For validation, the endpoints leverage `express-validator` middleware.
- JWT tokens are used for authenticating users and captains in protected routes.