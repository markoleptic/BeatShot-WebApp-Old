const express = require("express");
const router = express.Router();
const resendConfEmailController = require('../controllers/resendConfEmailController');

router.post('/', resendConfEmailController.handleResend);

module.exports = router;