import User from "./userModel";
import Post from "./postModel";
import Category from "./categoryModel";
import PostCategory from "./postCategoryModelJunction";
import Comment from "./commentModel";

User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId", as: "user" });

Post.belongsToMany(Category, {
  through: PostCategory,
  foreignKey: "postId",
  as: "categories",
});

Category.belongsToMany(Post, {
  through: PostCategory,
  foreignKey: "categoryId",
  as: "posts",
});

Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });
Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });

export const setupAssociations = () => {};
