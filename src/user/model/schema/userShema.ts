import { Schema } from "mongoose";
import { type UserStructure } from "../../types";

const userSchema = new Schema<UserStructure>({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default userSchema;
