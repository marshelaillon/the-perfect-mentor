import { Router } from 'express';
import validateResource from '../../middlewares/validateResource';
import {
  userRegisterSchema,
  verifyUserSchema,
} from '../../schema/user/user.schema';
import {
  createUserController,
  getUserController,
  verifyUserHandler,
} from '../../controllers/user/user.controller';
import { createSessionSchema } from '../../schema/user/auth.schema';
import { createSessionHandler } from '../../controllers/user/auth.controller';

const router = Router();

router
  .post('/', validateResource(userRegisterSchema), createUserController)
  .post('/login', validateResource(createSessionSchema), createSessionHandler)
  .post(
    '/verify/:id/:verificationCode',
    validateResource(verifyUserSchema),
    verifyUserHandler
  )
  .get('/:id', getUserController);

export default router;
