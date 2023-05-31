import { prop, getModelForClass } from '@typegoose/typegoose';

class Rol {
  @prop({ lowercase: true, trim: true }) // mongoose
  name: string; // typescript
}

const RolModel = getModelForClass(Rol);
export default RolModel;
