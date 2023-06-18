const express = require("express");
const router = express.Router();
const sendFeedbackController = require('../controllers/sendFeedbackController');

router.post('/', sendFeedbackController.handleSendFeedback);

module.exports = router;