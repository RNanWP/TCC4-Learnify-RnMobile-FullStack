import { S3Client } from "@aws-sdk/client-s3";

const isForcePath = process.env.S3_FORCE_PATH_STYLE === "true";
const isTest = process.env.NODE_ENV === "test" || !process.env.S3_BUCKET;

export const s3 = new S3Client({
  region: process.env.S3_REGION || "sa-east-1",
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: isForcePath,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },
});
export const S3_BUCKET = process.env.S3_BUCKET;
if (!S3_BUCKET) throw new Error("S3_BUCKET não configurado");
