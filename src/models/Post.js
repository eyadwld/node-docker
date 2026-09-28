import { Schema, model } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "post must have title"],
  },
  body: {
    type: String,
    required: [true, "post must have body"],
  },
});

export default model("Post", postSchema);

