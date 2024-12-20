// db.js
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const dotenv = require('dotenv'); // Use dotenv for environment variables

dotenv.config(); 
const dbPath = process.env.DB_PATH || path.join(__dirname, 'marine.db');

let db;

const initializeDbAndServer = async () => {
    console.log('aaaaaaaa')
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        return db;
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
};

initializeDbAndServer().catch(err => {
    console.error('Error during DB initialization:', err);
    process.exit(1); // Exit the process if DB connection fails
});

module.exports = { db, initializeDbAndServer };
