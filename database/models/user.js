module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
      // indexes: [
      //   {
      //     unique: true,
      //     fields: ["id"]
      //   }
      // ]
    }
  );

  return User;
};
