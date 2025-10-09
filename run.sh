#!/bin/bash

echo "🚀 Starting Backend and Frontend..."

# Chạy Backend (giả sử backend là PHP/Laravel)
cd backend
php artisan serve --host=0.0.0.0 --port=8000 & BACKEND_PID=$!

# Chạy Frontend
cd ../frontend
npm run dev & FRONTEND_PID=$!

echo "✅ Backend running on http://localhost:8000 (PID: $BACKEND_PID)"
echo "✅ Frontend running on http://localhost:5173 (PID: $FRONTEND_PID)"
echo ""
echo "Press Ctrl+C to stop both servers..."

# Đợi signal để tắt
trap "echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM

# Giữ script chạy
wait