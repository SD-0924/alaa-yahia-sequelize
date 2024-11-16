# Blogging System API

## Description
This project is a **backend RESTful API** for a blogging system built with **Node.js**, **Express.js**, and **TypeScript**. It uses **Sequelize** as the ORM to connect to a **MySQL database**. The application supports user authentication with **JWT** and includes robust validation middleware. It provides RESTful endpoints for managing users, posts, categories, and comments, and enforces complex associations between these entities. The project also integrates **unit testing** with **Jest**, **Docker** for deployment, and **GitHub Actions** for CI/CD workflows.

## Features
- **JWT Authentication**: Secures sensitive endpoints.
- **Complex Relationships**: Supports associations between users, posts, categories, and comments.
- **Validation Middleware**: Ensures data integrity and handles invalid inputs.
- **Environment Configuration**: Separate `.env` files for development, test, and production.
- **Testing**: Comprehensive unit tests using Jest and Sequelize mock.
- **Dockerized Deployment**: Containerized application for ease of deployment.
- **Automated CI/CD**: GitHub Actions for running tests on PRs.

---

## Technologies Used
- **Node.js**
- **Express.js**
- **TypeScript**
- **Sequelize** (with MySQL database)
- **JWT (jsonwebtoken)**
- **bcrypt** for password hashing
- **dotenv** for environment variable management
- **ejs** for template rendering (didn't use it but it still there if we needed it in advance)
- **Jest** for testing
- **Docker** for containerization

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment:
   - Create `.env` files for `development`, `test`, and `production`.
   - Example `.env` configuration:
     ```env
     PORT=3000
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=123456
     DB_NAME=dbname
     JWT_SECRET=your_jwt_secret
     ```

4. Configure the database:
   - Ensure **MySQL** is running and create the required databases.
   - Update the Sequelize configuration in `config/config.ts` if necessary.
   - Run migrations:
     ```bash
     npx sequelize-cli db:migrate
     ```

5. Seed the database (optional):
   ```bash
   npx sequelize-cli db:seed:all
   ```

6. Run the application:
   ```bash
   npm run start
   ```

---

## API Endpoints

### **Authentication**
- `POST /api/auth/login`: Log in a user using email and password.  
- `POST /api/auth/register`: Register a new user with email, username, and password.  

### **Users**
- `GET /api/users`: Get all users (requires JWT, restricted to admin/manager).  
- `POST /api/users`: Create a new user.  
- `GET /api/users/:userId`: Get a specific user by ID (requires JWT).  
- `PUT /api/users/:userId`: Update a specific user by ID (requires JWT).  
- `DELETE /api/users/:userId`: Delete a user by ID (requires JWT).  

### **Posts**
- `POST /api/posts`: Create a new post (requires JWT).  
  - Request Body: `title`, `content`, `userId`.  
- `GET /api/posts`: Get all posts with associated users, categories, and comments.  
- `GET /api/posts/:postId`: Get a specific post by ID with its associations.  
- `PUT /api/posts/:postId`: Update a specific post by ID (requires JWT).  
- `DELETE /api/posts/:postId`: Delete a post by ID (requires JWT).  

### **Categories**
- `POST /api/posts/:postId/categories`: Add a category to a specific post (requires JWT).  
  - Request Body: `categoryName`.  
- `GET /api/posts/:postId/categories`: Get categories associated with a specific post.  

### **Comments**
- `POST /api/posts/:postId/comments`: Add a comment to a specific post (requires JWT).  
  - Request Body: `content`, `userId`.  
- `GET /api/posts/:postId/comments`: Get comments for a specific post.  

---

## Middlewares

1. **`authenticateJWT`**  
   Protects routes by verifying a valid JWT token in the request header.  

2. **Validation Middlewares**  
   - `userValidationRules`: Validates requests related to users (e.g., login, registration).  
   - `postValidationRules`: Validates post creation and updates.  
   - `categoryValidationRules`: Validates category-related actions.  
   - `commentValidationRules`: Validates comment-related actions.  

---

---

## Testing
- Run unit tests:
  ```bash
  npm test
  ```
- GitHub Actions:
  - **Baseline Check**: Runs tests on each PR.

---

## Deployment
### Using Docker
1. Build and run the container:
   ```bash
   docker-compose up --build
   ```

2. Access the application at:
   ```
   http://localhost:3000
   ```

---

## Database Schema
### Entity Relationships


1. **User-Post**:  
   - A **User** can create multiple **Posts**.  
   - Each **Post** belongs to a single **User**.  

2. **User-Comment**:  
   - A **User** can make multiple **Comments**.  
   - Each **Comment** belongs to a single **User**.  

3. **Post-Category**:  
   - A **Post** can belong to multiple **Categories**.  
   - A **Category** can group multiple **Posts**.  
   - Managed through the `PostCategory` junction table.  

4. **Post-Comment**:  
   - A **Post** can have multiple **Comments**.  
   - Each **Comment** belongs to a single **Post**.  


---

## ER Diagram

* See ER diagram (PDF) for details.
The database schema includes:
- **Users**, **Posts**, **Categories**, and **Comments**
- Relationships:
  - Users ↔ Posts (One-to-Many)
  - Posts ↔ Categories (Many-to-Many)
  - Posts ↔ Comments (One-to-Many)
  - Comments ↔ Users (One-to-Many)

---



## Example Request and Response

### **Authentication**

#### Login a User  
**POST** `/api/auth/login`  
**Request Body**:  
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```  
**Response**:  
```json
{
  "token": "jwt_token_here"
}
```  

#### Register a User  
**POST** `/api/auth/register`  
**Request Body**:  
```json
{
  "username": "exampleUser",
  "email": "user@example.com",
  "password": "password123"
}
```  

---
