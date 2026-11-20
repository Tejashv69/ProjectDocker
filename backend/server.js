
const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function startServer() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      company VARCHAR(100)
    )
  `);

  await pool.query(`
    INSERT INTO students (name, email, company)
    VALUES ('Tejashv Srivastava', 'tejashv.2428cse754@kiet.edu', 'Google')
    ON CONFLICT (email) DO NOTHING
  `);

  app.get("/api/health", (req, res) => {
    res.json({ message: "Backend is working" });
  });

  app.get("/api/students", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM students");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.listen(5000, "0.0.0.0", () => {
    console.log("Backend running on port 5000");
  });
}

startServer().catch(console.error);
