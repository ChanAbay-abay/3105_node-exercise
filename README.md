# Node.js User Authentication API

This is a simple user authentication API built with Node.js and Express.js. It includes functionalities for user registration, login, and profile management, all secured using JSON Web Tokens (JWT). The application also implements session management, logging, and rate limiting for security and performance.

## Features

- User registration with validation
- User login with JWT authentication
- Profile retrieval for authenticated users
- Logging of incoming requests
- Rate limiting to prevent abuse
- Secure password storage using bcrypt

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ChanAbay-abay/3105_node-exercise.git
   cd 3105_node-exercise
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your secret key:

   ```plaintext
   SECRET_KEY=your-secret-key
   ```

4. Start the server:

   ```bash
   npx node app.js
   ```

   The server will run on `http://localhost:3000`.

### API Endpoints

- **POST** `/user/register`
  - Registers a new user.
  - Request Body: `{ "username": "string", "password": "string", "email": "string" }`
- **POST** `/user/login`

  - Logs in a user.
  - Request Body: `{ "username": "string", "password": "string" }`

- **POST** `/user/logout`

  - Logs out the user.

- **GET** `/user/profile`
  - Retrieves the profile of the authenticated user.
  - Requires authorization via Bearer token.

### Security

- Passwords are hashed using bcrypt before storage.
- JWT is used for user authentication and session management.
- Rate limiting is implemented to mitigate potential abuse.
