import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";
import { User } from "./user.model.js";

export const Meeting = sequelize.define(
  "Meeting",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Users",
        key: "email",
      },
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Meeting, { foreignKey: "userEmail" });
Meeting.belongsTo(User, { foreignKey: "userEmail" });
