import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../config/s3";
import { Request } from "express";

const isTest = process.env.NODE_ENV === "test" || !process.env.S3_BUCKET;

const storage = isTest
  ? multer.memoryStorage()
  : multerS3({
      s3,
      bucket: process.env.S3_BUCKET!,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req: Request, file, cb) => {
        // @ts-ignore
        const userId = req.user?.id;

        if (req.originalUrl.includes("avatar") && userId) {
          const fileName = `avatars/${userId}.jpeg`;
          cb(null, fileName);
        } else {
          const fileName = `posts/${Date.now()}-${file.originalname.replace(
            /\s+/g,
            "-"
          )}`;
          cb(null, fileName);
        }
      },
    });

export const upload = multer({ storage });
