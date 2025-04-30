import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'

export const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comment: { type: DataTypes.TEXT, allowNull: false }
}, {
  timestamps: false
})
