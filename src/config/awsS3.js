import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import randomFileName from '../utils/files/ramdomFileName.js';
import isDevEnvironment from '../utils/isDevEnvironment.js';

const s3 = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  ...(isDevEnvironment && { endpoint: 'http://localhost:4569' }),
});

export async function uploadOneFile(file) {
  const key = randomFileName(file.name);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: file.buffer,
    Key: key,
    ContentType: file.mimeType,
  };

  const operationInfo = await s3.send(new PutObjectCommand(params));

  return { operationInfo, key };
}

export async function uploadFiles(files) {
  return Promise.all(files.map(async (file) => uploadOneFile(file)));
}

export async function getFile(fileKey) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
  };

  return s3.send(new GetObjectCommand(params));
}

export async function deleteFile(fileKey) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
  };

  return s3.send(new DeleteObjectCommand(params));
}
