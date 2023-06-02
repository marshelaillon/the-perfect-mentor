import { Request, Response } from 'express';
import {
  listRoles,
  createRole,
  updateRole,
  deleteRole,
} from '../../services/role/role.service';
import { RoleCreationData } from '../../schema/role/role.schema';

export async function listRolesController(_: Request, res: Response) {
  try {
    const roles = await listRoles();
    return res.status(200).json(roles);
  } catch (error: any) {
    console.log(error, "Couldn't list roles");
    return res.status(500).send(error);
  }
}

export async function createRoleController(
  req: Request<{}, {}, RoleCreationData>,
  res: Response
) {
  try {
    const roleData = req.body;
    await createRole(roleData);
    return res.send('Role created successfully');
  } catch (error: any) {
    console.log(error, "Couldn't create the role");
    return res.status(500).send(error);
  }
}

export async function updateRoleController(
  req: Request<{ id: string }, {}, RoleCreationData>,
  res: Response
) {
  try {
    const { id } = req.params;
    const roleData = req.body;
    const updatedRole = await updateRole(id, roleData);
    if (!updatedRole) return res.send("Couldn't update the role");
    return res.send('Role updated successfully');
  } catch (error: any) {
    console.log(error, "Couldn't update the role");
    return res.status(500).send(error);
  }
}

export async function deleteRoleController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteRole(id);
    return res.send('Role deleted successfully');
  } catch (error: any) {
    console.log(error, "Couldn't delete the role");
    return res.status(500).send(error);
  }
}
