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
exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtUtils_1 = require("../Utils/jwtUtils");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        // Check if the email is already registered
        const existingUser = yield userModel_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered." });
        }
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const newUser = yield userModel_1.default.create({
            username,
            email,
            password: hashedPassword,
            tokenIssuedAt: new Date(),
        });
        const token = (0, jwtUtils_1.generateToken)({
            userId: newUser.id,
            email: newUser.email,
            tokenIssuedAt: newUser.tokenIssuedAt,
        });
        res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            },
            token,
        });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "An error occurred during registration." });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }
    const isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password." });
    }
    user.tokenIssuedAt = new Date();
    yield user.save();
    const token = (0, jwtUtils_1.generateToken)({
        userId: user.id,
        email: user.email,
        tokenIssuedAt: user.tokenIssuedAt,
    });
    res.status(200).json({ message: "Login successful.", token });
});
exports.loginUser = loginUser;
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
        const user = yield userModel_1.default.create({
            username,
            email,
            password,
            tokenIssuedAt: new Date(),
        });
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
        let username, email, password;
        if (req.body) {
            username = req.body.username;
            email = req.body.email;
            password = req.body.password;
        }
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
exports.default = {
    loginUser: exports.loginUser,
    registerUser: exports.registerUser,
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
};
