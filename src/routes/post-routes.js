import { Router } from "express";
import {
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  createPost,
} from "../controllers/post-controller.js";
import protect from "../middleware/auth-middleware.js";

const router = new Router();

router.route("/").get(getAllPosts).post(protect, createPost);

router
  .route("/:id")
  .get(getSinglePost)
  .patch(protect, updatePost)
  .delete(protect, deletePost);

export default router;
