module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    userID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        len: [4, 20],
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return users;
};
