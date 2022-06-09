import mongoose from "mongoose";

interface IUser {
  username: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  username: String,
});

export default mongoose.model("User", UserSchema);
