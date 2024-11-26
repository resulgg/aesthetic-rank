import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.R2_REGION!,
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export default s3Client;
