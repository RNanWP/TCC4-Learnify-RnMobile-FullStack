import { Router, Request, Response } from "express";
import { authenticate, authorize } from "../middlewares/auth";
import { asyncHandler } from "../utils/asyncHandler";
import * as postController from "../controllers/postController";
import * as commentController from "../controllers/commentController";
import * as postService from "../services/postServices";
import { Post } from "../models/Post";
import { upload } from "../middlewares/upload";

const router = Router();

type AuthRequest = Request & {
  user: { sub: string; role?: string };
};

// --- Rotas Públicas ---
router.get("/", asyncHandler(postController.getAllPosts));
router.get("/search", asyncHandler(postController.searchPosts));
router.get("/:id", asyncHandler(postController.getPostById));

// --- Comentários ---
router.get(
  "/:postId/comments",
  asyncHandler(commentController.getCommentsByPost)
);

router.post(
  "/:postId/comments",
  authenticate,
  asyncHandler(commentController.createComment)
);

// --- Criação de Post com Upload (Professores) ---
router.post(
  "/",
  authenticate,
  authorize("professor", "administrador"),
  upload.single("image"),
  asyncHandler(async (req: Request, res: Response) => {
    const { title, content, body } = req.body;
    const finalContent = content || body;

    const file = req.file as Express.Multer.File & { location?: string };
    let imageUrl = undefined;
    if (file) {
      imageUrl = file.location || `local/${file.filename}`;
    }

    if (!req.user || !req.user.id) {
      throw new Error("Usuário não identificado no token.");
    }

    try {
      const post = await postService.createPostService({
        title,
        content: finalContent,
        author: req.user.id,
        imageUrl,
      });

      res.status(201).json(post);
    } catch (error) {
      console.error("Erro ao criar post:", error);

      res.status(500).json({ message: "Erro ao criar post" });
    }
  })
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

// --- Rotas Protegidas (Professores e Admins) ---
// router.post(
//   "/",
//   authenticate,
//   authorize("professor", "administrador"),
//   asyncHandler(postController.createPost)
// );
