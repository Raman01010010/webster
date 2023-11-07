const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/', jobController.create);
router.get('/',jobController.showjob)
module.exports = router;
