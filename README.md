# multi-db-clean-architecture-api-manage-supermarket
This Backend project  is a modular RESTful API built with Node.js. designed follows Clean Architecture principles, with capacity to intregrates multiplates databases (MongoDB for authentication and PostgresSQL for business features such as bills and providers ), and implements a global logging strategy for error tracking and perfomance monitoring.

---

## Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Core Runtime** | Node.js • TypeScript • Express |
| **Architecture** | Clean Architecture • Domain-Driven Design |
| **Databases** | MongoDB (Authentication) • PostgreSQL (Business Data via TypeORM) |
| **Utilities** | Winston Logger • Dotenv • Class-Validator |
| **Testing** | Jest • Supertest |

---

## Project Structure

src/

├── domain/ # Entities, domain rules.

├── application/ # Dtos, Validation dtos, Assembler dto to Entity, Use cases.

├── infrastructure/ # Database implementations, Assembler dts to Entity (TypeORM, Mongo, Repositories).

├── Presentation/ # Controllers, routes, and HTTP layer.

├── shared/ # Logger, helpers, and common configurations.

└── main.ts # Application bootstrap.

---

## 🧠 Features

- **Authentication Module (MongoDB)**  
  Handles user registration, login, and token validation using a dedicated NoSQL database.

- **Business Module (PostgreSQL)**  
  Manages entities like **Bills** and **Providers** through a relational structure powered by TypeORM.

- **Clean Architecture Implementation**  
  Separates concerns by layers — making the system scalable, testable, and framework-agnostic.

- **Global Logging System**  
  Centralized logs for requests, responses, and errors using Winston.

- **Environment-based Configuration**  
  Controlled via `.env` file with different environments (dev, test, prod).

---


---

## 🧠 Features

- 🔐 **Authentication Module (MongoDB)**  
  Handles user registration, login, and token validation using a dedicated NoSQL database.

- 💼 **Business Module (PostgreSQL)**  
  Manages entities like **Bills** and **Providers** through a relational structure powered by TypeORM.

- 🧩 **Clean Architecture Implementation**  
  Separates concerns by layers — making the system scalable, testable, and framework-agnostic.

- 🪵 **Global Logging System**  
  Centralized logs for requests, responses, and errors using Winston.

- ⚙️ **Environment-based Configuration**  
  Controlled via `.env` file with different environments (dev, test, prod).

---

## ⚙️ Setup & Installation

```bash
# Clone the repository
git clone https://github.com/jimmyanaya/multi-db-clean-api.git

# Install dependencies
npm install

# Create an environment file
cp .env.example .env

# Example environment variables
PORT=3000
NODE_ENV=development

# MongoDB (Auth)
MONGO_URI=mongodb://localhost:27017/auth_db

# PostgreSQL (Business)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=1234
DB_NAME=market_db

🧾 License

MIT License © 2025 Jimmy Anaya

🧠 Author

Jimmy Rodolfo Anaya Anaya
Full-Stack Developer | Node.js • Angular • PostgreSQL
📧 jimmyanayadeveloper@gmail.com
🌐 https://www.linkedin.com/in/jimmy-anaya-3a823b27a/

