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
    shotsFired: {
      type: DataTypes.INTEGER
    },
    targetsHit: {
      type: DataTypes.INTEGER,
    },
    targetsSpawned: {
      type: DataTypes.INTEGER,
    },
    isBeatTrackMode: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    totalPossibleDamage: {
      type: DataTypes.INTEGER,
    },
    reactionTime: {
      type: DataTypes.FLOAT,
    },
    time: {
      type: DataTypes.DATE,
    },
  });
  return scores;
};
