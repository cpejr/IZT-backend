import { z } from 'zod';
import numToMegaBytes from './numToMegaBytes';

// Schema to validate the object that comes from multer lib
const zodFileSchema = ({ fileName, allowedMimeTypes, sizeLimitInMB }) =>
  z
    .object({
      originalname: z.string({
        required_error: `${fileName} original name is required`,
      }),
      size: z
        .number({ required_error: `${fileName} size is required` })
        .lte(
          numToMegaBytes(sizeLimitInMB),
          `${fileName} cannot be bigger than ${sizeLimitInMB} MB`
        ),
      key: z.string({ required_error: `${fileName} key is required` }),
      mimetype: z.enum(allowedMimeTypes, {
        errorMap: () => ({
          message: `Invalid ${fileName} mime type. Only allowed: ${allowedMimeTypes.toString()}`,
        }),
      }),
      location: z.string().default(''),
    })
    .transform(
      ({ originalname: name, mimetype: mimeType, location: url, ...rest }) => ({
        name,
        mimeType,
        url,
        ...rest,
      })
    );

export default zodFileSchema;
