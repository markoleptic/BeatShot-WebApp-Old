const { users, scores } = require("../models");
const { Op } = require("sequelize");
require("dotenv").config();

const saveScores = async (req, res) => {
  var data = req.body;
  console.log(data);
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
    for (let scorePairs in data[gameModeScorePairs]) {
      //console.log(data[gameModeScorePairs][scorePairs].playerScoreArray)
    }
  }

  for (let gameModeScorePairs in data) {
    for (let scorePair in data[gameModeScorePairs]) {
      for (let scoreElements in data[gameModeScorePairs][scorePair]) {
        for (let playerScoreArray in data[gameModeScorePairs][scorePair][
          scoreElements
        ]) {
          let gameMode =
            data[gameModeScorePairs][scorePair][scoreElements][playerScoreArray]
              .gameModeActorName;
          let highScore =
            data[gameModeScorePairs][scorePair][scoreElements][playerScoreArray]
              .highScore;
          let score =
            data[gameModeScorePairs][scorePair][scoreElements][playerScoreArray]
              .score;
          let time =
            data[gameModeScorePairs][scorePair][scoreElements][playerScoreArray]
              .time;
          let songTitle =
            data[gameModeScorePairs][scorePair][scoreElements][playerScoreArray]
              .songTitle;
          let customGameModeName =
            data[gameModeScorePairs][scorePair][scoreElements][playerScoreArray]
              .customGameModeName;
          let songLength =
            data[gameModeScorePairs][scorePair][scoreElements][playerScoreArray]
              .songLength;
          let shotsFired =
            data[gameModeScorePairs][scorePair][scoreElements][playerScoreArray]
              .shotsFired;
          let targetsHit =
            data[gameModeScorePairs][scorePair][scoreElements][playerScoreArray]
              .targetsHit;
          let targetsSpawned =
            data[gameModeScorePairs][scorePair][scoreElements][playerScoreArray]
              .targetsSpawned;
          let isBeatTrackMode =
            data[gameModeScorePairs][scorePair][scoreElements][playerScoreArray]
              .isBeatTrackMode;
          let totalPossibleDamage =
            data[gameModeScorePairs][scorePair][scoreElements][playerScoreArray]
              .totalPossibleDamage;

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
              customGameModeName: customGameModeName,
              songLength: songLength,
              shotsFired: shotsFired,
              targetsHit: targetsHit,
              targetsSpawned: targetsSpawned,
              isBeatTrackMode: isBeatTrackMode,
              totalPossibleDamage: totalPossibleDamage,
            });
          }
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
