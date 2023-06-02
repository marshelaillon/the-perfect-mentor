"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const User_model_1 = __importDefault(require("../../models/user/User.model"));
function createUser(input) {
    return User_model_1.default.create(input);
}
exports.createUser = createUser;
