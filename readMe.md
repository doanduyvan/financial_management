-- Bảng người dùng
CREATE TABLE users (
id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(50) UNIQUE NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng ví/tài khoản (THÊM MỚI)
CREATE TABLE wallets (
id INT PRIMARY KEY AUTO_INCREMENT,
user_id INT NOT NULL,
name VARCHAR(100) NOT NULL,
type ENUM('cash', 'bank', 'ewallet') NOT NULL,
balance DECIMAL(15, 2) DEFAULT 0,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng danh mục chi tiêu
CREATE TABLE categories (
id INT PRIMARY KEY AUTO_INCREMENT,
user_id INT NOT NULL,
name VARCHAR(100) NOT NULL,
type ENUM('income', 'expense') NOT NULL,
icon VARCHAR(50),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng giao dịch (CẬP NHẬT - thêm wallet_id)
CREATE TABLE transactions (
id INT PRIMARY KEY AUTO_INCREMENT,
user_id INT NOT NULL,
wallet_id INT NOT NULL,
category_id INT NOT NULL,
amount DECIMAL(15, 2) NOT NULL,
description TEXT,
transaction_date DATE NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE RESTRICT,
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

-- Bảng ngân sách hàng tháng
CREATE TABLE budgets (
id INT PRIMARY KEY AUTO_INCREMENT,
user_id INT NOT NULL,
category_id INT NOT NULL,
amount DECIMAL(15, 2) NOT NULL,
month INT NOT NULL,
year INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
UNIQUE KEY unique_budget (user_id, category_id, month, year)
);

-- Insert dữ liệu mẫu
INSERT INTO wallets (user_id, name, type, balance) VALUES
(1, 'Tiền mặt', 'cash', 5000000),
(1, 'Tài khoản Vietcombank', 'bank', 10000000),
(1, 'Ví MoMo', 'ewallet', 2000000);

INSERT INTO categories (user_id, name, type, icon) VALUES
(1, 'Lương', 'income', '💰'),
(1, 'Ăn uống', 'expense', '🍔'),
(1, 'Di chuyển', 'expense', '🚗'),
(1, 'Giải trí', 'expense', '🎮'),
(1, 'Hóa đơn', 'expense', '📄');

php artisan make:migration create_wallets_table
php artisan make:migration create_categories_table
php artisan make:migration create_transactions_table

php artisan make:model Wallet
php artisan make:model Category
php artisan make:model Transaction

php artisan make:controller AuthController
php artisan make:controller WalletController
php artisan make:controller CategoryController
php artisan make:controller TransactionController

{
"menu": [
{
"id": 1,
"name": "Dashboard",
"icon": "📊",
"path": "/dashboard",
"description": "Tổng quan tài chính"
},
{
"id": 2,
"name": "Ví của tôi",
"icon": "💰",
"path": "/wallets",
"description": "Quản lý các ví tiền",
"children": [
{
"id": 21,
"name": "Danh sách ví",
"path": "/wallets",
"action": "view"
},
{
"id": 22,
"name": "Thêm ví mới",
"path": "/wallets/create",
"action": "create"
}
]
},
{
"id": 3,
"name": "Giao dịch",
"icon": "💸",
"path": "/transactions",
"description": "Quản lý thu chi",
"children": [
{
"id": 31,
"name": "Lịch sử giao dịch",
"path": "/transactions",
"action": "view"
},
{
"id": 32,
"name": "Thêm giao dịch",
"path": "/transactions/create",
"action": "create"
}
]
},
{
"id": 4,
"name": "Danh mục",
"icon": "📁",
"path": "/categories",
"description": "Quản lý danh mục thu/chi",
"children": [
{
"id": 41,
"name": "Danh sách danh mục",
"path": "/categories",
"action": "view"
},
{
"id": 42,
"name": "Thêm danh mục",
"path": "/categories/create",
"action": "create"
}
]
},
{
"id": 5,
"name": "Thống kê",
"icon": "📈",
"path": "/statistics",
"description": "Báo cáo chi tiêu",
"children": [
{
"id": 51,
"name": "Theo ngày",
"path": "/statistics/daily",
"action": "view"
},
{
"id": 52,
"name": "Theo tuần",
"path": "/statistics/weekly",
"action": "view"
},
{
"id": 53,
"name": "Theo tháng",
"path": "/statistics/monthly",
"action": "view"
}
]
},
{
"id": 6,
"name": "Tài khoản",
"icon": "👤",
"path": "/profile",
"description": "Quản lý tài khoản",
"children": [
{
"id": 61,
"name": "Thông tin cá nhân",
"path": "/profile",
"action": "view"
},
{
"id": 62,
"name": "Đổi mật khẩu",
"path": "/profile/change-password",
"action": "update"
},
{
"id": 63,
"name": "Đăng xuất",
"path": "/logout",
"action": "logout"
}
]
}
]
}
