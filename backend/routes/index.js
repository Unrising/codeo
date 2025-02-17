// backend/routes/index.js
const express = require('express');
const router = express.router();
const exampleController = require('../controllers/exampleController');

// On definie une route 
router.get('/hello', exampleController.getHelloMessage);

module.exports = router;