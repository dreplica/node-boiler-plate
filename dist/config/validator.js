"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.checkPostSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.checkPostSchema = joi_1.default.object({
    organization: joi_1.default.string().regex(/^[a-zA-Z]{3,30}$/i).required(),
    address: joi_1.default.string().required(),
    ceo: joi_1.default.string().required(),
    employees: joi_1.default.array().items(joi_1.default.string().regex(/^[a-zA-Z]{2,}$/).required()),
    products: joi_1.default.array().items(joi_1.default.string().regex(/^[a-zA-Z]{5,}$/).required())
});
exports.loginSchema = joi_1.default.object({
    username: joi_1.default.string().regex(/^[\w|\d]{2,}$/).max(10).required(),
    password: joi_1.default.string().regex(/.{6,20}/).required(),
});
