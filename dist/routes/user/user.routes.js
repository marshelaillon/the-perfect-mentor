"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateResource_1 = __importDefault(require("../../middlewares/validateResource"));
const user_schema_1 = require("../../schema/user/user.schema");
const user_controller_1 = require("../../controllers/user/user.controller");
const router = (0, express_1.Router)();
router.post('/', (0, validateResource_1.default)(user_schema_1.userRegisterSchema), user_controller_1.createUserController);
exports.default = router;
