"# 🍽️ Foodieland - Recipe Management Platform

A full-stack web application for managing and sharing recipes, built with Spring Boot (backend) and React (frontend), containerized with Docker.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **User Authentication & Authorization**
  - User registration and login
  - JWT-based session management
  - Role-based access control (User/Admin)

- **Recipe Management**
  - Create, read, update, and delete recipes
  - Recipe categorization
  - Recipe details with ingredients and instructions
  - Image upload support

- **Category Management** (Admin only)
  - Create and manage recipe categories
  - Category-based recipe filtering

- **User Dashboard** (Admin only)
  - View and manage all recipes
  - User management

- **Responsive Design**
  - Mobile-friendly interface
  - Modern UI with Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 4.0.0
- **Language:** Java 21
- **Database:** PostgreSQL 15
- **ORM:** Spring Data JPA / Hibernate
- **Security:** Spring Security
- **Build Tool:** Maven
- **Container:** Docker

### Frontend
- **Framework:** React 19.2.0
- **Build Tool:** Vite
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **State Management:** React Context API
- **Notifications:** React Toastify
- **Icons:** React Icons

### DevOps
- **Containerization:** Docker & Docker Compose
- **Web Server:** Nginx (for frontend)
- **Database:** PostgreSQL (containerized)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 2.0 or higher)
- **Git**

## 📁 Project Structure

```
Foodieland/
├── backend/                          # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/org/project/backend/
│   │   │   │   ├── config/           # Security & App configuration
│   │   │   │   ├── controller/       # REST API controllers
│   │   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── enums/            # Enums (Role, etc.)
│   │   │   │   ├── exception/        # Custom exceptions & handlers
│   │   │   │   ├── mapper/           # Entity-DTO mappers
│   │   │   │   ├── model/            # JPA entities
│   │   │   │   ├── repository/       # Spring Data repositories
│   │   │   │   └── service/          # Business logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                         # React frontend
│   ├── public/                       # Static assets
│   ├── src/
│   │   ├── assets/                   # Images & resources
│   │   ├── components/               # Reusable components
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── RecipeCard.jsx
│   │   ├── context/                  # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/                    # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Categories.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── RecipeDetails.jsx
│   │   │   ├── RecipeForm.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/                 # API services
│   │   │   ├── authService.js
│   │   │   ├── axiosInstance.js
│   │   │   ├── categoryService.js
│   │   │   └── recipeService.js
│   │   ├── utils/                    # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml                # Docker compose configuration
└── README.md
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Foodieland
```

### 2. Configure Environment (Optional)

The application works with default settings. To customize:

**Backend Configuration** (`backend/src/main/resources/application.properties`):
```properties
spring.application.name=recipe-app
server.port=8080

spring.datasource.url=jdbc:postgresql://localhost:5432/recipe_db
spring.datasource.username=postgres
spring.datasource.password=postgres

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

**Frontend Configuration** (`.env` in frontend folder):
```env
VITE_API_URL=http://localhost:8082/api
```

## 🏃 Running the Application

### Using Docker Compose (Recommended)

This will start all services (frontend, backend, and database):

```bash
# Build and start all containers
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop all containers
docker-compose down

# Stop and remove volumes (clean database)
docker-compose down -v
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8082/api
- **PostgreSQL:** localhost:5432

### Manual Setup (Without Docker)

#### Backend

```bash
cd backend

# Using Maven wrapper
./mvnw clean install
./mvnw spring-boot:run

# Or using installed Maven
mvn clean install
mvn spring-boot:run
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

#### Database

Make sure PostgreSQL is installed and running:

```bash
# Create database
createdb recipe_db

# Or using psql
psql -U postgres -c "CREATE DATABASE recipe_db;"
```

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/logout` | User logout | Yes |
| GET | `/api/auth/me` | Get current user | Yes |

### Recipes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/recipes` | Get all recipes | No |
| GET | `/api/recipes/{id}` | Get recipe by ID | No |
| POST | `/api/recipes` | Create new recipe | Yes (Admin) |
| PUT | `/api/recipes/{id}` | Update recipe | Yes (Admin) |
| DELETE | `/api/recipes/{id}` | Delete recipe | Yes (Admin) |

### Categories

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/categories` | Get all categories | No |
| GET | `/api/categories/{id}` | Get category by ID | No |
| POST | `/api/categories` | Create category | Yes (Admin) |
| PUT | `/api/categories/{id}` | Update category | Yes (Admin) |
| DELETE | `/api/categories/{id}` | Delete category | Yes (Admin) |

## 🔧 Environment Variables

### Docker Compose Configuration

The `docker-compose.yml` file defines the following services:

**PostgreSQL Database:**
- Container name: `foodieland-postgres`
- Port: `5432:5432`
- Database: `recipe_db`
- Username: `postgres`
- Password: `postgres`

**Backend:**
- Container name: `foodieland-backend`
- Port: `8082:8080`
- Environment variables configured in docker-compose.yml

**Frontend:**
- Container name: `foodieland-frontend`
- Port: `3000:80`
- Built with Nginx

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use

If you get port conflict errors:

```bash
# Check what's using the port
netstat -ano | findstr :3000
netstat -ano | findstr :8082
netstat -ano | findstr :5432

# Stop the process or change ports in docker-compose.yml
```

#### 2. Database Connection Issues

```bash
# Remove old volumes and restart
docker-compose down -v
docker volume rm foodieland_postgres_data
docker-compose up -d
```

#### 3. Login Page Infinite Refresh

This has been fixed in the latest version. If it occurs:
- Clear browser cache
- Rebuild frontend: `docker-compose up -d --build frontend`

#### 4. Backend Not Starting

```bash
# Check backend logs
docker-compose logs backend

# Restart backend
docker-compose restart backend
```

#### 5. Frontend Not Loading

```bash
# Check frontend logs
docker-compose logs frontend

# Rebuild without cache
docker-compose build --no-cache frontend
docker-compose up -d
```

### View Container Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Check Container Status

```bash
docker-compose ps
```

### Access Database

```bash
# Using docker exec
docker exec -it foodieland-postgres psql -U postgres -d recipe_db

# Common SQL commands
\dt              # List tables
\d users         # Describe users table
SELECT * FROM users;
```

## 📝 Development Notes

### Adding New Features

1. **Backend Changes:**
   - Add entity in `model/`
   - Create repository in `repository/`
   - Implement service in `service/`
   - Create controller in `controller/`
   - Add DTOs in `dto/`
   - Add mapper in `mapper/`

2. **Frontend Changes:**
   - Create service in `services/`
   - Add page in `pages/`
   - Create components in `components/`
   - Update routes in `App.jsx`

### Code Style

- Backend: Follow Java naming conventions
- Frontend: Use React functional components with hooks
- Use meaningful variable names
- Add comments for complex logic

## 🔒 Security Notes

- Passwords are hashed using BCrypt
- JWT tokens are used for authentication
- CORS is configured for frontend-backend communication
- Admin routes are protected by role-based access control
- Input validation is performed on both frontend and backend

## 📄 License

This project is for educational purposes.

## 👥 Contributors

- Yahya afadisse

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email yahyaafadisse92@gmail.com or create an issue in the repository.

---

**Built with ❤️ using Spring Boot & React**" 
