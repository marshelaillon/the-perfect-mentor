import { DocumentType } from '@typegoose/typegoose';
import { omit } from 'lodash';
import { User, privateFields } from '../../models/user/User.model';
import { signJwt } from '../../utils/jwt';
import SessionModel from '../../models/session/Session.model';

export async function createSession({ userId }: { userId: string }) {
  return SessionModel.create({ user: userId });
}

export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({ userId });
  const refreshToken = signJwt(
    { session: session._id },
    'refreshTokenPrivateKey',
    { expiresIn: '1d' }
  );
  return refreshToken;
}

export function signAccessToken(user: DocumentType<User>) {
  const payload = omit(user.toJSON(), privateFields);
  //console.log('payload', payload);
  const accessToken = signJwt(payload, 'accessTokenPrivateKey', {
    expiresIn: '30min',
  });
  return accessToken;
}
