"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const generateToken = (userId) => {
    return (0, jsonwebtoken_1.sign)({ userId }, process.env.JWT_SECRET || "tudu", { expiresIn: '7d' });
};
exports.default = generateToken;
