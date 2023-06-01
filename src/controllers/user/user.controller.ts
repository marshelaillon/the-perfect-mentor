import { Request, Response } from 'express';
import { createUser } from '../../services/user/user.service';
import { CreateUserInput } from '../../schema/user/user.schema';

export async function createUserController(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;
  try {
    const user = await createUser(body);
    console.log(`here the user: ${user}`);
    return res.send('User successfully created');
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).send('Account already exists');
    }
    return res.status(500).send(error);
  }
}
