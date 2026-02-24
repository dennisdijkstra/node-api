# Node API Project

RESTful backend API written in Node.js with a MongoDB database.

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- REST-style HTTP API

## Project Structure

- `server.js` – application entrypoint
- `config/` – database configuration
- `controllers/` – business logic for routes (auth, bootcamps, courses)
- `models/` – Mongoose models (Bootcamp, Course, User)
- `routes/` – API route definitions
- `middleware/` – custom middleware (error handling, async wrapper, advanced results)
- `utils/` – utility functions (error response, geocoding)
- `_data/` – seed data for database
- `seeder.js` – database seeding script

## Getting Started

1. Install Node.js and MongoDB.
2. Create a MongoDB database.
3. Copy `.env.example` to `.env` and fill in the values.
4. Install dependencies:

```bash
npm install
```

5. Run the app:

```bash
npm run dev
```

## Development

- Use `npm run dev` to run the app with nodemon (auto-restart on changes).
- Use `npm start` for production mode.
- Seed the database with `node seeder.js -i` (import) or `node seeder.js -d` (delete).
- API endpoints are organized by feature (bootcamps, courses, auth).
