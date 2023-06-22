import { Router } from 'express';
import validateResource from '../../middlewares/validateResource';
import {
  userRegisterSchema,
  verifyUserSchema,
  updateUserDataSchema,
} from '../../schema/user/user.schema';
import {
  createUserController,
  getCurrentUserHandler,
  verifyUserHandler,
  updateUserController,
} from '../../controllers/user/user.controller';
import { createSessionSchema } from '../../schema/user/auth.schema';
import { createSessionHandler } from '../../controllers/user/auth.controller';
import requireUser from '../../middlewares/requireUser';

const router = Router();

router
  .post('/', validateResource(userRegisterSchema), createUserController)
  .post('/login', validateResource(createSessionSchema), createSessionHandler)
  .patch('/:id', validateResource(updateUserDataSchema), updateUserController)
  .get(
    '/verify/:id/:verificationCode',
    validateResource(verifyUserSchema),
    verifyUserHandler
  )
  .get('/me', requireUser, getCurrentUserHandler);

export default router;
