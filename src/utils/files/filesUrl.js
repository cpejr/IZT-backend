import { S3RVER_ENDPOINT } from '../../config/s3rver.js';
import isDevEnvironment from '../isDevEnvironment.js';

const filesUrl = isDevEnvironment
  ? `${S3RVER_ENDPOINT}/${process.env.AWS_BUCKET_NAME}`
  : `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`;

export default filesUrl;
