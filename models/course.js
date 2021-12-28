'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Student }) {
      // define association here
      this.belongsToMany(Student, {
        through: 'Student_Course',
        as: 'Students',
      });
    }
  }
  Course.init(
    {
      Lecturer: { type: DataTypes.STRING, allowNull: false },
      Course: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Course',
    }
  );
  return Course;
};
