import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as userController from "../controllers/userController";
import { authenticate, authorize } from "../middlewares/auth";
import { upload } from "../middlewares/upload";

const router = Router();

router.post("/register", asyncHandler(userController.register));
router.post("/login", asyncHandler(userController.login));

router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  asyncHandler(userController.uploadAvatar)
);

router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  asyncHandler(userController.uploadAvatar)
);

router.put(
  "/:id",
  authenticate,
  authorize("administrador", "professor"),
  asyncHandler(userController.updateUser)
);

// Admin Deletando
router.delete(
  "/:id",
  authenticate,
  authorize("administrador"),
  asyncHandler(userController.deleteUser)
);

// Listar Todos
router.get(
  "/",
  authenticate,
  authorize("administrador", "professor"),
  asyncHandler(userController.getAllUsers)
);

export default router;
