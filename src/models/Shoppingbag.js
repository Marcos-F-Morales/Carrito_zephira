import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Shoppingbag = sequelize.define("shoppingbag", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  producto_talla_color_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});
