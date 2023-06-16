import { Request, Response } from 'express';
import { CreateSessionInputSchema } from '../../schema/user/auth.schema';
import { findUserByEmail } from '../../services/user/user.service';
import {
  signAccessToken,
  signRefreshToken,
} from '../../services/user/auth.service';

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInputSchema>,
  res: Response
) {
  const message = 'Invalid email or password';
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) return res.status(404).json({ ok: false, msg: message });
  //if (!user.verified) return res.send('Please verify your email');

  const isValid = await user.validatePassword(password);
  if (!isValid) return res.status(401).json({ ok: false, msg: message });

  // sign a access token
  const accessToken = signAccessToken(user);

  // sign a refresh token
  const refreshToken = await signRefreshToken({ userId: String(user._id) });

  // send the tokens
  return res.json({
    ok: true,
    accessToken,
    refreshToken,
  });
}

// export async function refreshAccessTokenHandler(req: Request, res: Response) {
//   const refreshToken = get(req, 'headers.x-refresh');

//   const decoded = verifyJwt<{ session: string }>(
//     refreshToken,
//     'refreshTokenPublicKey'
//   );

//   if (!decoded) {
//     return res.status(401).send('Could not refresh access token');
//   }

//   const session = await findSessionById(decoded.session);

//   if (!session || !session.valid) {
//     return res.status(401).send('Could not refresh access token');
//   }

//   const user = await findUserById(String(session.user));

//   if (!user) {
//     return res.status(401).send('Could not refresh access token');
//   }

//   const accessToken = signAccessToken(user);

//   return res.send({ accessToken });
// }
