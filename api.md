# API Documentation - Financial Management System

## Base URL

```
http://localhost:8000/api
```

## Authentication

API sử dụng Laravel Sanctum để xác thực. Sau khi đăng nhập/đăng ký, bạn sẽ nhận được token. Thêm token vào header của mỗi request:

```
Authorization: Bearer {your_token}
```

---

## 1. Authentication APIs

### 1.1. Đăng ký tài khoản

**Endpoint:** `POST /api/register`

**Request Body:**

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**

```json
{
  "message": "Đăng ký thành công",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "created_at": "2025-10-07T10:30:00.000000Z",
    "updated_at": "2025-10-07T10:30:00.000000Z"
  },
  "token": "1|abcdefghijklmnopqrstuvwxyz123456789"
}
```

**Validation Rules:**

- `username`: required, string, max 50 characters, unique
- `email`: required, email format, unique
- `password`: required, string, min 6 characters

---

### 1.2. Đăng nhập

**Endpoint:** `POST /api/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**

```json
{
  "message": "Đăng nhập thành công",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "created_at": "2025-10-07T10:30:00.000000Z",
    "updated_at": "2025-10-07T10:30:00.000000Z"
  },
  "token": "2|xyz789abc456def123ghi456jkl789mno"
}
```

**Error Response (422 Unprocessable Entity):**

```json
{
  "message": "The email field is required.",
  "errors": {
    "email": ["Email hoặc mật khẩu không chính xác"]
  }
}
```

---

### 1.3. Đăng xuất

**Endpoint:** `POST /api/logout`

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "message": "Đăng xuất thành công"
}
```

---

### 1.4. Lấy thông tin user hiện tại

**Endpoint:** `GET /api/me`

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "created_at": "2025-10-07T10:30:00.000000Z",
  "updated_at": "2025-10-07T10:30:00.000000Z"
}
```

---

## 2. Wallet APIs (Quản lý ví)

### 2.1. Lấy danh sách ví

**Endpoint:** `GET /api/wallets`

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "wallets": [
    {
      "id": 1,
      "user_id": 1,
      "name": "Tiền mặt",
      "type": "cash",
      "balance": "5000000.00",
      "created_at": "2025-10-07T10:30:00.000000Z",
      "updated_at": "2025-10-07T10:30:00.000000Z"
    },
    {
      "id": 2,
      "user_id": 1,
      "name": "Tài khoản Vietcombank",
      "type": "bank",
      "balance": "10000000.00",
      "created_at": "2025-10-07T10:30:00.000000Z",
      "updated_at": "2025-10-07T10:30:00.000000Z"
    },
    {
      "id": 3,
      "user_id": 1,
      "name": "Ví MoMo",
      "type": "ewallet",
      "balance": "2000000.00",
      "created_at": "2025-10-07T10:30:00.000000Z",
      "updated_at": "2025-10-07T10:30:00.000000Z"
    }
  ],
  "total_balance": "17000000.00"
}
```

---

### 2.2. Tạo ví mới

**Endpoint:** `POST /api/wallets`

**Headers:**

```
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "name": "Ví Momo",
  "type": "ewallet",
  "balance": 1000000
}
```

**Response (201 Created):**

```json
{
  "message": "Tạo ví thành công",
  "wallet": {
    "id": 4,
    "user_id": 1,
    "name": "Ví Momo",
    "type": "ewallet",
    "balance": "1000000.00",
    "created_at": "2025-10-07T10:35:00.000000Z",
    "updated_at": "2025-10-07T10:35:00.000000Z"
  }
}
```

**Validation Rules:**

- `name`: required, string, max 100 characters
- `type`: required, enum (cash, bank, ewallet)
- `balance`: required, numeric, min 0

---

### 2.3. Xem chi tiết ví

