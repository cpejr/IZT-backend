import { z } from 'zod';
import validate from '../config/validate.js';

export const getProductValidator = validate(z.object());
export const createProductValidator = validate(z.object());
export const updateProductValidator = validate(z.object());
export const deleteProductValidator = validate(z.object());
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
        .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Zip code bad formatted'),

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
  })
);
