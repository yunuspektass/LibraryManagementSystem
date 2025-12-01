# Library Management System API Test Documentation

## Base URL
```
https://localhost:5001/api
```

## Test Environment Setup

1. Start the API server
2. Use a tool like Postman, curl, or HTTP client
3. Save the access token after login/register for authenticated requests

---

## Test Data

### Test Users

#### Regular User
```json
{
  "email": "testuser@library.com",
  "password": "Test123456"
}
```

#### Library Staff
```json
{
  "email": "staff@library.com",
  "password": "Staff123456"
}
```

---

## Test Scenarios

### 1. Authentication Tests

#### Test 1.1: Register New User
**Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@library.com",
  "password": "Password123"
}
```

**Expected Response:** `200 OK`
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

#### Test 1.2: Login with Valid Credentials
**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "testuser@library.com",
  "password": "Test123456"
}
```

**Expected Response:** `200 OK`
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

#### Test 1.3: Refresh Token
**Request:**
```http
POST /api/auth/refresh-token
Content-Type: application/json

{
  "accessToken": "{expired_access_token}",
  "refreshToken": "{refresh_token}"
}
```

**Expected Response:** `200 OK`
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

### 2. Author Tests

#### Test 2.1: Create Author
**Request:**
```http
POST /api/author
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane",
  "surname": "Austen",
  "birthDate": "1775-12-16",
  "biography": "Jane Austen was an English novelist known primarily for her six major novels."
}
```

**Expected Response:** `200 OK`

**Test Data:**
```json
{
  "name": "Jane",
  "surname": "Austen",
  "birthDate": "1775-12-16",
  "biography": "Jane Austen was an English novelist known primarily for her six major novels."
}
```

```json
{
  "name": "George",
  "surname": "Orwell",
  "birthDate": "1903-06-25",
  "biography": "Eric Arthur Blair, known by his pen name George Orwell, was an English novelist."
}
```

```json
{
  "name": "J.K.",
  "surname": "Rowling",
  "birthDate": "1965-07-31",
  "biography": "Joanne Rowling, known by her pen name J.K. Rowling, is a British author."
}
```

---

#### Test 2.2: Get All Authors
**Request:**
```http
GET /api/author
Authorization: Bearer {token}
```

**Expected Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Jane",
    "surname": "Austen",
    "birthDate": "1775-12-16"
  }
]
```

---

#### Test 2.3: Get Author by ID
**Request:**
```http
GET /api/author/1
Authorization: Bearer {token}
```

**Expected Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Jane",
  "surname": "Austen",
  "birthDate": "1775-12-16",
  "biography": "Jane Austen was an English novelist known primarily for her six major novels."
}
```

---

#### Test 2.4: Update Author
**Request:**
```http
PUT /api/author/1
Authorization: Bearer {token}
Content-Type: application/json

{
  "id": 1,
  "name": "Jane",
  "surname": "Austen",
  "birthDate": "1775-12-16",
  "biography": "Updated biography for Jane Austen."
}
```

**Expected Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Jane",
  "surname": "Austen",
  "birthDate": "1775-12-16",
  "biography": "Updated biography for Jane Austen."
}
```

---

### 3. Category Tests

#### Test 3.1: Create Category
**Request:**
```http
POST /api/category
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Fiction",
  "description": "Works of fiction including novels and short stories"
}
```

**Expected Response:** `200 OK`

**Test Data:**
```json
{
  "name": "Fiction",
  "description": "Works of fiction including novels and short stories"
}
```

```json
{
  "name": "Science Fiction",
  "description": "Speculative fiction dealing with imaginative concepts"
}
```

```json
{
  "name": "Mystery",
  "description": "Genre of literature focusing on solving a crime or puzzle"
}
```

```json
{
  "name": "Biography",
  "description": "Detailed account of someone's life written by someone else"
}
```

```json
{
  "name": "History",
  "description": "Study of past events and human affairs"
}
```

---

#### Test 3.2: Get All Categories
**Request:**
```http
GET /api/category
Authorization: Bearer {token}
```

**Expected Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Fiction",
    "description": "Works of fiction including novels and short stories"
  }
]
```

---

#### Test 3.3: Get Category by ID
**Request:**
```http
GET /api/category/1
Authorization: Bearer {token}
```

**Expected Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Fiction",
  "description": "Works of fiction including novels and short stories"
}
```

---

#### Test 3.4: Update Category
**Request:**
```http
PUT /api/category/1
Authorization: Bearer {token}
Content-Type: application/json

{
  "id": 1,
  "name": "Updated Fiction",
  "description": "Updated description"
}
```

**Expected Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Updated Fiction",
  "description": "Updated description"
}
```

---

### 4. Book Tests

