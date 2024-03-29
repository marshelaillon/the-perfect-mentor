import { Request, Response } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
} from '../../services/user/user.service';
import {
  UserRegisterInput,
  UserUpdateData,
  VerifyUserInput,
} from '../../schema/user/user.schema';
import sendEmail from '../../utils/mailer';
import {
  signAccessToken,
  signRefreshToken,
} from '../../services/user/auth.service';
import { omit } from 'lodash';
import { privateFields } from '../../models/user/User.model';

export async function createUserController(
  req: Request<ParamsDictionary, Query, UserRegisterInput>,
  res: Response
) {
  const userData = req.body;
  try {
    const user = await createUser(userData);

    if (user) {
      const verificationUrl = `https://the-perfect-mentor-api.onrender.com/api/v1/user/verify/${user._id}/${user.verificationCode}`;

      const url = await sendEmail({
        from: 'test@example.com',
        to: user.email,
        subject: 'Please verify your account',
        html: `
        <h1>Please, verify your account</h1>
        <p>Click the following link to verify your account:</p>
        <a href="${verificationUrl}">Verify my account</a>
        `,
      });

      return res.json({ ok: true, msg: 'User successfully created', url });
    }
    return res.status(400).json({ ok: false, msg: 'Something went wrong' });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ ok: false, msg: 'Account already exists' });
    }
    return res.status(500).send({ ok: false, msg: error.message });
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

export async function getCurrentUserHandler(_: Request, res: Response) {
  return res.send(res.locals.user);
}

export async function updateUserController(
  req: Request<ParamsDictionary, Query, UserUpdateData>,
  res: Response
) {
  const userData = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await updateUser(id, userData);

    if (updatedUser) {
      const user = await findUserByEmail(updatedUser.email);
      if (user) {
        const accessToken = signAccessToken(user);
        const refreshToken = await signRefreshToken({
          userId: String(user._id),
        });

        return res.json({
          ok: true,
          msg: 'User successfully updated',
          user: omit(user.toJSON(), privateFields),
          accessToken,
          refreshToken,
        });
      }
    }

    return res.status(400).json({ ok: false, msg: 'Something went wrong' });
  } catch (error: any) {
    return res.status(500).send({ ok: false, msg: error.message });
  }
}
