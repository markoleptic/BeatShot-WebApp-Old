const { users, scores } = require("../models");
require("dotenv").config();

const saveScores = async (req, res) => {
  var data = req.body;
  const foundUser = await users.findOne({
    where: { username: req.params.userid },
  });
  const foundScores = await scores.findAll(
    { raw: true, 
      nest: true,
      where: { userID: foundUser.userID }
    }
  );
  const times = [];
  for (entry in foundScores) {
    times.push(foundScores[entry].time.toJSON());
  }
  for (let scoreArray in data) {
    for (let scoreObject in data[scoreArray]) {
      if (times.includes(data[scoreArray][scoreObject].time) === false) {
        scores.create({
          userID: foundUser.userID,
          defaultMode: data[scoreArray][scoreObject].defaultMode,
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
          time: data[scoreArray][scoreObject].time,
          streak: data[scoreArray][scoreObject].streak,
          difficulty: data[scoreArray][scoreObject].difficulty,
          locationAccuracy: data[scoreArray][scoreObject].locationAccuracy,
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
    if (foundUser) {
      const foundScores = await scores.findAll(
        { raw: true, 
          nest: true,
          where: { userID: foundUser.userID }
         }
      );
      res.status(200).json(foundScores);
    } else {
      res.status(401).json('User not found.');
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json("not confirmed");
  }
};

module.exports = { saveScores, getScores };
