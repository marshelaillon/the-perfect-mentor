import { array, object, string, TypeOf } from 'zod';
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

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;

const passwordMinLength = 8;

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

export const updateUserDataSchema = object({
  body: object({
    email: string().nonempty().email('Not a valid email').nonempty().optional(),
    password: string()
      .nonempty()
      .refine(value => passwordRegex.test(value), {
        message:
          'Password must contain at least one uppercase letter, one number, and one special character',
      })
      .refine(value => value.length >= passwordMinLength, {
        message: `Password must be at least ${passwordMinLength} characters long`,
      })
      .optional(),
    name: string().nonempty().optional(),
    lastname: string().nonempty().optional(),
    role: string()
      .nonempty('Age field cannot be empty')
      .refine(isValidRoleId, {
        message: 'Invalid role id',
      })
      .transform(value => new Types.ObjectId(value))
      .optional(),
    residence_country: string().nonempty().optional(),
    occupation: string().nonempty().optional(),
    description: string().nonempty().optional(),
    languages: array(string())
      .nonempty('Languages field cannot be empty')
      .optional(),
    skills: array(string()).nonempty('Skills field cannot be empty').optional(),
  }),
});

export type UserRegisterInput = TypeOf<typeof userRegisterSchema>['body'];

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];

export type UserUpdateData = TypeOf<typeof updateUserDataSchema>['body'];
