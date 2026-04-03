# Todo App - DevOps Project

**Sinh viên:** Trần Văn Hiền  
**MSSV:** 2251220165  
**Lớp:** 22CT4  

## Giới thiệu
Ứng dụng quản lý công việc (Todo List) được xây dựng với:
- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **Database:** MySQL 8.0
- **DevOps:** Docker, Docker Compose

## Tính năng
- Thêm / xóa / đánh dấu hoàn thành công việc
- Dữ liệu lưu vào MySQL (không hard-code)
- Endpoint `/health` kiểm tra trạng thái server
- Endpoint `/about` thông tin sinh viên

## Chạy với Docker Compose

```bash
docker compose up --build -d
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/health
- About: http://localhost:5000/about

## API Endpoints

| Method | Endpoint     | Mô tả               |
|--------|-------------|----------------------|
| GET    | /health     | Health check         |
| GET    | /about      | Thông tin sinh viên  |
| GET    | /todos      | Lấy danh sách todo   |
| POST   | /todos      | Thêm todo mới        |
| PUT    | /todos/:id  | Toggle trạng thái    |
| DELETE | /todos/:id  | Xóa todo             |

## Environment Variables

### Backend (.env)
```
PORT=5000
APP_NAME=TodoApp
DB_HOST=db
DB_PORT=3306
DB_NAME=tododb
DB_USER=root
DB_PASS=root123
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## Git Branches
- `main` — production
- `develop` — development
- `feature/todo-api` — backend feature
- `feature/todo-frontend` — frontend feature
