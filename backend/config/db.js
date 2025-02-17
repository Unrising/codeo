// config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

// On récupère les informations de connexion depuis le fichier .env
dotenv.config();

// Création du pool qui permet la connexion à MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// On exécute la connexion
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err.message);
  } else {
    console.log('Connecté à la base de données MySQL.');
    connection.release();
  }
});

module.exports = pool;
