import UserModel, { User } from '../../models/user/User.model';

export function createUser(input: Partial<User>) {
  return UserModel.create(input);
}
