import { Router } from 'express';
import userRouter from './user/user.routes';
import roleRouter from './role/role.routes';

const router = Router();

router.use('/user', userRouter);
router.use('/role', roleRouter);

export default router;
