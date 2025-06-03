import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';

dotenv.config();

const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        console.error(`❌ Missing required environment variable: ${key}`);
        process.exit(1);
    }
});

const app = express();
const PORT = process.env.PORT || 5000;


// MySQL connection
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

// test connection

async function testDB() {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS solution');
        console.log('MySQL connected:', rows);
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

testDB();

// middleware

app.use(cors());
app.use(express.json());

app.get('/api/data', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM your_table');
    res.json(rows);
});

// start server

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});