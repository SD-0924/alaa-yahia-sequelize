import { Sequelize, DataTypes } from "sequelize";
import Post from "../../models/postModel";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

const MockPost = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
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
}) as typeof Post;

describe("Post Model", () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  it("should create a new post", async () => {
    const post = await MockPost.create({
      title: "Sample Post",
      content: "This is a sample post.",
      userId: 1,
    });
    expect(post.title).toBe("Sample Post");
    expect(post.content).toBe("This is a sample post.");
  });
});
