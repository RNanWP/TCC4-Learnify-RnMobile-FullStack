import multer from "multer";
import multerS3 from "multer-s3";
import { s3, S3_BUCKET } from "../config/s3";
import { randomUUID } from "crypto";
import path from "path";

const storage = multerS3({
  s3,
  bucket: S3_BUCKET,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  cacheControl: "public, max-age=31536000, immutable",
  metadata: (_req, file, cb) => cb(null, { fieldName: file.fieldname }),
  key: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    cb(
      null,
      `uploads/${new Date().toISOString().slice(0, 10)}/${randomUUID()}${ext}`
    );
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
