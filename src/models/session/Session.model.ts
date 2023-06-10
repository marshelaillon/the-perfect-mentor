import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import { User } from '../user/User.model';

export class Session {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ default: true })
  isValid: boolean;
}

const SessionModel = getModelForClass(Session, {
  schemaOptions: {
    timestamps: true,
  },
});

export default SessionModel;
