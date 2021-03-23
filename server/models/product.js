'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category,{ foreignKey: "CategoryId" })
      Product.hasMany(models.Cart, { foreignKey: 'productId' })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
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
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image Url is required for product display purposes"
        },
        notNull: {
          args: true,
          msg: "Image Url is required for product display purposes"
        },
        isUrl: {
          args: true,
          msg: "Image Url is must a url or link's"
        }
      }
    } ,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price is required"
        },
        notNull: {
          args: true,
          msg: "Price is required"
        },
        isInt: {
          args: true,
          msg: "Price format is Number / Integer"
        },
        isNegative(value) {
          if(typeof value === "number" && value < 1) {
            throw new Error("Price must be Positive and the value is above from 0")
          }
        }
      }
    } ,
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Stock is required"
        },
        notNull: {
          args: true,
          msg: "Stock is required"
        },
        isInt: {
          args: true,
          msg: "Stock format is Number / Integer"
        },
        isNegative(value) {
          if(typeof value === "number" && value < 0) {
            throw new Error("Stock must be not Negative")
          }
        }
      }
    } ,
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Categories"
        },
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};