# Online Forum API

This project is an **Online Forum API** built with Node.js, Express, and Prisma, providing functionality for managing users, threads, posts, comments, and likes. The API allows users to create threads, participate in discussions, and interact with posts.

## Features

- **User Management**
  - Role-based access control (Admin, Moderator, User)
  - Secure user authentication and authorization
- **Threads**
  - Create, read, update, and delete threads
  - Filter and search functionality
- **Posts**
  - Create, read, update, and delete posts
  - Reply to threads
- **Comments**
  - Add comments to posts
  - Edit or delete comments
- **Likes**
  - Like/unlike threads and posts
- **Moderation Tools**
  - Moderators can manage users and categories

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd online-forum-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Install PostgreSQL
   - Create a database for the project

4. Configure environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database_name>"
   JWT_SECRET="your_jwt_secret"
   ```

5. Apply Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

6. Start the server:
   ```bash
   npm run dev
   ```

---

## API Endpoints

### Authentication
- **POST** `/api/auth/register`: Register a new user
- **POST** `/api/auth/login`: Log in and get a token

### Users
- **GET** `/api/users`: List all users (Admin/Moderator only)
- **GET** `/api/users/:id`: Get user details
- **PUT** `/api/users/:id`: Update user (Admin/Moderator only)
- **DELETE** `/api/users/:id`: Delete user (Admin/Moderator only)

### Threads
- **POST** `/api/threads`: Create a new thread
- **GET** `/api/threads`: Get all threads (with filtering and sorting)
- **GET** `/api/threads/:id`: Get thread details
- **PUT** `/api/threads/:id`: Update thread (Author or Moderator only)
- **DELETE** `/api/threads/:id`: Delete thread (Author or Moderator only)

### Posts
- **POST** `/api/posts`: Create a new post
- **GET** `/api/posts/:threadId`: Get all posts in a thread
- **PUT** `/api/posts/:id`: Update post (Author only)
- **DELETE** `/api/posts/:id`: Delete post (Author only)

### Comments
- **POST** `/api/comments`: Add a comment to a post
- **GET** `/api/comments/:postId`: Get all comments for a post
- **PUT** `/api/comments/:id`: Update comment (Author only)
- **DELETE** `/api/comments/:id`: Delete comment (Author only)

### Likes
- **POST** `/api/likes`: Like/unlike a post or thread

---

## Database Schema

### User
- `id`: Unique identifier
- `email`: User's email address
- `password`: Hashed password
- `role`: User role (Admin, Moderator, User)

### Thread
- `id`: Unique identifier
- `title`: Thread title
- `content`: Thread content
- `categoryId`: Reference to category
- `authorId`: Reference to user

### Post
- `id`: Unique identifier
- `content`: Post content
- `threadId`: Reference to thread
- `authorId`: Reference to user

### Comment
- `id`: Unique identifier
- `content`: Comment content
- `postId`: Reference to post
- `authorId`: Reference to user

### Like
- `id`: Unique identifier
- `postId`: Reference to post (nullable)
- `threadId`: Reference to thread (nullable)
- `authorId`: Reference to user

---

## Tools and Technologies

- **Node.js**: Backend runtime
- **Express**: Web framework
- **Prisma**: ORM for database management
- **PostgreSQL**: Relational database
- **JWT**: Authentication and authorization
- **TypeScript**: Type safety (if applicable)

---

## Future Improvements

- Add pagination for threads and posts
- Implement real-time updates using WebSockets
- Add image upload functionality for threads and posts

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
