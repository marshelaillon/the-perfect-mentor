import { Router } from 'express';
import validateResource from '../../middlewares/validateResource';
import { createUserSchema } from '../../schema/user/user.schema';
import { createUserController } from '../../controllers/user/user.controller';

const router = Router();

router.post('/', validateResource(createUserSchema), createUserController);

export default router;
