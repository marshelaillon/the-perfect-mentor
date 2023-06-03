import { Router } from 'express';
import validateResource from '../../middlewares/validateResource';
import { userRegisterSchema } from '../../schema/user/user.schema';
import {
  createUserController,
  getUserController,
} from '../../controllers/user/user.controller';

const router = Router();

router
  .post('/', validateResource(userRegisterSchema), createUserController)
  .get('/:id', getUserController);

export default router;
