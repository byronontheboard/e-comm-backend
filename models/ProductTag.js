const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

// Import the Product model
const Product = require('./Product'); 

// Import the Tag model
const Tag = require('./Tag'); 

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: { // Define the product_id column
      type: DataTypes.INTEGER,
      references: {
        // Referencing the 'product' table
        model: 'product', 
        // Referencing the 'id' column of the 'product' table
        key: 'id',        
      },
    },
    tag_id: { // Define the tag_id column
      type: DataTypes.INTEGER,
      references: {
        // Referencing the 'tag' table
        model: 'tag', 
        // Referencing the 'id' column of the 'tag' table
        key: 'id',    
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
