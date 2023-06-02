import RoleModel, { Role } from '../../models/role/Role.model';

export function listRoles() {
  return RoleModel.find();
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
