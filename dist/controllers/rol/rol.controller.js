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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRolesController = void 0;
const rol_service_1 = require("../../services/rol/rol.service");
function listRolesController(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const roles = yield (0, rol_service_1.listRoles)();
            return roles;
        }
        catch (error) {
            console.log(error, "Couldn't list roles");
            return res.status(500).send(error);
        }
    });
}
exports.listRolesController = listRolesController;
