"use strict";
// // tests/models/userModel.test.ts
// import { Sequelize, DataTypes } from "sequelize";
// import User from "../../models/userModel";
// // import { MockModel } from "sequelize-mock";
// // Mock Sequelize instance
// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: ":memory:",
// });
// // Mock User model based on actual model structure
// const MockUser = sequelize.define("User", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// }) as typeof User;
// describe("User Model", () => {
//   it("should create a new user", async () => {
//     const user = await MockUser.create({
//       username: "John Doe",
//       email: "john@example.com",
//       password: "securepassword",
//     });
//     expect(user.username).toBe("John Doe");
//     expect(user.email).toBe("john@example.com");
//   });
// });
