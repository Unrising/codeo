// backend/server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Chargement des variables .env
dotenv.config();

// db config
require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

// Home route
app.get('/', (req,res) => {
    res.send('Welcome to codeo');
});

// Lancement du serveur
app.listen(port,() => {
    console.log(`Server is running on port  ${port}`);
});