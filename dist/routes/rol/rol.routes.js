"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rol_controller_1 = require("../../controllers/rol/rol.controller");
const router = (0, express_1.Router)();
router.get('/', rol_controller_1.listRolesController);
exports.default = router;
