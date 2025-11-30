# Library Management System API Documentation

## Base URL
```
https://localhost:5001/api
```

## Authentication

The API uses JWT (JSON Web Token) for authentication. Most endpoints require authentication. Include the token in the Authorization header:

```
Authorization: Bearer {your_access_token}
```

### Roles

- **User**: Regular library users who can read data
- **LibraryStaff**: Library staff members who can read and modify data

## Endpoints

### Authentication Endpoints

#### 1. Register
Register a new user account.

**Endpoint:** `POST /api/auth/register`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

**Response:** `200 OK`
```json
{
  "isSuccess": true,
  "message": "User created successfully.",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "expiresAt": "2024-12-01T12:00:00Z"
  }
}
```

---

#### 2. Login
Login with email and password.

**Endpoint:** `POST /api/auth/login`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

**Response:** `200 OK`
```json
{
  "isSuccess": true,
  "message": "Login successful.",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "expiresAt": "2024-12-01T12:00:00Z"
  }
}
```

---

#### 3. Refresh Token
Refresh an expired access token using a refresh token.

**Endpoint:** `POST /api/auth/refresh-token`

**Authentication:** Not required

**Request Body:**
```json
{
  "accessToken": "expired_access_token",
  "refreshToken": "refresh_token_here"
}
```

**Response:** `200 OK`
```json
{
  "isSuccess": true,
  "message": "Token refreshed successfully.",
  "data": {
    "accessToken": "new_access_token",
    "refreshToken": "new_refresh_token",
    "expiresAt": "2024-12-01T12:00:00Z"
  }
}
```

---

### Author Endpoints

#### 1. Get All Authors
Get a list of all authors.

**Endpoint:** `GET /api/author`

**Authentication:** Required (User or LibraryStaff)

**Query Parameters:**
- `startDate` (optional): Filter authors by birth date start
- `endDate` (optional): Filter authors by birth date end

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "John",
    "surname": "Doe",
    "birthDate": "1980-01-15"
  }
]
```

---

#### 2. Get Author by ID
Get a specific author by ID.

**Endpoint:** `GET /api/author/{id}`

**Authentication:** Required (User or LibraryStaff)

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "John",
  "surname": "Doe",
  "birthDate": "1980-01-15",
  "biography": "A renowned author..."
}
```

---

#### 3. Create Author
Create a new author.

**Endpoint:** `POST /api/author`

**Authentication:** Required (LibraryStaff only)

**Request Body:**
```json
{
  "name": "John",
  "surname": "Doe",
  "birthDate": "1980-01-15",
  "biography": "A renowned author..."
}
```

**Response:** `200 OK`
```json
{
  "name": "John",
  "surname": "Doe",
  "birthDate": "1980-01-15",
  "biography": "A renowned author..."
}
```

---

#### 4. Update Author
Update an existing author.

**Endpoint:** `PUT /api/author/{id}`

**Authentication:** Required (LibraryStaff only)

**Request Body:**
```json
{
  "id": 1,
  "name": "John",
  "surname": "Smith",
  "birthDate": "1980-01-15",
  "biography": "Updated biography..."
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "John",
  "surname": "Smith",
  "birthDate": "1980-01-15",
  "biography": "Updated biography..."
}
```

---

### Book Endpoints

#### 1. Get All Books
Get a list of all books.

**Endpoint:** `GET /api/book`

**Authentication:** Required (User or LibraryStaff)

**Query Parameters:**
- `startDate` (optional): Filter books by publish date start
- `endDate` (optional): Filter books by publish date end

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Example Book",
    "authorId": 1,
    "categoryId": 1,
    "isbn": "978-0123456789",
    "publishDate": "2020-01-01",
    "isAvailable": true
  }
]
```

---

#### 2. Get Book by ID
Get a specific book by ID.

**Endpoint:** `GET /api/book/{id}`

**Authentication:** Required (User or LibraryStaff)

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Example Book",
  "authorId": 1,
  "categoryId": 1,
  "isbn": "978-0123456789",
  "publishDate": "2020-01-01",
  "isAvailable": true
}
```

---

#### 3. Create Book
Create a new book.

**Endpoint:** `POST /api/book`

**Authentication:** Required (LibraryStaff only)

**Request Body:**
```json
{
  "title": "Example Book",
  "authorId": 1,
  "categoryId": 1,
  "isbn": "978-0123456789",
  "publishDate": "2020-01-01",
  "isAvailable": true
}
```

**Response:** `200 OK`
```json
{
  "title": "Example Book",
  "authorId": 1,
  "categoryId": 1,
  "isbn": "978-0123456789",
  "publishDate": "2020-01-01",
  "isAvailable": true
}
```

---

#### 4. Update Book
Update an existing book.

**Endpoint:** `PUT /api/book/{id}`

**Authentication:** Required (LibraryStaff only)

**Request Body:**
```json
{
  "id": 1,
  "title": "Updated Book Title",
  "authorId": 1,
  "categoryId": 1,
  "isbn": "978-0123456789",
  "publishDate": "2020-01-01",
  "isAvailable": false
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Updated Book Title",
  "authorId": 1,
  "categoryId": 1,
  "isbn": "978-0123456789",
  "publishDate": "2020-01-01",
  "isAvailable": false
}
```

---

### Category Endpoints

#### 1. Get All Categories
Get a list of all categories.

**Endpoint:** `GET /api/category`

**Authentication:** Required (User or LibraryStaff)

