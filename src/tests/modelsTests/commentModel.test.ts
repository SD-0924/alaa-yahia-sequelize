import { Sequelize, DataTypes } from "sequelize";
import Comment from "../../models/commentModel";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

const MockComment = sequelize.define("comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}) as typeof Comment;

describe("Comment Model", () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  it("should create a new comment", async () => {
    const comment = await MockComment.create({
      content: "This is a comment",
      postId: 1,
      userId: 1,
    });
    expect(comment.content).toBe("This is a comment");
  });
});
