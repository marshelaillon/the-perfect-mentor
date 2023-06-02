"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegisterSchema = void 0;
const zod_1 = require("zod");
exports.userRegisterSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'email is required',
        }).email('Not a valid email'),
        username: (0, zod_1.string)({
            required_error: 'username is required',
        }),
        password: (0, zod_1.string)({
            required_error: 'password is required',
        }).min(6, 'Password is too short - should be min 6 characters'),
        passwordConfirmation: (0, zod_1.string)({
            required_error: 'Password confirmation is required',
        }),
    }).refine(data => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),
});
