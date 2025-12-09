const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.post('/reorder', cardController.reorderCard);

module.exports = router;