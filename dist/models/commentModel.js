"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const userModel_1 = __importDefault(require("./userModel"));
const postModel_1 = __importDefault(require("./postModel"));
class Comment extends sequelize_1.Model {
}
Comment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    postId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: config_1.default,
    tableName: "comments",
});
// Associations
Comment.belongsTo(userModel_1.default, { foreignKey: "userId", as: "user" });
userModel_1.default.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(postModel_1.default, { foreignKey: "postId", as: "post" });
postModel_1.default.hasMany(Comment, { foreignKey: "postId", as: "comments" });
exports.default = Comment;
