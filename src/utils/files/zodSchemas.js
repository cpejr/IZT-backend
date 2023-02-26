import { z } from 'zod';
import numToMegaBytes from './numToMegaBytes.js';

// Schema to validate the object that comes from multer lib
const zodFileSchema = ({ fileName, allowedMimeTypes, sizeLimitInMB }) =>
  z
    .object({
      originalname: z.string({
        required_error: `${fileName} original name is required`,
      }),
      buffer: z.instanceof(Buffer, {
        message: 'Buffer property need to be of type Buffer',
      }),
      size: z
        .number({ required_error: `${fileName} size is required` })
        .lte(
          numToMegaBytes(sizeLimitInMB),
          `${fileName} cannot be bigger than ${sizeLimitInMB} MB`
        ),
      mimetype: z.enum(allowedMimeTypes, {
        errorMap: () => ({
          message: `Invalid ${fileName} mime type. Only allowed: ${allowedMimeTypes.join(
            ', '
          )}`,
        }),
      }),
    })
    .transform(({ originalname: name, mimetype: mimeType, ...rest }) => ({
      name,
      mimeType,
      ...rest,
    }));

export const documentSchema = zodFileSchema({
  fileName: 'Document',
  allowedMimeTypes: ['text/plain', 'application/pdf'],
  sizeLimitInMB: 15,
});
export const pictureSchema = zodFileSchema({
  fileName: 'Picture',
  allowedMimeTypes: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
  sizeLimitInMB: 5,
});
export const videoSchema = zodFileSchema({
  fileName: 'Video',
  allowedMimeTypes: [
    'video/x-flv',
    'video/mp4',
    'video/MP2T',
    'video/3gpp',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv',
  ],
  sizeLimitInMB: 500,
});
