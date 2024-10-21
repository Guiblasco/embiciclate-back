import mongoose from "mongoose";
import userSchema from "./schema/userShema";

const User = mongoose.model("User", userSchema, "users");

export default User;
