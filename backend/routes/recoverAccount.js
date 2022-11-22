const express = require('express');
const router = express.Router();
const recoverAccountController = require('../controllers/recoverAccountController');

router.post('/', recoverAccountController.handleRecovery);

module.exports = router;