import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: 'email is required',
    }).email('Not a valid email'),

    username: string({
      required_error: 'username is required',
    }),

    password: string({
      required_error: 'password is required',
    }).min(6, 'Password is too short - should be min 6 characters'),

    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
  }).refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
