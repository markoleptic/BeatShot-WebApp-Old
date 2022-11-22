const express = require('express');
const router = express.Router();
const patchNotesController = require('../controllers/patchNotesController')

router.get("/", patchNotesController.handlePatchNotes);

module.exports = router;