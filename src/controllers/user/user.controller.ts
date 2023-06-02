import { Request, Response } from 'express';
import { createUser } from '../../services/user/user.service';
import { UserRegisterData } from '../../schema/user/user.schema';

export async function createUserController(
  req: Request<{}, {}, UserRegisterData>,
  res: Response
) {
  const userData = req.body;
  try {
    await createUser(userData);
    return res.send('User successfully created');
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).send('Account already exists');
    }
    return res.status(500).send(error);
  }
}
