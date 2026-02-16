# Mini Task Tracker

This is a simple full-stack task management app that allows users to create an account, log in, and manage their
tasks. Tasks can be created, updated, completed, and deleted.

## Tech Stack

Frontend
Next.js (App Router)
React
Tailwind CSS

Backend
Node.js
Express
MongoDB + Mongoose
JWT authentication
Redis

## Testing
Jest
Supertest

## Features

User authentication
Secure signup and login with hashed passwords and JWT

Task management
Create, update, delete, and mark tasks as completed

Dashboard
View pending and completed tasks
Edit tasks inline

Caching
Redis caching for faster task fetching

Testing
Unit and integration tests for authentication and task routes


## Setup Instructions

### 1. Clone the repository

git clone  https://github.com/subatomic3348/TaskTracker.git
cd  TaskTracker

### 2. Backend Setup

Go to backend folder:

cd backend
npm install

Create a `.env` file inside the backend folder:

MONGO_URI=mongodb_connection_string\
JWT_SECRET=your_secret_key\
PORT=5000\
REDIS_URL=_redis_url\

Start backend:

npm run dev

The backend will run on
http://localhost:5000

### 3. Frontend Setup

Open a new terminal:

cd frontend
npm install
npm run dev

Frontend runs on
http://localhost:3000

## Running Tests

To run backend tests:

npm test


## Test Coverage
Backend test coverage summary:

Statements: 83%

Branches: 64%

Functions: 100%

Lines: 82%

Coverage report can be generated locally using:
npm run test:coverage



