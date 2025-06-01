# Expense Tracker Backend

![Nest.js](https://img.shields.io/badge/Nest.js-9.x-E0234E?logo=nestjs) ![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?logo=typescript) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-336791?logo=postgresql) ![TypeORM](https://img.shields.io/badge/TypeORM-0.3.x-000000?logo=typeorm) ![License](https://img.shields.io/badge/License-MIT-blue)

## Overview

This repository contains the backend implementation of the **Expense Tracker App**, a RESTful API designed to manage user expenses. The API supports user registration, JWT-based authentication, and CRUD operations for expenses with filtering capabilities. The backend is built with **Nest.js**, uses **TypeScript** for strict typing, and persists data in **PostgreSQL** using **TypeORM**.

---

## Features

- **User Authentication**:
  - Register and log in users with JWT-based authentication.
  - Password hashing with `bcrypt`.
- **Expense Management**:
  - Create, read, update, and delete (CRUD) expenses.
  - Filter expenses by period (week, month, 3 months) or custom date range.
  - Paginate and sort expenses by date or amount.
- **Categories**: Predefined expense categories (Groceries, Leisure, Electronics, Utilities, Clothing, Health, Others).
- **Type Safety**: Full TypeScript support with strict typing.
- **Database**: PostgreSQL with TypeORM for ORM.
- **Unit Tests**: Covered with Jest for key services.
- **API Documentation**: Swagger documentation available at `/api`.

---

## Tech Stack

- **Nest.js**: Backend framework.
- **TypeScript**: For strict typing and maintainability.
- **PostgreSQL**: Database for storing users and expenses.
- **TypeORM**: ORM for database interactions.
- **JWT**: For authentication (`@nestjs/jwt` and `passport-jwt`).
- **Jest**: For unit testing.
- **ESLint & Prettier**: For code linting and formatting.
- **Swagger**: For API documentation (`@nestjs/swagger`).

---

## Prerequisites

- **Node.js**: Version 18.x or higher.
- **npm**: Version 9.x or higher.
- **PostgreSQL**: Version 15.x or higher, running on `localhost:5432` (or update the `.env` file).
- **Frontend**: Ensure the [Expense Tracker Frontend](https://github.com/ivkelesh/expense-tracker-frontend) is set up to communicate with this API.

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ivkelesh/expense-tracker-backend.git
   cd expense-tracker-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env` file in the root directory and add the following:
     ```env
     DB_HOST=localhost
     DB_PORT=5432
     DB_USERNAME=postgres
     DB_PASSWORD=password
     DB_NAME=expense_tracker
     JWT_SECRET=your_jwt_secret
     NODE_ENV=development
     ```
   - Update the values as needed for your environment.

4. **Set up the database**:

   - Ensure PostgreSQL is running.
   - Create a database named `expense_tracker`:
     ```sql
     CREATE DATABASE expense_tracker;
     ```
   - TypeORM will automatically synchronize the schema if `synchronize: true` is set in `app.module.ts` (only for development).

5. **Run the development server**:

   ```bash
   npm run start:dev
   ```

   The API will be available at `http://localhost:3000`.

6. **Access Swagger documentation**:
   - Navigate to `http://localhost:3000/api` to explore the API endpoints.

---

## Usage

1. **Register a user**:

   - Send a POST request to `/auth/register`:
     ```bash
     curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}'
     ```

2. **Log in**:

   - Send a POST request to `/auth/login` to receive a JWT token:
     ```bash
     curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}'
     ```
     Response:
     ```json
     { "access_token": "your_jwt_token" }
     ```

3. **Manage expenses**:
   - Use the `/expenses` endpoints with the JWT token in the `Authorization` header (`Bearer your_jwt_token`):
     - **List expenses**: `GET /expenses?page=1&limit=10&sortBy=date&sortOrder=desc&period=month`
     - **Add expense**: `POST /expenses`
     - **Update expense**: `PUT /expenses/:id`
     - **Delete expense**: `DELETE /expenses/:id`

---

## Running Tests

The backend includes unit tests written with Jest.

1. **Run unit tests**:

   ```bash
   npm run test
   ```

2. **Example test**:
   - The `ExpensesService` is tested to ensure it handles CRUD operations and filtering (`expenses.service.spec.ts`).

---

## Deployment

To deploy the backend to a hosting platform like Heroku or Render:

1. **Build the project**:

   ```bash
   npm run build
   ```

   This generates a `dist` folder with the compiled files.

2. **Set up environment variables**:

   - Ensure your hosting platform has the `.env` variables configured (e.g., `DB_HOST`, `JWT_SECRET`).

3. **Deploy to Render**:

   - Create a new Web Service on Render.
   - Connect your GitHub repository.
   - Set the build command to `npm install && npm run build` and the start command to `npm run start:prod`.

4. **Ensure database connectivity**:
   - Set up a PostgreSQL database on your hosting platform (e.g., Render's managed PostgreSQL) and update the `.env` variables accordingly.

---

## Project Structure

```
expense-tracker-backend/
├── src/
│   ├── app.module.ts        # Root module
│   ├── app.controller.ts    # Root controller (health check)
│   ├── app.service.ts       # Root service
│   ├── auth/
│   │   ├── auth.module.ts   # Auth module
│   │   ├── auth.controller.ts # Auth endpoints
│   │   ├── auth.service.ts  # Auth logic
│   │   ├── jwt.strategy.ts  # JWT strategy for Passport
│   │   └── entities/
│   │       └── user.entity.ts # User entity
│   ├── expenses/
│   │   ├── expenses.module.ts # Expenses module
│   │   ├── expenses.controller.ts # Expenses endpoints
│   │   ├── expenses.service.ts # Expenses logic
│   │   ├── dto/
│   │   │   └── expense.dto.ts # DTOs for expenses
│   │   └── entities/
│   │       └── expense.entity.ts # Expense entity
│   └── main.ts              # Entry point
├── test/
│   └── expenses.service.spec.ts # Unit tests for ExpensesService
├── .env                     # Environment variables
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or feedback, please contact [ivan.keles@gmail.com](mailto:ivan.keles@gmail.com).
