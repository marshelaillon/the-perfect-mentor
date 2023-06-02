import { object, string, TypeOf } from 'zod';

export const roleCreateSchema = object({
  body: object({
    name: string({
      required_error: 'role name is required',
    }),
  }),
});

export type RoleCreationData = TypeOf<typeof roleCreateSchema>['body'];
