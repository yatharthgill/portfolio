import mongoose, { Schema, Document, Model } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  phonenumber: string;
}

const UserSchema: Schema<User> = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true ,"You have already requested. I'll connect with you soon"],
      lowercase: true,
    },
    phonenumber: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<User> =
  mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default UserModel;
