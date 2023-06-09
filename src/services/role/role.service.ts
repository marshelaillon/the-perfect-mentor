import RoleModel, { Role } from '../../models/role/Role.model';

export function listRoles() {
  return RoleModel.find({ _id: { $ne: '64792d034deecee9c09d3aa5' } });
}

export function createRole(roleData: Role) {
  return RoleModel.create(roleData);
}

export function updateRole(roleId: string, updatedRoleData: Role) {
  return RoleModel.findByIdAndUpdate(roleId, updatedRoleData, { new: true });
}

export function deleteRole(roleId: string) {
  return RoleModel.findByIdAndDelete(roleId);
}
