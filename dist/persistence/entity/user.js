"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const sequelize = new database_1.default().initDb();
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    password: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('Admin', 'User'),
        allowNull: false
    },
}, {
    tableName: 'users',
    sequelize: sequelize,
    modelName: 'User',
});