**Query Parameters:**
- `startDate` (optional): Not used currently
- `endDate` (optional): Not used currently

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Fiction",
    "description": "Fictional books"
  }
]
```

---

#### 2. Get Category by ID
Get a specific category by ID.

**Endpoint:** `GET /api/category/{id}`

**Authentication:** Required (User or LibraryStaff)

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Fiction",
  "description": "Fictional books"
}
```

---

#### 3. Create Category
Create a new category.

**Endpoint:** `POST /api/category`

**Authentication:** Required (LibraryStaff only)

**Request Body:**
```json
{
  "name": "Fiction",
  "description": "Fictional books"
}
```

**Response:** `200 OK`
```json
{
  "name": "Fiction",
  "description": "Fictional books"
}
```

---

#### 4. Update Category
Update an existing category.

**Endpoint:** `PUT /api/category/{id}`

**Authentication:** Required (LibraryStaff only)

**Request Body:**
```json
{
  "id": 1,
  "name": "Science Fiction",
  "description": "Updated description"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Science Fiction",
  "description": "Updated description"
}
```

---

### User Endpoints

#### 1. Get All Users
Get a list of all users.

**Endpoint:** `GET /api/user`

**Authentication:** Required (LibraryStaff only)

**Query Parameters:**
- `startDate` (optional): Filter users by registration date start
- `endDate` (optional): Filter users by registration date end

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "name": "John",
    "surname": "Doe",
    "phone": "+1234567890",
    "registrationDate": "2024-01-01T00:00:00Z"
  }
]
```

---

#### 2. Get User by ID
Get a specific user by ID.

**Endpoint:** `GET /api/user/{id}`

**Authentication:** Required (User or LibraryStaff)

**Response:** `200 OK`
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John",
  "surname": "Doe",
  "phone": "+1234567890",
  "registrationDate": "2024-01-01T00:00:00Z",
  "borrowRecordIds": [1, 2, 3]
}
```

---

#### 3. Create User
Create a new user (LibraryStaff only).

**Endpoint:** `POST /api/user`

**Authentication:** Required (LibraryStaff only)

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "Password123",
  "name": "Jane",
  "surname": "Smith",
  "phone": "+1234567890",
  "registrationDate": "2024-01-01T00:00:00Z"
}
```

**Response:** `200 OK`
```json
{
  "email": "newuser@example.com",
  "password": "",
  "name": "Jane",
  "surname": "Smith",
  "phone": "+1234567890",
  "registrationDate": "2024-01-01T00:00:00Z"
}
```

---

#### 4. Update User
Update an existing user.

**Endpoint:** `PUT /api/user/{id}`

**Authentication:** Required (LibraryStaff only)

**Request Body:**
```json
{
  "id": 1,
  "email": "updated@example.com",
  "name": "John",
  "surname": "Updated",
  "phone": "+9876543210",
  "registrationDate": "2024-01-01T00:00:00Z"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "email": "updated@example.com",
  "name": "John",
  "surname": "Updated",
  "phone": "+9876543210",
  "registrationDate": "2024-01-01T00:00:00Z",
  "borrowRecordIds": [1, 2, 3]
}
```

---

### BorrowRecord Endpoints

#### 1. Get All Borrow Records
Get a list of all borrow records.

**Endpoint:** `GET /api/borrowrecord`

**Authentication:** Required (User or LibraryStaff)

**Query Parameters:**
- `startDate` (optional): Filter records by borrow date start
- `endDate` (optional): Filter records by borrow date end

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "bookId": 1,
    "userId": 1,
    "borrowDate": "2024-01-01",
    "returnDate": null,
    "isReturned": false
  }
]
```

---

#### 2. Get Borrow Record by ID
Get a specific borrow record by ID.

**Endpoint:** `GET /api/borrowrecord/{id}`

**Authentication:** Required (User or LibraryStaff)

**Response:** `200 OK`
```json
{
  "id": 1,
  "bookId": 1,
  "userId": 1,
  "borrowDate": "2024-01-01",
  "returnDate": "2024-01-15",
  "isReturned": true
}
```

---

#### 3. Create Borrow Record
Create a new borrow record.

**Endpoint:** `POST /api/borrowrecord`

**Authentication:** Required (LibraryStaff only)

**Request Body:**
```json
{
  "bookId": 1,
  "userId": 1,
  "borrowDate": "2024-01-01",
  "returnDate": null,
  "isReturned": false
}
```

**Response:** `200 OK`
```json
{
  "bookId": 1,
  "userId": 1,
  "borrowDate": "2024-01-01",
  "returnDate": null,
  "isReturned": false
}
```

---

#### 4. Update Borrow Record
Update an existing borrow record (e.g., mark as returned).

**Endpoint:** `PUT /api/borrowrecord/{id}`

**Authentication:** Required (LibraryStaff only)

**Request Body:**
```json
{
  "id": 1,
  "bookId": 1,
  "userId": 1,
  "borrowDate": "2024-01-01",
  "returnDate": "2024-01-15",
  "isReturned": true
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "bookId": 1,
  "userId": 1,
  "borrowDate": "2024-01-01",
  "returnDate": "2024-01-15",
  "isReturned": true
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "isSuccess": false,
  "message": "Invalid data format."
}
```

### 401 Unauthorized
```json
{
  "isSuccess": false,
  "message": "Invalid email or password."
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

---

## Notes

- All dates should be in ISO 8601 format
- Password minimum length is 6 characters
- Email addresses must be valid email format
- All ID fields are integers
- Soft deletion is implemented - deleted entities are filtered out automatically
- Authorization policies:
  - GET endpoints: User or LibraryStaff
  - POST/PUT/DELETE endpoints: LibraryStaff only
  - User list endpoint: LibraryStaff only

