"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const postModel_1 = __importDefault(require("./postModel"));
const categoryModel_1 = __importDefault(require("./categoryModel"));
class PostCategory extends sequelize_1.Model {
}
PostCategory.init({
    postId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: postModel_1.default,
            key: "id",
        },
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: categoryModel_1.default,
            key: "id",
        },
    },
}, {
    sequelize: config_1.default,
    tableName: "post_categories",
});
// Associations for many-to-many relationship
postModel_1.default.belongsToMany(categoryModel_1.default, {
    through: PostCategory,
    foreignKey: "postId",
    as: "categories",
});
categoryModel_1.default.belongsToMany(postModel_1.default, {
    through: PostCategory,
    foreignKey: "categoryId",
    as: "posts",
});
exports.default = PostCategory;
