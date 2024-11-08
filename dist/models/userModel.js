"use strict";
// src/models/UserModel.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const postModel_1 = __importDefault(require("./postModel"));
const commentModel_1 = __importDefault(require("./commentModel"));
// Define the User model
class User extends sequelize_1.Model {
}
// Initialize the User model with Sequelize
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: config_1.default,
    tableName: "users",
});
// Associations
User.hasMany(postModel_1.default, { foreignKey: "userId", as: "posts" });
postModel_1.default.belongsTo(User, { foreignKey: "userId", as: "author" });
User.hasMany(commentModel_1.default, { foreignKey: "userId", as: "comments" });
commentModel_1.default.belongsTo(User, { foreignKey: "userId", as: "user" });
exports.default = User;
