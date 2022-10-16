const { users, scores } = require("../models");
const { Op } = require("sequelize");
require("dotenv").config();

const saveScores = async (req, res) => {
  var data = req.body;
  const foundUser = await users.findOne({
    where: { username: req.params.userid },
  });
  const foundScores = await scores.findAll(
    { raw: true, nest: true },
    { where: { userID: foundUser.userID } }
  );
  const times = [];
  for (entry in foundScores) {
    times.push(foundScores[entry].time.toJSON());
  }

  for (let gameModeScorePairs in data) {
    for (let scorePair in gameModeScorePairs) {
      for (let scoreElements in data[gameModeScorePairs][scorePair]
        .playerScoreArray) {
        let gameMode =
          data[gameModeScorePairs][scorePair].playerScoreArray[scoreElements]
            .gameModeActorName;
        let highScore =
          data[gameModeScorePairs][scorePair].playerScoreArray[scoreElements]
            .highScore;
        let score =
          data[gameModeScorePairs][scorePair].playerScoreArray[scoreElements]
            .score;
        let time =
          data[gameModeScorePairs][scorePair].playerScoreArray[scoreElements]
            .time;
        let songTitle =
          data[gameModeScorePairs][scorePair].playerScoreArray[scoreElements]
            .songTitle;
        let splitTime = time.split("-");
        splitTime[0] = splitTime[0].replaceAll(/\./g, "-");
        splitTime[1] = splitTime[1].replaceAll(/\./g, ":");
        let formattedString = splitTime[0]
          .concat("T", splitTime[1])
          .concat(".000Z");
        if (times.includes(formattedString) === false) {
          scores.create({
            userID: foundUser.userID,
            gameModeActorName: gameMode,
            highScore: highScore,
            score: score,
            time: formattedString,
            songTitle: songTitle,
          });
        }
      }
    }
  }
  res.status(200).json("Scores successfully added to database");
};

const getScores = async (req, res) => {
  const userID = req.params.userid;
  try {
    const foundUser = await users.findOne({
      where: { username: userID },
    });
    const foundScores = await scores.findAll(
      { raw: true, nest: true },
      { where: { userID: foundUser.userID } }
    );
    res.status(200).json(foundScores);
  } catch (error) {
    console.log(error);
    return res.status(400).json("not confirmed");
  }
};

module.exports = { saveScores, getScores };