**Endpoint:** `GET /api/wallets/{id}`

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "id": 1,
  "user_id": 1,
  "name": "Tiền mặt",
  "type": "cash",
  "balance": "5000000.00",
  "created_at": "2025-10-07T10:30:00.000000Z",
  "updated_at": "2025-10-07T10:30:00.000000Z"
}
```

---

### 2.4. Cập nhật ví

**Endpoint:** `PUT /api/wallets/{id}`

**Headers:**

```
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "name": "Tiền mặt chính",
  "balance": 6000000
}
```

**Response (200 OK):**

```json
{
  "message": "Cập nhật ví thành công",
  "wallet": {
    "id": 1,
    "user_id": 1,
    "name": "Tiền mặt chính",
    "type": "cash",
    "balance": "6000000.00",
    "created_at": "2025-10-07T10:30:00.000000Z",
    "updated_at": "2025-10-07T10:40:00.000000Z"
  }
}
```

---

### 2.5. Xóa ví

**Endpoint:** `DELETE /api/wallets/{id}`

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "message": "Xóa ví thành công"
}
```

---

## 3. Category APIs (Quản lý danh mục)

### 3.1. Lấy danh sách danh mục

**Endpoint:** `GET /api/categories`

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "user_id": 1,
    "name": "Lương",
    "type": "income",
    "icon": "💰",
    "created_at": "2025-10-07T10:30:00.000000Z",
    "updated_at": "2025-10-07T10:30:00.000000Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "name": "Ăn uống",
    "type": "expense",
    "icon": "🍔",
    "created_at": "2025-10-07T10:30:00.000000Z",
    "updated_at": "2025-10-07T10:30:00.000000Z"
  },
  {
    "id": 3,
    "user_id": 1,
    "name": "Di chuyển",
    "type": "expense",
    "icon": "🚗",
    "created_at": "2025-10-07T10:30:00.000000Z",
    "updated_at": "2025-10-07T10:30:00.000000Z"
  }
]
```

---

### 3.2. Tạo danh mục mới

**Endpoint:** `POST /api/categories`

**Headers:**

```
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "name": "Mua sắm",
  "type": "expense",
  "icon": "🛒"
}
```

**Response (201 Created):**

```json
{
  "message": "Tạo danh mục thành công",
  "category": {
    "id": 6,
    "user_id": 1,
    "name": "Mua sắm",
    "type": "expense",
    "icon": "🛒",
    "created_at": "2025-10-07T10:45:00.000000Z",
    "updated_at": "2025-10-07T10:45:00.000000Z"
  }
}
```

**Validation Rules:**

- `name`: required, string, max 100 characters
- `type`: required, enum (income, expense)
- `icon`: nullable, string, max 50 characters

---

### 3.3. Cập nhật danh mục

**Endpoint:** `PUT /api/categories/{id}`

**Headers:**

```
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "name": "Shopping",
  "icon": "🛍️"
}
```

**Response (200 OK):**

```json
{
  "message": "Cập nhật danh mục thành công",
  "category": {
    "id": 6,
    "user_id": 1,
    "name": "Shopping",
    "type": "expense",
    "icon": "🛍️",
    "created_at": "2025-10-07T10:45:00.000000Z",
    "updated_at": "2025-10-07T10:50:00.000000Z"
  }
}
```

---

### 3.4. Xóa danh mục

**Endpoint:** `DELETE /api/categories/{id}`

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "message": "Xóa danh mục thành công"
}
```

---

## 4. Transaction APIs (Quản lý giao dịch)

### 4.1. Lấy danh sách giao dịch

**Endpoint:** `GET /api/transactions`

**Headers:**

```
Authorization: Bearer {token}
```

**Query Parameters:**

- `page`: Số trang (mặc định: 1)
- `per_page`: Số record trên 1 trang (mặc định: 20)

**Response (200 OK):**

