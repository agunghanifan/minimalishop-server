'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/hash-password')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart, { foreignKey: 'userId'})
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required"
        },
        notNull: {
          args: true,
          msg: "Name is required"
        }
      }
    } ,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required"
        },
        notNull: {
          args: true,
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Email type is required"
        }
      }
    },   
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required"
        },
        notNull: {
          args: true,
          msg: "Password is required"
        },
        isLengthMinSix (value) {
          if (value.length < 6) {
            throw new Error("Password must be at least 6 characters")
          }
        }
      }
    } ,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: function (instance) {
        instance.role = "customer"
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return User;
};