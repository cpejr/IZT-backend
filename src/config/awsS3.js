import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';
import randomFileName from '../utils/files/ramdomFileName.js';
import isDevEnvironment from '../utils/isDevEnvironment.js';
import { S3RVER_ENDPOINT } from './s3rver.js';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  ...(isDevEnvironment && { endpoint: S3RVER_ENDPOINT }),
});

export async function uploadOneFile(file) {
  const key = randomFileName(file.name);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: file.buffer,
    Key: key,
    ContentType: file.mimeType,
  };

  await s3.send(new PutObjectCommand(params));

  return { key, ...file };
}

export async function uploadFiles(files) {
  return Promise.all(files.map(async (file) => uploadOneFile(file)));
}

export async function getFile(key) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  return s3.send(new GetObjectCommand(params));
}

export async function deleteOneFile(key) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  return s3.send(new DeleteObjectCommand(params));
}

export async function deleteFiles(keys) {
  const objects = keys.map((key) => ({
    Key: key,
  }));
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Delete: { Objects: objects },
  };

  return s3.send(new DeleteObjectsCommand(params));
}
