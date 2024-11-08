import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/config";
import Post from "./postModel";

interface CommentAttributes {
  id: number;
  content: string;
  userId: number;
  postId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {}

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public id!: number;
  public content!: string;
  public userId!: number;
  public postId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "comments",
  }
);

Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });
Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });

export default Comment;
