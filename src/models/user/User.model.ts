import { prop, getModelForClass } from '@typegoose/typegoose';

class User {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  lastname: string;

  @prop({ required: true })
  residence_country: string;

  @prop({ required: true })
  occupation: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  profile_photo: string;

  @prop({ required: true })
  language: string;

  @prop({ required: true })
  rol_id: number;
}

const UserModel = getModelForClass(User);
export default UserModel;
