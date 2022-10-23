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
  for (let scoreArray in data) {
    for (let scoreObject in data[scoreArray]) {
      let time = data[scoreArray][scoreObject].time;
      let splitTime = time.split("-");
      splitTime[0] = splitTime[0].replace(/\./g, "-");
      splitTime[1] = splitTime[1].replace(/\./g, ":");
      let formattedTime = splitTime[0]
        .concat("T", splitTime[1])
        .concat(".000Z");
      if (times.includes(formattedTime) === false) {
        scores.create({
          userID: foundUser.userID,
          gameModeActorName: data[scoreArray][scoreObject].gameModeActorName,
          customGameModeName: data[scoreArray][scoreObject].customGameModeName,
          songTitle: data[scoreArray][scoreObject].songTitle,
          songLength: data[scoreArray][scoreObject].songLength,
          score: data[scoreArray][scoreObject].score,
          highScore: data[scoreArray][scoreObject].highScore,
          accuracy: data[scoreArray][scoreObject].accuracy,
          completion: data[scoreArray][scoreObject].completion,
          shotsFired: data[scoreArray][scoreObject].shotsFired,
          targetsHit: data[scoreArray][scoreObject].targetsHit,
          targetsSpawned: data[scoreArray][scoreObject].targetsSpawned,
          totalPossibleDamage:
            data[scoreArray][scoreObject].totalPossibleDamage,
          totalTimeOffset: data[scoreArray][scoreObject].totalTimeOffset,
          avgTimeOffset: data[scoreArray][scoreObject].avgTimeOffset,
          time: formattedTime,
        });
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
