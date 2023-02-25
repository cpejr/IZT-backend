import { z } from 'zod';
import validate from './validate.js';

export const get = validate(
  z.object({
    query: z.object({
      _id: z.string().optional(),
      name: z.string().optional(),
      description: z.string().optional(),
    }),
  })
);

export const create = validate(
  z.object({
    body: z.object({
      name: z
        .string()
        .max(40, { message: 'Name must be a maximum of 40 characters' })
        .min(3, { message: 'Name must be atleast 10 characters' }),
      description: z.string().optional(),
    }),
  })
);

export const update = validate(
  z.object({
    body: z.object({
      name: z
        .string()
        .max(40, { message: 'Name must be a maximum of 40 characters' })
        .min(3, { message: 'Name must be atleast 3 characters' })
        .optional(),
      description: z.string().optional(),
    }),
    params: z.object({
      _id: z.string({ required_error: 'Category ID is required' }),
    }),
  })
);

export const destroy = validate(
  z.object({
    params: z.object({
      _id: z.string({ required_error: 'Category ID is required' }),
    }),
  })
);
