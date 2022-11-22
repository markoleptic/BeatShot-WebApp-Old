const express = require("express");
const router = express.Router();
const confirmationController = require('../controllers/confirmationController');

router.get("/:token", confirmationController.handleConfirmation);

module.exports = router;
