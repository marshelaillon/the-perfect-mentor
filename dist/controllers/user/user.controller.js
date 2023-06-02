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
exports.createUserController = void 0;
const user_service_1 = require("../../services/user/user.service");
function createUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = req.body;
        try {
            yield (0, user_service_1.createUser)(userData);
            return res.send('User successfully created');
        }
        catch (error) {
            if (error.code === 11000) {
                return res.status(409).send('Account already exists');
            }
            return res.status(500).send(error);
        }
    });
}
exports.createUserController = createUserController;
