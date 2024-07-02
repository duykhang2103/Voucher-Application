import mongoose from "mongoose";

export interface IUser {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", UserSchema);

export default User;
