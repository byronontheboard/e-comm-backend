const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

// Import the Product model
const Product = require('./Product'); 

class Category extends Model {}

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

// Define relationships after initializing Category model
Category.hasMany(Product, {
  // This will be the foreign key in the Product model
  foreignKey: 'category_id', 
});

module.exports = Category;
