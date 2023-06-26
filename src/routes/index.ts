import { Router } from 'express';
import userRouter from './user/user.routes';
import roleRouter from './role/role.routes';
import authRouter from './auth/auth.routes';

const router = Router();

router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/sessions', authRouter);

export default router;
