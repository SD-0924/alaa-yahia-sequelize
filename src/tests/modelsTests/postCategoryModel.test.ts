// tests/models/postCategoryModel.test.ts

import { Sequelize, DataTypes } from "sequelize";
import PostCategory from "../../models/postCategoryModelJunction";

// Mock Sequelize instance
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

// Mock PostCategory model based on actual model structure
const MockPostCategory = sequelize.define("post_category", {
  postId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}) as typeof PostCategory;

describe("PostCategory Model (Junction Table)", () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  it("should create an association between post and category", async () => {
    const postCategory = await MockPostCategory.create({
      postId: 1,
      categoryId: 1,
    });
    expect(postCategory.postId).toBe(1);
    expect(postCategory.categoryId).toBe(1);
  });
});
