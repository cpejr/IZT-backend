import { z } from 'zod';
import validate from './validate.js';
import {
  documentLimitInMB,
  pictureLimitInMB,
} from '../utils/files/limitsInMB.js';
import {
  documentMimeTypes,
  pictureMimeTypes,
} from '../utils/files/mimeTypes.js';
import zodFileSchema from '../utils/files/zodFileSchema.js';

export const getProductValidator = validate(
  z.object({
    query: z.object({
      _id: z.string().optional(),
      name: z.string().optional(),
      category: z.string().optional(), // Query with the _id of the category
      picture: z.string().optional(), // Query with the _id of one picture
      description: z.string().optional(),
      documents: z.string().optional(), // Query with the _id of one document
    }),
  })
);

export const createProductValidator = validate(
  z.object({
    body: z.object({
      name: z
        .string({ required_error: 'Name is required' })
        .min(2, { required_error: 'Name must be at least 2 characters' })
        .max(20, { required_error: 'Name must be a maximum of 20 characters' }),

      category: z.string({ required_error: 'Category ID is required' }), // Here we need to pass the category id only

      description: z
        .string({ required_error: 'Description is required' })
        .min(50, {
          required_error: 'Description must be at least 50 characters',
        })
        .max(150, {
          required_error: 'Description must be a maximum of 150 characters',
        }),
    }),
    // Here is necessary to treat the object that comes from multer lib
    files: z.object({
      pictures: z
        .array(
          zodFileSchema({
            fileName: 'Picture',
            allowedMimeTypes: pictureMimeTypes,
            sizeLimitInMB: pictureLimitInMB,
          }),
          {
            required_error: 'Pictures are required',
          }
        )
        .nonempty('Necessary at least one picture'),
      documents: z
        .array(
          zodFileSchema({
            fileName: 'Document',
            allowedMimeTypes: documentMimeTypes,
            sizeLimitInMB: documentLimitInMB,
          }),
          {
            required_error: 'Documents are required',
          }
        )
        .nonempty('Necessary at least one document'),
    }),
  })
);

export const updateProductValidator = validate(
  z.object({
    body: z.object({
      name: z
        .optional()
        .min(2, { required_error: 'Name must be at least 2 characters' })
        .max(20, { required_error: 'Name must be a maximum of 20 characters' }),
      category: z.string().optional(),
      description: z
        .string()
        .min(50, {
          required_error: 'Description must be at least 50 characters',
        })
        .max(150, {
          required_error: 'Description must be a maximum of 150 characters',
        })
        .optional(),
    }),
    // Here is necessary to treat the object that comes from multer lib
    files: z.object({
      pictures: z
        .array(
          zodFileSchema({
            fileName: 'Picture',
            allowedMimeTypes: pictureMimeTypes,
            sizeLimitInMB: pictureLimitInMB,
          })
        )
        .optional(),
      documents: z
        .array(
          zodFileSchema({
            fileName: 'Document',
            allowedMimeTypes: documentMimeTypes,
            sizeLimitInMB: documentLimitInMB,
          })
        )
        .optional(),
    }),
    params: z.object({
      id: z.string({ required_error: 'Product ID is required' }),
    }),
  })
);

export const deleteProductValidator = validate(
  z.object({
    params: z.object({
      id: z.string({ required_error: 'Product ID is required' }),
    }),
  })
);

export const formsBudgetValidator = validate(
  z.object({
    body: z.object({
      name: z
        .string({ required_error: 'Name is required' })
        .max(40, { message: 'Name must be a maximum of 40 characters' })
        .min(3, { message: 'Name must be atleast 3 characters' }),

      company: z
        .string({ required_error: 'Company name is required' })
        .max(40, { message: 'Name must be a maximum of 40 characters' })
        .min(3, { message: 'Name must be atleast 3 characters' }),

      email: z
        .string({ required_error: 'Email is required' })
        .email('Must be a valid email'),

      telephone: z
        .string({ required_error: 'Telephone is required' })
        .max(15, { message: 'Telephone must be a maximum of 15 characters' })
        .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Telephone bad formatted'),

      country: z
        .string({ required_error: 'Country is required' })
        .max(30, { message: 'Country must be a maximum of 30 characters' })
        .min(4, { message: 'Country must be atleast 4 characters' }),

      state: z
        .string({ required_error: 'State is required' })
        .max(30, { message: 'State must be a maximum of 30 characters' })
        .min(4, { message: 'State must be atleast 4 characters' }),

      city: z
        .string({ required_error: 'City is required' })
        .max(30, { message: 'City must be a maximum of 30 characters' })
        .min(4, { message: 'City must be atleast 4 characters' }),

      ZIPcode: z
        .string({ required_error: 'ZIPcode is required' })
        .max(8, { message: 'ZIPcode must be a maximum of 8 characters' })
        .min(5, { message: 'ZIPcode must be atleast 5 characters' })
        .regex(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Zip code bad formatted'),

      address: z
        .string({ required_error: 'Adress is required' })
        .max(50, { message: 'Adress must be a maximum of 50 characters' })
        .min(5, { message: 'Adress must be atleast 5 characters' }),
    }),

    params: z.object({
      id: z.string({ required_error: 'Product ID is required' }),
    }),
  })
);