#### Test 4.1: Create Book
**Request:**
```http
POST /api/book
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Pride and Prejudice",
  "authorId": 1,
  "categoryId": 1,
  "isbn": "978-0141439518",
  "publishDate": "1813-01-28",
  "isAvailable": true
}
```

**Expected Response:** `200 OK`

**Test Data:**
```json
{
  "title": "Pride and Prejudice",
  "authorId": 1,
  "categoryId": 1,
  "isbn": "978-0141439518",
  "publishDate": "1813-01-28",
  "isAvailable": true
}
```

```json
{
  "title": "1984",
  "authorId": 2,
  "categoryId": 2,
  "isbn": "978-0451524935",
  "publishDate": "1949-06-08",
  "isAvailable": true
}
```

```json
{
  "title": "Animal Farm",
  "authorId": 2,
  "categoryId": 2,
  "isbn": "978-0451526342",
  "publishDate": "1945-08-17",
  "isAvailable": true
}
```

```json
{
  "title": "Harry Potter and the Philosopher's Stone",
  "authorId": 3,
  "categoryId": 1,
  "isbn": "978-0747532699",
  "publishDate": "1997-06-26",
  "isAvailable": true
}
```

```json
{
  "title": "The Hobbit",
  "authorId": 1,
  "categoryId": 1,
  "isbn": "978-0547928227",
  "publishDate": "1937-09-21",
  "isAvailable": true
}
```

---

#### Test 4.2: Get All Books
**Request:**
```http
GET /api/book
Authorization: Bearer {token}
```

**Expected Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Pride and Prejudice",
    "authorId": 1,
    "categoryId": 1,
    "isbn": "978-0141439518",
    "publishDate": "1813-01-28",
    "isAvailable": true
  }
]
```

---

#### Test 4.3: Get Book by ID
**Request:**
```http
GET /api/book/1
Authorization: Bearer {token}
```

**Expected Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Pride and Prejudice",
  "authorId": 1,
  "categoryId": 1,
  "isbn": "978-0141439518",
  "publishDate": "1813-01-28",
  "isAvailable": true
}
```

---

#### Test 4.4: Update Book
**Request:**
```http
PUT /api/book/1
Authorization: Bearer {token}
Content-Type: application/json

{
  "id": 1,
  "title": "Pride and Prejudice",
  "authorId": 1,
  "categoryId": 1,
  "isbn": "978-0141439518",
  "publishDate": "1813-01-28",
  "isAvailable": false
}
```

**Expected Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Pride and Prejudice",
  "authorId": 1,
  "categoryId": 1,
  "isbn": "978-0141439518",
  "publishDate": "1813-01-28",
  "isAvailable": false
}
```

---

### 5. User Tests

#### Test 5.1: Create User
**Request:**
```http
POST /api/user
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": "member1@library.com",
  "password": "Member123456",
  "name": "Alice",
  "surname": "Johnson",
  "phone": "+1-555-0101",
  "registrationDate": "2024-01-15T00:00:00Z"
}
```

**Expected Response:** `200 OK`

**Test Data:**
```json
{
  "email": "member1@library.com",
  "password": "Member123456",
  "name": "Alice",
  "surname": "Johnson",
  "phone": "+1-555-0101",
  "registrationDate": "2024-01-15T00:00:00Z"
}
```

```json
{
  "email": "member2@library.com",
  "password": "Member123456",
  "name": "Bob",
  "surname": "Smith",
  "phone": "+1-555-0102",
  "registrationDate": "2024-02-01T00:00:00Z"
}
```

```json
{
  "email": "member3@library.com",
  "password": "Member123456",
  "name": "Carol",
  "surname": "Williams",
  "phone": "+1-555-0103",
  "registrationDate": "2024-03-01T00:00:00Z"
}
```

---

#### Test 5.2: Get All Users
**Request:**
```http
GET /api/user
Authorization: Bearer {token}
```

**Expected Response:** `200 OK`
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

#### Test 5.3: Get User by ID
**Request:**
```http
GET /api/user/1
Authorization: Bearer {token}
```

**Expected Response:** `200 OK`
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

#### Test 5.4: Update User
**Request:**
```http
PUT /api/user/1
Authorization: Bearer {token}
Content-Type: application/json

{
  "id": 1,
  "email": "updated@library.com",
  "name": "Alice",
  "surname": "Johnson-Updated",
  "phone": "+1-555-9999",
  "registrationDate": "2024-01-15T00:00:00Z"
}
```

**Expected Response:** `200 OK`
```json
{
  "id": 1,
  "email": "updated@library.com",
  "name": "Alice",
  "surname": "Johnson-Updated",
  "phone": "+1-555-9999",
  "registrationDate": "2024-01-15T00:00:00Z",
  "borrowRecordIds": [1, 2, 3]
}
```

---

### 6. BorrowRecord Tests

#### Test 6.1: Create Borrow Record
**Request:**
```http
POST /api/borrowrecord
Authorization: Bearer {token}
Content-Type: application/json

