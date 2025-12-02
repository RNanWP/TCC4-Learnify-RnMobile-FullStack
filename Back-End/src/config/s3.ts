import { S3Client } from "@aws-sdk/client-s3";

const isForcePath = process.env.S3_FORCE_PATH_STYLE === "true";

export const s3 = new S3Client({
  region: process.env.S3_REGION || "sa-east-1",
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: isForcePath,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },
});
export const S3_BUCKET = process.env.S3_BUCKET || "Learnify-uploads";
