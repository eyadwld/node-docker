import Post from "../models/Post.js";

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().lean();

    res.status(200).json({
      message: "posts feched successfully",
      result: posts,
    });
  } catch (error) {
    next(error);
  }
};
export const createPost = async (req, res, next) => {
  try {
    const { title, body } = req.body;
    const post = await Post.create({
      title,
      body,
    });

    res.status(200).json({
      message: "posts created successfully",
      result: post,
    });
  } catch (error) {
    next(error);
  }
};
export const getSinglePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).lean();

    res.status(200).json({
      message: "post feched successfully",
      result: post,
    });
  } catch (error) {
    next(error);
  }
};
export const updatePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, body } = req.body;
    const updatedFields = {};

    if (title) {
      updatedFields.title = title;
    }
    if (body) {
      updatedFields.body = body;
    }

    const post = await Post.findByIdAndUpdate(id, updatedFields, {
      returnDocument: "after",
      runValidators: true,
    });

    res.status(200).json({
      message: "post updated successfully",
      result: post,
    });
  } catch (error) {
    next(error);
  }
};
export const deletePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await Post.findByIdAndDelete(id);

    res.status(200).json({
      message: "post deleted successfully",
      result: post,
    });
  } catch (error) {
    next(error);
  }
};