{
  "bookId": 1,
  "userId": 1,
  "borrowDate": "2024-11-01",
  "returnDate": null,
  "isReturned": false
}
```

**Expected Response:** `200 OK`

**Test Data:**
```json
{
  "bookId": 1,
  "userId": 1,
  "borrowDate": "2024-11-01",
  "returnDate": null,
  "isReturned": false
}
```

```json
{
  "bookId": 2,
  "userId": 2,
  "borrowDate": "2024-11-05",
  "returnDate": null,
  "isReturned": false
}
```

```json
{
  "bookId": 3,
  "userId": 1,
  "borrowDate": "2024-10-15",
  "returnDate": "2024-10-30",
  "isReturned": true
}
```

---

#### Test 6.2: Get All Borrow Records
**Request:**
```http
GET /api/borrowrecord
Authorization: Bearer {token}
```

**Expected Response:** `200 OK`
```json
[
  {
    "id": 1,
    "bookId": 1,
    "userId": 1,
    "borrowDate": "2024-11-01",
    "returnDate": null,
    "isReturned": false
  }
]
```

---

#### Test 6.3: Get Borrow Record by ID
**Request:**
```http
GET /api/borrowrecord/1
Authorization: Bearer {token}
```

**Expected Response:** `200 OK`
```json
{
  "id": 1,
  "bookId": 1,
  "userId": 1,
  "borrowDate": "2024-11-01",
  "returnDate": "2024-11-15",
  "isReturned": true
}
```

---

#### Test 6.4: Update Borrow Record
**Request:**
```http
PUT /api/borrowrecord/1
Authorization: Bearer {token}
Content-Type: application/json

{
  "id": 1,
  "bookId": 1,
  "userId": 1,
  "borrowDate": "2024-11-01",
  "returnDate": "2024-11-15",
  "isReturned": true
}
```

**Expected Response:** `200 OK`
```json
{
  "id": 1,
  "bookId": 1,
  "userId": 1,
  "borrowDate": "2024-11-01",
  "returnDate": "2024-11-15",
  "isReturned": true
}
```

---

## Test Execution Order

### Initial Setup
1. **Register User** (Test 1.1) - Save token as `{token}`
2. **Login** (Test 1.2) - Get access token

### Data Creation
3. **Create Categories** (Test 3.1) - Create all test categories
4. **Create Authors** (Test 2.1) - Create all test authors
5. **Create Books** (Test 4.1) - Create all test books (use IDs from step 3-4)
6. **Create Users** (Test 5.1) - Create test member users

### CRUD Operations
7. **Get All Authors** (Test 2.2)
8. **Get Author by ID** (Test 2.3)
9. **Update Author** (Test 2.4)
10. **Get All Categories** (Test 3.2)
11. **Get Category by ID** (Test 3.3)
12. **Update Category** (Test 3.4)
13. **Get All Books** (Test 4.2)
14. **Get Book by ID** (Test 4.3)
15. **Update Book** (Test 4.4)
16. **Get All Users** (Test 5.2)
17. **Get User by ID** (Test 5.3)
18. **Update User** (Test 5.4)
19. **Create Borrow Record** (Test 6.1) - Use IDs from step 5-6
20. **Get All Borrow Records** (Test 6.2)
21. **Get Borrow Record by ID** (Test 6.3)
22. **Update Borrow Record** (Test 6.4)

---

## Postman Collection Structure

```
Library Management System API
├── Authentication
│   ├── Register
│   ├── Login
│   └── Refresh Token
├── Authors
│   ├── Get All Authors
│   ├── Get Author by ID
│   ├── Create Author
│   └── Update Author
├── Categories
│   ├── Get All Categories
│   ├── Get Category by ID
│   ├── Create Category
│   └── Update Category
├── Books
│   ├── Get All Books
│   ├── Get Book by ID
│   ├── Create Book
│   └── Update Book
├── Users
│   ├── Get All Users
│   ├── Get User by ID
│   ├── Create User
│   └── Update User
└── BorrowRecords
    ├── Get All Borrow Records
    ├── Get Borrow Record by ID
    ├── Create Borrow Record
    └── Update Borrow Record
```

---

## Notes

- **Important:** Create entities in this order: Categories → Authors → Books → Users → BorrowRecords
- All dates should be in ISO 8601 format (YYYY-MM-DD for dates, YYYY-MM-DDTHH:mm:ssZ for datetime)
- Save tokens after login/register for authenticated requests
- All endpoints require authentication - include `Authorization: Bearer {token}` header
- Use actual IDs returned from create operations in subsequent tests
- All test data is provided above - copy directly into requests
