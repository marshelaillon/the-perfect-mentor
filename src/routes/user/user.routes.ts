import { Router } from 'express';
import validateResource from '../../middlewares/validateResource';
import { userRegisterSchema } from '../../schema/user/user.schema';
import { createUserController } from '../../controllers/user/user.controller';

const router = Router();

router.post('/', validateResource(userRegisterSchema), createUserController);

export default router;
