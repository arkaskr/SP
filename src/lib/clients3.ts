import { S3Client } from "@aws-sdk/client-s3";
export const accessKeyId = process.env.AWS_KEY_ID;
export const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
export const s3BucketName = process.env.AWS_S3_BUCKET_NAME;
let client: S3Client | null = null;
if (accessKeyId && secretAccessKey && s3BucketName) {
    client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });
}
export { client };