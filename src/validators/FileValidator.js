import { z } from 'zod';
import validate from './validate.js';

// eslint-disable-next-line import/prefer-default-export
export const download = validate(
  z.object({
    params: z.object({
      _id: z.string({ required_error: 'Product ID is required' }),
    }),
  })
);
