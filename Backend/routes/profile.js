const express = require("express");
const router = express.Router();
//const profileController = require('../controllers/profileController')
const scoresController = require('../controllers/scoresController')

router.post("/:userid/savescores/", scoresController.saveScores);
router.get("/:userid/getscores/", scoresController.getScores);

module.exports = router;