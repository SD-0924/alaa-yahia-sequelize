"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAssociations = void 0;
const userModel_1 = __importDefault(require("./userModel"));
const postModel_1 = __importDefault(require("./postModel"));
const categoryModel_1 = __importDefault(require("./categoryModel"));
const postCategoryModelJunction_1 = __importDefault(require("./postCategoryModelJunction"));
const commentModel_1 = __importDefault(require("./commentModel"));
userModel_1.default.hasMany(postModel_1.default, { foreignKey: "userId", as: "posts" });
postModel_1.default.belongsTo(userModel_1.default, { foreignKey: "userId", as: "user" });
userModel_1.default.hasMany(commentModel_1.default, { foreignKey: "userId", as: "comments" });
commentModel_1.default.belongsTo(userModel_1.default, { foreignKey: "userId", as: "user" });
postModel_1.default.belongsToMany(categoryModel_1.default, {
    through: postCategoryModelJunction_1.default,
    foreignKey: "postId",
    as: "categories",
});
categoryModel_1.default.belongsToMany(postModel_1.default, {
    through: postCategoryModelJunction_1.default,
    foreignKey: "categoryId",
    as: "posts",
});
commentModel_1.default.belongsTo(postModel_1.default, { foreignKey: "postId", as: "post" });
postModel_1.default.hasMany(commentModel_1.default, { foreignKey: "postId", as: "comments" });
const setupAssociations = () => { };
exports.setupAssociations = setupAssociations;
