"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.findAll();
        return res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: error.message });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const user = yield userModel_1.default.create({ username, email, password });
        return res.status(201).json(user);
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: error.message });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({ message: error.message });
    }
});
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const user = yield userModel_1.default.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password;
        yield user.save();
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: error.message });
    }
});
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        yield user.destroy();
        return res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: error.message });
    }
});
module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
};
