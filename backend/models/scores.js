const users = require("./users");

module.exports = (sequelize, DataTypes) => {
  const scores = sequelize.define("scores", {
    scoreID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    gameModeActorName: {
      type: DataTypes.STRING,
    },
    customGameModeName: {
      type: DataTypes.STRING,
    },
    songTitle: {
      type: DataTypes.STRING,
    },
    songLength: {
      type: DataTypes.FLOAT,
    },
    score: {
      type: DataTypes.FLOAT,
    },
    highScore: {
      type: DataTypes.FLOAT,
    },
    accuracy: {
      type: DataTypes.FLOAT,
    },
    completion: {
      type: DataTypes.FLOAT,
    },
    shotsFired: {
      type: DataTypes.INTEGER
    },
    targetsHit: {
      type: DataTypes.INTEGER,
    },
    targetsSpawned: {
      type: DataTypes.INTEGER,
    },
    totalPossibleDamage: {
      type: DataTypes.INTEGER,
    },
    totalTimeOffset: {
      type: DataTypes.FLOAT
    },
    avgTimeOffset: {
      type: DataTypes.FLOAT,
    },
    time: {
      type: DataTypes.DATE(3),
    },
    streak: {
      type: DataTypes.INTEGER,
    },
    difficulty: {
      type: DataTypes.STRING,
    },
  });
  return scores;
};
