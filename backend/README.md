# Todo App Backend

A simple Node.js/Express backend for a todo application with JWT authentication.

## Setup

1. Install dependencies:

    ```bash
    npm install
    ```

2. Create a `.env` file in the root directory with the following variables:

    ```
    PORT=9000
    JWT_SECRET=your_jwt_secret_key_here
    ```

3. Choose how to run the server:

    ### Development Mode

    ```bash
    npm run dev
    ```

    ### Production Mode

    ```bash
    # Build the project
    npm run build

    # Start the production server
    npm run start:prod
    ```

## API Endpoints

### Authentication

#### Sign Up

-   **POST** `/api/auth/signup`
-   **Body:** `{ "email": "user@example.com", "password": "password123" }`
-   **Response:** `{ "token": "jwt_token_here" }`

#### Login

-   **POST** `/api/auth/login`
-   **Body:** `{ "email": "user@example.com", "password": "password123" }`
-   **Response:** `{ "token": "jwt_token_here" }`

### Todos

All todo endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token_here
```

#### Get All Todos

-   **GET** `/api/todos`
-   **Response:** Array of todos
    ```json
    [
        {
            "id": 1,
            "userId": 1,
            "title": "Todo title",
            "completed": false,
            "createdAt": "2024-03-14T12:00:00.000Z"
        }
    ]
    ```

#### Create Todo

-   **POST** `/api/todos`
-   **Body:** `{ "title": "New todo" }`
-   **Response:** Created todo object

#### Delete Todo

-   **DELETE** `/api/todos/:id`
-   **Response:** `{ "message": "Todo deleted successfully" }`

## Build and Deployment

### Building for Production

1. Run the build command:

    ```bash
    npm run build
    ```

    This will:

    - Clean the `dist` directory
    - Copy all source files to the `dist` directory

2. Start the production server:
    ```bash
    npm run start:prod
    ```

### Production Considerations

-   Set appropriate environment variables in production
-   Use process managers like PM2 for better process management
-   Set up proper logging and monitoring
-   Consider using Docker for containerization

## Notes

-   This implementation uses in-memory storage for both users and todos. In a production environment, you should use a
    proper database.
-   The JWT secret should be properly secured in production.
-   Error handling could be improved for production use.
-   Consider adding input validation and sanitization for production use.
