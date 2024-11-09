"use strict";
// tests/models/postCategoryModel.test.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Mock Sequelize instance
const sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
});
// Mock PostCategory model based on actual model structure
const MockPostCategory = sequelize.define("post_category", {
    postId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
});
describe("PostCategory Model (Junction Table)", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelize.sync();
    }));
    it("should create an association between post and category", () => __awaiter(void 0, void 0, void 0, function* () {
        const postCategory = yield MockPostCategory.create({
            postId: 1,
            categoryId: 1,
        });
        expect(postCategory.postId).toBe(1);
        expect(postCategory.categoryId).toBe(1);
    }));
});
