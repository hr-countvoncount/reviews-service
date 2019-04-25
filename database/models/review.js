module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define(
    "review",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      date: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING(1000)
      },
      rating: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      apartment_id: {
        type: Sequelize.INTEGER
      },
      has_response: {
        type: Sequelize.BOOLEAN
      },
      owner_response: {
        type: Sequelize.STRING(1000)
      }
    },
    {
      timestamps: false
      // indexes: [
      //   {
      //     unique: true,
      //     fields: ["apartment_id"]
      //   }
      // ]
    }
  );

  return Review;
};
