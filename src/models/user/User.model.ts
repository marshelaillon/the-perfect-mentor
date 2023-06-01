import {
  prop,
  getModelForClass,
  modelOptions,
  pre,
  DocumentType,
} from '@typegoose/typegoose';
import { nanoid } from 'nanoid';
import argon2 from 'argon2';

@pre<User>('save', async function () {
  if (!this.isModified('password')) return;
  const hashedPassword = await argon2.hash(this.password);
  this.password = hashedPassword;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @prop({ unique: true, required: true, lowercase: true, trim: true })
  email: string;

  @prop({ unique: true, required: true, lowercase: true, trim: true })
  username: string;

  @prop({ required: true })
  password: string;

  @prop({
    required: true,
    default: () => nanoid(),
  })
  verificationCode: string;

  @prop({ required: true, default: false })
  verified: boolean;

  @prop()
  name: string;

  @prop()
  lastname: string;

  @prop()
  residence_country: string;

  @prop()
  occupation: string;

  @prop()
  description: string;

  @prop()
  profile_photo: string;

  @prop()
  language: string;

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon2.verify(this.password, candidatePassword);
    } catch (error) {
      console.log((error as Error).message, 'Could not validate password');
      return false;
    }
  }
}

const UserModel = getModelForClass(User);
export default UserModel;
