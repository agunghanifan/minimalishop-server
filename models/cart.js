'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Product, { foreignKey: "productId" })
      Cart.belongsTo(models.User, { foreignKey: "userId"})
    }
  };
  Cart.init({
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Products"
        },
        key: 'id'
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    } ,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        table: {
          tableName: "Users"
        },
        key: 'id'
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    } ,
    amount: {
      type: DataTypes.INTEGER
    } 
  }, {
    sequelize,
    modelName: 'Cart',
    hooks: {
      beforeCreate: function(instance) {
        instance.amount = 1
      }
    }
  });
  return Cart;
};