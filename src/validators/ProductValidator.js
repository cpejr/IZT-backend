import { z } from 'zod';
import validate from './validate.js';
import { documentSchema, pictureSchema } from '../utils/files/zodSchemas.js';

export const get = validate(
  z.object({
    query: z.object({
      _id: z.string().optional(),
      name: z.string().optional(),
      category: z.string().optional(), // Query with the _id of the category
      pictures: z.string().optional(), // Query with the _id of one picture
      purchases: z.number().optional(),
      description: z.string().optional(),
      documents: z.string().optional(), // Query with the _id of one document
    }),
  })
);

export const create = validate(
  z.object({
    body: z.object({
      name: z
        .string({ required_error: 'Product name is required' })
        .min(3, 'Product name must be at least 3 characters')
        .max(20, 'Product name must be a maximum of 20 characters'),
      category: z.string({ required_error: 'Product category ID is required' }), // Here we need to pass the category id only
      description: z
        .string({ required_error: 'Product description is required' })
        .min(5, 'Product description must be at least 5 characters')
        .max(150, 'Product description must be a maximum of 150 characters'),
    }),
    // Here is necessary to treat the object that comes from multer lib
    files: z.object({
      pictures: z
        .array(pictureSchema, {
          required_error: 'Product pictures are required',
        })
        .nonempty('Product pictures array cannot be empty'),
      documents: z.array(documentSchema).default([]),
    }),
  })
);

export const update = validate(
  z.object({
    body: z.object({
      name: z
        .string()
        .min(3, 'Product name must be at least 3 characters')
        .max(20, 'Product name must be a maximum of 20 characters')
        .optional(),
      purchases: z
        .number()
        .positive('Product purchases cannot be less than 0')
        .optional(),
      category: z.string().optional(),
      description: z
        .string()
        .min(5, 'Product description must be at least 5 characters')
        .max(150, 'Product description must be a maximum of 150 characters')
        .optional(),
      documents: z // In case the user wants to delete the entire array of documents
        .string()
        .refine(
          (value) => value === '',
          'Invalid "documents" input in the request body'
        )
        .transform(() => []) // Transform the property in a empty array
        .optional(),
    }),
    // Here is necessary to treat the object that comes from multer lib
    files: z
      .object({
        pictures: z
          .array(pictureSchema)
          .nonempty('Product pictures array cannot be empty')
          .optional(),
        documents: z.array(documentSchema).optional(),
      })
      .optional(),
    params: z.object({
      _id: z.string({ required_error: 'Product ID is required' }),
    }),
  })
);

export const destroy = validate(
  z.object({
    params: z.object({
      _id: z.string({ required_error: 'Product ID is required' }),
    }),
  })
);

export const formsBudget = validate(
  z.object({
    body: z.object({
      name: z
        .string({ required_error: 'Name is required' })
        .min(3, 'Name must be atleast 3 characters')
        .max(40, 'Name must be a maximum of 40 characters'),
      company: z
        .string({ required_error: 'Company name is required' })
        .min(3, 'Company name must be atleast 3 characters')
        .max(40, 'Company name must be a maximum of 40 characters'),
      email: z
        .string({ required_error: 'Email is required' })
        .email('Must be a valid email'),
      telephone: z
        .string({ required_error: 'Telephone is required' })
        .max(15, 'Telephone must be a maximum of 15 characters')
        .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Telephone bad formatted'),
      country: z
        .string({ required_error: 'Country is required' })
        .min(3, 'Country must be atleast 3 characters')
        .max(30, 'Country must be a maximum of 30 characters'),
      state: z
        .string({ required_error: 'State is required' })
        .min(3, 'State must be atleast 3 characters')
        .max(30, 'State must be a maximum of 30 characters'),
      city: z
        .string({ required_error: 'City is required' })
        .min(3, 'City must be atleast 3 characters')
        .max(30, 'City must be a maximum of 30 characters'),
      ZIPcode: z
        .string({ required_error: 'ZIPcode is required' })
        .min(5, 'ZIPcode must be atleast 5 characters')
        .max(8, 'ZIPcode must be a maximum of 8 characters')
        .regex(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Zip code bad formatted'),
      address: z
        .string({ required_error: 'Adress is required' })
        .min(5, 'Adress must be atleast 5 characters')
        .max(50, 'Adress must be a maximum of 50 characters'),
    }),
    params: z.object({
      _id: z.string({ required_error: 'Product ID is required' }),
    }),
  })
);
