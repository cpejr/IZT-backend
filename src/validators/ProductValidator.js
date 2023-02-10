import { z } from 'zod';
import validate from '../config/validate.js';

export const getProductValidator = validate(
  z.object({
    body: z.object({
      name: z
        .string()
        .min(2, { required_error: 'Name must be at least 2 characters' })
        .max(20, { required_error: 'Name must be a maximum of 20 characters' })
        .optional(),

      category: z
        .string()
        .min(3, { required_error: 'Name must be at least 3 characters' })
        .max(20, { required_error: 'Name must be a maximum of 20 characters' })
        .optional(),

      picture: z.string().optional(),

      description: z
        .string()
        .min(50, {
          required_error: 'Description must be at least 50 characters',
        })
        .max(150, {
          required_error: 'Description must be a maximum of 150 characters',
        })
        .optional(),

      documents: z.file().optional(),

      createdAt: z.date().optional(),

      uptadeAt: z.date().optional(),
    }),
    query: z.object({
      id: z.string({ required_error: 'Product ID is required' }),
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

      category: z
        .string({ required_error: 'Category is required' })
        .min(3, { required_error: 'Category must be at least 3 characters' })
        .max(20, {
          required_error: 'Category must be a maximum of 20 characters',
        }),

      picture: z.file({ required_error: 'Picture is required' }),

      description: z
        .string({ required_error: 'Description is required' })
        .min(50, {
          required_error: 'Description must be at least 50 characters',
        })
        .max(150, {
          required_error: 'Description must be a maximum of 150 characters',
        }),

      documents: z.file({
        required_error: 'At least one document is required',
      }),

      createdAt: z.date({ required_error: 'Created date is required' }),

      uptadeAt: z.date({ required_error: 'Uptade date is required' }), // equal to de created date
    }),
  })
);
export const updateProductValidator = validate(
  z.object({
    body: z.object({
      name: z
        .string({ required_error: 'Name is required' })
        .min(2, { required_error: 'Name must be at least 2 characters' })
        .max(20, { required_error: 'Name must be a maximum of 20 characters' })
        .optional(),

      category: z
        .string({ required_error: 'Category is required' })
        .min(3, { required_error: 'Category must be at least 3 characters' })
        .max(20, {
          required_error: 'Category must be a maximum of 20 characters',
        })
        .optional(),

      picture: z.file({ required_error: 'Picture is required' }).optional(),

      description: z
        .string({ required_error: 'Description is required' })
        .min(50, {
          required_error: 'Description must be at least 50 characters',
        })
        .max(150, {
          required_error: 'Description must be a maximum of 150 characters',
        })
        .optional(),

      documents: z
        .file({
          required_error: 'At least one document is required',
        })
        .optional(),

      uptadeAt: z.date({ required_error: 'Uptade date is required' }),
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
        .min(10, { message: 'Name must be atleast 10 characters' }),

      company: z.string({ required_error: 'Company name is required' }),

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
