import { Request, Response } from 'express';
import { createUser, getUser } from '../../services/user/user.service';
import { UserRegisterData } from '../../schema/user/user.schema';
import sendEmail from '../../utils/mailer';

export async function createUserController(
  req: Request<{}, {}, UserRegisterData>,
  res: Response
) {
  const userData = req.body;
  try {
    const user = await createUser(userData);

    await sendEmail({
      from: 'test@example.com',
      to: user.email,
      subject: 'Please verify your account',
      text: `Verification code ${user.verificationCode}. Id: ${user._id}`,
    });

    return res.send('User successfully created');
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).send('Account already exists');
    }
    return res.status(500).send(error);
  }
}

export async function getUserController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await getUser(id);
    if (user) return res.json(user);
    return res.status(404).send('User not found');
  } catch (error) {
    return res.status(500).send(error);
  }
}
