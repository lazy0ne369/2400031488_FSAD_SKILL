# Skill 16 - API Documentation for Full-Stack Student CRUD Application using Swagger

Skill 16 extends the student CRUD project from Skill 12 by adding Swagger/OpenAPI documentation to the Spring Boot backend and keeping the React frontend aligned with the same API.

## Folder Structure

- `backend` - Spring Boot backend with Swagger UI, validation, Student CRUD APIs, and test tooling
- `frontend` - React frontend for managing student records

## Backend Features

- `POST /students` - Add a new student
- `GET /students` - Retrieve all students
- `GET /students/{id}` - Retrieve a student by id
- `PUT /students/{id}` - Update a student
- `DELETE /students/{id}` - Delete a student
- Swagger UI documentation
- Validation messages for invalid request bodies
- Proper not-found responses for invalid ids such as `999`

## Swagger URLs

- `http://localhost:8080/swagger-ui.html`
- `http://localhost:8080/swagger-ui/index.html`
- `http://localhost:8080/v3/api-docs`

## Database to Create in MySQL

Create this database before running the backend:

```sql
CREATE DATABASE student_crud_swagger_db;
```

Default credentials used in `backend/src/main/resources/application.properties`:

- Username: `root`
- Password: `root`

If your MySQL password is different, update the username and password in `application.properties` before starting the backend.

## Run the Project

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

Windows PowerShell:

```powershell
.\mvnw.cmd spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend Tooling Included

- Spring Boot Web for REST APIs
- Spring Data JPA for database operations
- MySQL Connector/J for SQL database connectivity
- Spring Validation for request validation messages
- Spring Boot DevTools for faster backend development
- Springdoc OpenAPI for Swagger UI and API documentation
- H2 test dependency so the backend tests can run without a live MySQL server
