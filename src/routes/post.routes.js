import { Router } from "express";

import { PostController } from "../controllers/post.controller.js";
import { upload } from "../middleware/upload.js";

const postController = new PostController();
export const postRouters = Router();

postRouters.get("/api/post", postController.getAllPosts);
postRouters.post("/api/post", upload.array("files"), postController.createPost);
postRouters.get("/api/post/:id", postController.getPostById);
postRouters.get("/api/post/user/:userId", postController.getPostsByUser);
postRouters.patch("/api/post/:id", postController.updatePost);
postRouters.delete("/api/post/:id", postController.deletePost);
