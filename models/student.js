'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Course }) {
      // define association here

      this.belongsToMany(Course, { through: 'Student_Course', as: 'Courses' });
    }

    toJSON() {
      return { ...this.get(), Password: undefined, id: undefined };
    }
  }
  Student.init(
    {
      UserId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      Name: { type: DataTypes.STRING, allowNull: false },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      Password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Student',
    }
  );
  return Student;
};
