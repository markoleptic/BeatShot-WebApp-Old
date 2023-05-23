'use strict';
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkUpdate(
      "scores",
      { gameModeType: "Custom" },
      { [Op.and]: [
          { baseGameMode: "Custom" },
          {[Op.not]: [{ customGameModeName: "" }]},
        ],
      }
    );
    await queryInterface.bulkUpdate(
      "scores",
      { gameModeType: "Preset" },
      { [Op.or]: [
          { baseGameMode: "BeatGrid" },
          { baseGameMode: "MultiBeat" },
          { baseGameMode: "SingleBeat" },
          { baseGameMode: "BeatTrack" },
        ],
      }
    );
  },
  async down (queryInterface, Sequelize) {
  }
};
