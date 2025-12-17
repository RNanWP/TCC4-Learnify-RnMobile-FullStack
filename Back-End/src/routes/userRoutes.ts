import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as userController from "../controllers/userController";
import { authenticate } from "../middlewares/auth";
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

export default router;
