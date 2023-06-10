import { object, string, TypeOf } from 'zod';
import { Types } from 'mongoose';

const roles = [
  {
    role_name: 'mentor',
    id: new Types.ObjectId('647938cc277428858a11d41b'),
  },
  {
    role_name: 'mentee',
    id: new Types.ObjectId('64792d144deecee9c09d3aa9'),
  },
];

function isValidRoleId(value: string) {
  return roles.some(role => role.id.equals(value));
}

export const userRegisterSchema = object({
  body: object({
    email: string({
      required_error: 'email is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'password is required',
    }).min(6, 'Password is too short - should be min 6 characters'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
    role: string({
      required_error: 'Role id is required',
    })
      .refine(isValidRoleId, {
        message: 'Invalid role id',
      })
      .transform(value => new Types.ObjectId(value)),
  }).refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  }),
});

export type UserRegisterInput = TypeOf<typeof userRegisterSchema>['body'];

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
