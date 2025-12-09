import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3";

const isTest = process.env.NODE_ENV === "test" || !process.env.S3_BUCKET;

const storage = isTest
  ? multer.memoryStorage()
  : multerS3({
      s3,
      bucket: process.env.S3_BUCKET!,
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, cb) => {
        cb(null, `${Date.now().toString()}-${file.originalname}`);
      },
    });

export const upload = multer({ storage });

// const s3 = new S3Client({
//   region: process.env.S3_REGION,
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY!,
//     secretAccessKey: process.env.S3_SECRET_KEY!,
//   },
// });

// export const upload = multer({
//   storage: multerS3({
//     s3,
//     bucket: process.env.S3_BUCKET!,
//     acl: "public-read",
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: (_req, file, cb) => {
//       cb(null, `uploads/${Date.now()}-${file.originalname}`);
//     },
//   }),
// });
