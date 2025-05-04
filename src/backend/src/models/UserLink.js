const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserLink extends Model {
    static associate(models) {
      UserLink.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  UserLink.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      platform: DataTypes.STRING,
      url: DataTypes.STRING,
      order: DataTypes.INTEGER,
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserLink',
      tableName: 'user_links',
      timestamps: true,
      underscored: true,
    }
  );

  return UserLink;
};
