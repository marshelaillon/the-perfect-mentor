import { Request, Response } from 'express';
import {
  createUser,
  findUserById,
  getUser,
} from '../../services/user/user.service';
import {
  UserRegisterInput,
  VerifyUserInput,
} from '../../schema/user/user.schema';
import sendEmail from '../../utils/mailer';

export async function createUserController(
  req: Request<{}, {}, UserRegisterInput>,
  res: Response
) {
  const userData = req.body;
  try {
    const user = await createUser(userData);

    await sendEmail({
      from: 'test@example.com',
      to: user.email,
      subject: 'Please verify your account',
      text: `VERIFICATION CODE: ${user.verificationCode}
      ID: ${user._id}`,
    });

    return res.send('User successfully created');
  } catch (error: any) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).send('Account already exists');
    }
    return res.status(500).send(error);
  }
}

export async function verifyUserHandler(
  req: Request<VerifyUserInput>,
  res: Response
) {
  const id = req.params.id;
  const verificationCode = req.params.verificationCode;

  // find the user by id
  const user = await findUserById(id);
  if (!user) return res.send('Could not verify user');

  // check to see if they are already verified
  if (user.verified) return res.send('User is already verified');

  // check to see if the verificationCode matches
  if (user.verificationCode === verificationCode) {
    user.verified = true;
    await user.save();
    return res.send('User successfully verified');
  }

  return res.send('Could not verify user');
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
