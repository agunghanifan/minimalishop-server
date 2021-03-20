'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Banner.belongsTo(models.Category,{foreignKey: "CategoryId"})
    }
  };
  Banner.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is required"
        },
        notNull: {
          args: true,
          msg: "Title is required"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Status is required"
        },
        notNull: {
          args: true,
          msg: "Status is required"
        }
      }
    } ,
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image url is required"
        },
        notNull: {
          args: true,
          msg: "Image url is required"
        },
        isUrl: {
          args: true,
          msg: "Image Url is must a url or link's"
        }
      }
    } ,
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Categories"
        },
        key: 'id'
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    } 
  }, {
    sequelize,
    modelName: 'Banner',
    hooks: {
      beforeCreate: (instance) => {
        instance.status = "available"
      }
    }
  });
  return Banner;
};