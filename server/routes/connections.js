const express = require('express');
const router = express.Router();

const fetchingConnection = require('../controllers/fetchingConnection');

// Define your post route with the callback function
router.post('/', fetchingConnection.myconnection);

module.exports = router;
