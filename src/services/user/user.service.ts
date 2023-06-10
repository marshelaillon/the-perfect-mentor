import UserModel, { User } from '../../models/user/User.model';

export function createUser(input: Partial<User>) {
  return UserModel.create(input);
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

export function getUser(userId: string) {
  return UserModel.findById(userId).select('-password').lean();
}
