import express from 'express';
import { refreshAccessTokenHandler } from '../../controllers/user/auth.controller';

const router = express.Router();

router.post('/refresh', refreshAccessTokenHandler);

export default router;