```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "wallet_id": 1,
      "category_id": 2,
      "amount": "50000.00",
      "description": "Ăn sáng",
      "transaction_date": "2025-10-07",
      "created_at": "2025-10-07T08:00:00.000000Z",
      "updated_at": "2025-10-07T08:00:00.000000Z",
      "wallet": {
        "id": 1,
        "name": "Tiền mặt",
        "type": "cash"
      },
      "category": {
        "id": 2,
        "name": "Ăn uống",
        "type": "expense",
        "icon": "🍔"
      }
    },
    {
      "id": 2,
      "user_id": 1,
      "wallet_id": 2,
      "category_id": 1,
      "amount": "15000000.00",
      "description": "Lương tháng 10",
      "transaction_date": "2025-10-01",
      "created_at": "2025-10-01T09:00:00.000000Z",
      "updated_at": "2025-10-01T09:00:00.000000Z",
      "wallet": {
        "id": 2,
        "name": "Tài khoản Vietcombank",
        "type": "bank"
      },
      "category": {
        "id": 1,
        "name": "Lương",
        "type": "income",
        "icon": "💰"
      }
    }
  ],
  "first_page_url": "http://localhost:8000/api/transactions?page=1",
  "from": 1,
  "last_page": 3,
  "last_page_url": "http://localhost:8000/api/transactions?page=3",
  "next_page_url": "http://localhost:8000/api/transactions?page=2",
  "path": "http://localhost:8000/api/transactions",
  "per_page": 20,
  "prev_page_url": null,
  "to": 20,
  "total": 45
}
```

---

### 4.2. Tạo giao dịch mới

**Endpoint:** `POST /api/transactions`

**Headers:**

```
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "wallet_id": 1,
  "category_id": 2,
  "amount": 150000,
  "description": "Ăn trưa với bạn",
  "transaction_date": "2025-10-07"
}
```

**Response (201 Created):**

```json
{
  "message": "Tạo giao dịch thành công",
  "transaction": {
    "id": 3,
    "user_id": 1,
    "wallet_id": 1,
    "category_id": 2,
    "amount": "150000.00",
    "description": "Ăn trưa với bạn",
    "transaction_date": "2025-10-07",
    "created_at": "2025-10-07T12:00:00.000000Z",
    "updated_at": "2025-10-07T12:00:00.000000Z",
    "wallet": {
      "id": 1,
      "name": "Tiền mặt",
      "type": "cash",
      "balance": "4850000.00"
    },
    "category": {
      "id": 2,
      "name": "Ăn uống",
      "type": "expense",
      "icon": "🍔"
    }
  }
}
```

**Validation Rules:**

- `wallet_id`: required, exists in wallets table
- `category_id`: required, exists in categories table
- `amount`: required, numeric, min 0
- `description`: nullable, string
- `transaction_date`: required, date format

**Note:**

- Khi tạo giao dịch, số dư ví sẽ tự động cập nhật
- Nếu `category.type = 'expense'`: `wallet.balance -= amount`
- Nếu `category.type = 'income'`: `wallet.balance += amount`

---

### 4.3. Xem chi tiết giao dịch

**Endpoint:** `GET /api/transactions/{id}`

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "id": 3,
  "user_id": 1,
  "wallet_id": 1,
  "category_id": 2,
  "amount": "150000.00",
  "description": "Ăn trưa với bạn",
  "transaction_date": "2025-10-07",
  "created_at": "2025-10-07T12:00:00.000000Z",
  "updated_at": "2025-10-07T12:00:00.000000Z",
  "wallet": {
    "id": 1,
    "name": "Tiền mặt",
    "type": "cash",
    "balance": "4850000.00"
  },
  "category": {
    "id": 2,
    "name": "Ăn uống",
    "type": "expense",
    "icon": "🍔"
  }
}
```

---

### 4.4. Xóa giao dịch

**Endpoint:** `DELETE /api/transactions/{id}`

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "message": "Xóa giao dịch thành công"
}
```

**Note:** Khi xóa giao dịch, số dư ví sẽ được hoàn lại

---

## 5. Statistics API (Thống kê)

### 5.1. Thống kê tổng quan

