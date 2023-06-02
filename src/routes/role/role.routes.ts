import { Router } from 'express';
import validateResource from '../../middlewares/validateResource';
import { roleCreateSchema } from '../../schema/role/role.schema';
import {
  createRoleController,
  listRolesController,
  updateRoleController,
  deleteRoleController,
} from '../../controllers/role/role.controller';

const router = Router();

router
  .get('/', listRolesController)
  .post('/', validateResource(roleCreateSchema), createRoleController)
  .put('/:id', validateResource(roleCreateSchema), updateRoleController)
  .delete('/:id', deleteRoleController);

export default router;
