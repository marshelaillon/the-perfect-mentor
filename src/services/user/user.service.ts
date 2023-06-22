import UserModel, { User } from '../../models/user/User.model';

export function createUser(input: Partial<User>) {
  return UserModel.create(input);
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email }).populate('role', '_id name');
}

export function updateUser(id: string, newUserData: object) {
  return UserModel.findOneAndUpdate({ _id: id }, newUserData, {
    new: true,
    runValidators: true,
  });
}
