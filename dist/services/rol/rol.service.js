"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRoles = void 0;
const Rol_model_1 = __importDefault(require("../../models/rol/Rol.model"));
function listRoles() {
    return Rol_model_1.default.find();
}
exports.listRoles = listRoles;
