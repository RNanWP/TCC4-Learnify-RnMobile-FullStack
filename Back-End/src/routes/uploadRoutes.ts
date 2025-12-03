import express from "express";
import { upload } from "../middlewares/upload";

const router = express.Router();

/** POST /api/upload
 * form-data: file (single)
 * Retorna: { url }
 */
router.post("/", upload.single("file"), async (req, res) => {
  const location = (req.file as any)?.location;
  return res.json({ url: location });
});

export default router;
