import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth";
import { asyncHandler } from "../utils/asyncHandler";
import * as postController from "../controllers/postController";
import * as commentController from "../controllers/commentController";
import Post from "../models/Post";
import { upload } from "../middlewares/upload";

const router = Router();

// --- Rotas Públicas ---
router.get("/", asyncHandler(postController.getAllPosts));
router.get("/search", asyncHandler(postController.searchPosts));
router.get("/:id", asyncHandler(postController.getPostById));

// --- Rotas de Comentários Relacionadas a Posts ---
router.get(
  "/:postId/comments",
  asyncHandler(commentController.getCommentsByPost)
);

router.post(
  "/:postId/comments",
  authenticate,
  asyncHandler(commentController.createComment)
);

router.post(
  "/",
  authenticate,
  requireRole("teacher"),
  upload.single("image"),
  async (req, res) => {
    const { title, body } = req.body;
    const imageUrl = (req.file as any)?.location; // gerada pelo S3/MinIO
    const post = await Post.create({
      title,
      body,
      authorId: req.user.sub,
      imageUrl,
    });
    res.status(201).json(post);
  }
);

// --- Rotas Protegidas (Professores e Admins) ---
router.post(
  "/",
  authenticate,
  authorize("professor", "administrador"),
  asyncHandler(postController.createPost)
);

router.put(
  "/:id",
  authenticate,
  authorize("professor", "administrador"),
  asyncHandler(postController.updatePost)
);

router.delete(
  "/:id",
  authenticate,
  authorize("professor", "administrador"),
  asyncHandler(postController.deletePost)
);

router.get(
  "/admin",
  authenticate,
  authorize("administrador"),
  asyncHandler(postController.getAdminPosts)
);

export default router;
