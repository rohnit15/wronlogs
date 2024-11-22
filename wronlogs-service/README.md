# Wronlogs Service

A simple backend service to handle everything wronlogs

## Installation

1. Create a `.env` file in the root directory and add your environment variables.

## Usage

The server will run on [http://localhost:3000](http://localhost:3000).

## API Documentation

API documentation is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## API Endpoints

### User Management

| Method | Endpoint | Description | Response Codes |
|--------|----------|-------------|----------------|
| `POST` | `/user` | Create new user | 201, 400, 409 |
| `GET` | `/user` | Get all users | 200 |
| `POST` | `/user/authenticate` | Authenticate user | 200, 401 |
| `GET` | `/user/me` | Get user by token | 200, 401 |

### Post Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/post` | Create new post |
| `GET` | `/post` | Get all posts |

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start server using nodemon |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code using ESLint and Prettier |
| `npm run lint:ts` | Run ESLint for TypeScript files |

## License

ISC License