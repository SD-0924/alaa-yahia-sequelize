import { Sequelize, DataTypes } from "sequelize";
import User from "../../models/userModel";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

const MockUser = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}) as typeof User;

describe("User Model", () => {
  beforeAll(async () => {
    await sequelize.sync(); // Sync database before running tests
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new user", async () => {
    const user = await MockUser.create({
      username: "John Doe",
      email: "john@example.com",
      password: "securepassword",
    });
    expect(user.username).toBe("John Doe");
    expect(user.email).toBe("john@example.com");
  });
});
