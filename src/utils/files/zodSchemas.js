import { z } from 'zod';
import { documentSpecs, pictureSpecs, videoSpecs } from './filesSpecs.js';
import numToMegaBytes from './numToMegaBytes.js';

// Schema to validate the object that comes from multer lib
const zodFileSchema = ({ fileName, allowedMimeTypes, sizeLimitInMB }) =>
  z
    .object({
      originalname: z.string({
        required_error: `${fileName} original name is required`,
      }),
      key: z.string({
        required_error: `${fileName} key is required`,
      }),
      location: z.string({
        required_error: `${fileName} location is required`,
      }),
      // bucket: z.string({
      //   required_error: `${fileName} bucket name is required`,
      // }), // Maybe will be necessary
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
    .transform(
      ({ originalname: name, mimetype: mimeType, location: url, ...rest }) => ({
        name,
        mimeType,
        url,
        ...rest,
      })
    );

export const documentSchema = zodFileSchema(documentSpecs);
export const pictureSchema = zodFileSchema(pictureSpecs);
export const videoSchema = zodFileSchema(videoSpecs);
