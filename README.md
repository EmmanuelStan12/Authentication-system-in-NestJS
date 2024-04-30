# NestJS Authentication System

This is a sample authentication system built using NestJS. It provides endpoints for user registration, login, and logout, as well as middleware for protecting routes that require authentication.

## Features

- User registration with email verification
- User login with JWT (JSON Web Tokens) authentication
- User logout

## Prerequisites

Before running the application, ensure that you have the following installed:

- Node.js and npm (or yarn)
- MySQL (or your preferred database)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/EmmanuelStan12/Authentication-system-in-NestJS.git
   ```

2. **Install dependencies:**

   ```bash
   cd Authentication-system-in-NestJS
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and configure the following environment variables:

   ```plaintext
   PORT=
   JWT_SECRET=
   DB_HOST=
   DB_USER=
   DB_PASSWORD=
   ```

## Usage

1. **Start the server:**

   ```bash
   npm start
   ```

2. **Access the API endpoints:**

   The API will be available at `http://localhost:${PORT}`.

## API Endpoints

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login with username/email and password to obtain JWT token
- `POST /auth/logout`: Logout and invalidate JWT token
- `GET /profile`: Protected route requiring authentication (example)

