import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "user must have name"],
  },
  email: {
    type: String,
    required: [true, "user must have email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "user must have password"],
  },
});

export default model("User", userSchema);
