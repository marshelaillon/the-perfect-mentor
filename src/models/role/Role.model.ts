import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Role {
  @prop({ unique: true, lowercase: true, trim: true }) // mongoose
  name: string; // typescript
}

const RoleModel = getModelForClass(Role);
export default RoleModel;
