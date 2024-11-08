import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config";
import Post from "./postModel";
import Category from "./categoryModel";

interface PostCategoryAttributes {
  postId: number;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class PostCategory
  extends Model<PostCategoryAttributes>
  implements PostCategoryAttributes
{
  public postId!: number;
  public categoryId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PostCategory.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Post,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "post_categories",
  }
);

// Associations for many-to-many relationship
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

export default PostCategory;
