'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Setup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Setup.init({
    key: DataTypes.STRING,
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Setup',
  });
  return Setup;
};