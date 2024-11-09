import { Sequelize, DataTypes } from "sequelize";
import Category from "../../models/categoryModel";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

const MockCategory = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}) as typeof Category;

describe("Category Model", () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  it("should create a new category", async () => {
    const category = await MockCategory.create({ name: "Technology" });
    expect(category.name).toBe("Technology");
  });
});