**Endpoint:** `GET /api/statistics`

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "today": {
    "expense": "200000.00",
    "income": "0.00"
  },
  "this_week": {
    "expense": "1500000.00",
    "income": "0.00"
  },
  "this_month": {
    "expense": "5000000.00",
    "income": "15000000.00"
  },
  "total_balance": "17000000.00",
  "wallets": [
    {
      "id": 1,
      "user_id": 1,
      "name": "Tiền mặt",
      "type": "cash",
      "balance": "4850000.00",
      "created_at": "2025-10-07T10:30:00.000000Z",
      "updated_at": "2025-10-07T12:00:00.000000Z"
    },
    {
      "id": 2,
      "user_id": 1,
      "name": "Tài khoản Vietcombank",
      "type": "bank",
      "balance": "10000000.00",
      "created_at": "2025-10-07T10:30:00.000000Z",
      "updated_at": "2025-10-07T10:30:00.000000Z"
    },
    {
      "id": 3,
      "user_id": 1,
      "name": "Ví MoMo",
      "type": "ewallet",
      "balance": "2150000.00",
      "created_at": "2025-10-07T10:30:00.000000Z",
      "updated_at": "2025-10-07T11:00:00.000000Z"
    }
  ]
}
```

**Giải thích:**

- `today`: Tổng chi/thu trong ngày hôm nay
- `this_week`: Tổng chi/thu trong tuần này (từ Thứ 2 đến Chủ nhật)
- `this_month`: Tổng chi/thu trong tháng hiện tại
- `total_balance`: Tổng số dư của tất cả ví
- `wallets`: Danh sách chi tiết các ví và số dư

---

## Error Responses

### 401 Unauthorized

```json
{
  "message": "Unauthenticated."
}
```

### 404 Not Found

```json
{
  "message": "No query results for model [App\\Models\\Wallet] {id}"
}
```

### 422 Unprocessable Entity

```json
{
  "message": "The name field is required.",
  "errors": {
    "name": ["The name field is required."],
    "type": ["The selected type is invalid."]
  }
}
```

### 500 Internal Server Error

```json
{
  "message": "Server Error",
  "exception": "Error details..."
}
```

---

## Postman Collection

Để test API dễ dàng hơn, bạn có thể import collection này vào Postman:

### Các bước test:

1. **Đăng ký/Đăng nhập** → Lấy token
2. **Tạo Wallet** → Nhập số tiền ban đầu
3. **Tạo Category** → Tạo các danh mục thu/chi
4. **Tạo Transaction** → Ghi lại giao dịch
5. **Xem Statistics** → Xem thống kê chi tiêu

### Environment Variables trong Postman:

```
BASE_URL = http://localhost:8000/api
TOKEN = {token_from_login}
```

---

## Notes

- Tất cả các API (trừ register/login) đều yêu cầu authentication
- Số tiền (amount, balance) được lưu dạng DECIMAL(15,2)
- Ngày giao dịch (transaction_date) sử dụng format: `YYYY-MM-DD`
- Pagination mặc định 20 records/page
- Giao dịch được sắp xếp theo thứ tự giảm dần của `transaction_date`

---

## Example Workflow

```bash
# 1. Đăng ký
POST /api/register
{
    "username": "john",
    "email": "john@example.com",
    "password": "123456"
}

# 2. Tạo ví
POST /api/wallets
Authorization: Bearer {token}
{
    "name": "Tiền mặt",
    "type": "cash",
    "balance": 5000000
}

# 3. Tạo danh mục chi
POST /api/categories
Authorization: Bearer {token}
{
    "name": "Ăn uống",
    "type": "expense",
    "icon": "🍔"
}

# 4. Tạo giao dịch
POST /api/transactions
Authorization: Bearer {token}
{
    "wallet_id": 1,
    "category_id": 1,
    "amount": 50000,
    "description": "Ăn sáng",
    "transaction_date": "2025-10-07"
}

# 5. Xem thống kê
GET /api/statistics
Authorization: Bearer {token}
```

---

**Version:** 1.0.0  
**Last Updated:** October 7, 2025
