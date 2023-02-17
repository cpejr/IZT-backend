import { z } from 'zod';
import validate from '../config/validate.js';

export const getUserValidator = validate(
  z.object({
    query: z.object({
      _id: z.string().optional(),
      name: z.string().optional(),
      company: z.string().optional(),
      email: z.string().optional(),
      telephone: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional(),
      city: z.string().optional(),
      ZIPcode: z.string().optional(),
      address: z.string().optional(),
    }),
  })
);

export const createUserValidator = validate(
  z.object({
    body: z.object({
      name: z
        .string({ required_error: 'Name is required' })
        .max(40, { message: 'Name must be a maximum of 40 characters' })
        .min(10, { message: 'Name must be atleast 10 characters' })
        .optional(),

      company: z
        .string({ required_error: 'Company name is required' })
        .optional(),

      email: z
        .string({ required_error: 'Email is required' })
        .email('Must be a valid email')
        .optional(),

      telephone: z
        .string({ required_error: 'Telephone is required' })
        .max(15, { message: 'Telephone must be a maximum of 15 characters' })
        .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Telephone bad formatted')
        .optional(),

      country: z
        .string({ required_error: 'Country is required' })
        .max(30, { message: 'Country must be a maximum of 30 characters' })
        .min(4, { message: 'Country must be atleast 4 characters' })
        .optional(),

      state: z
        .string({ required_error: 'State is required' })
        .max(30, { message: 'State must be a maximum of 30 characters' })
        .min(4, { message: 'State must be atleast 4 characters' })
        .optional(),

      city: z
        .string({ required_error: 'City is required' })
        .max(30, { message: 'City must be a maximum of 30 characters' })
        .min(4, { message: 'City must be atleast 4 characters' })
        .optional(),

      ZIPcode: z
        .string({ required_error: 'ZIPcode is required' })
        .max(8, { message: 'ZIPcode must be a maximum of 8 characters' })
        .min(5, { message: 'ZIPcode must be atleast 5 characters' })
        .regex(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Zip code bad formatted')
        .optional(),

      address: z
        .string({ required_error: 'Adress is required' })
        .max(50, { message: 'Adress must be a maximum of 50 characters' })
        .min(5, { message: 'Adress must be atleast 5 characters' })
        .optional(),
    }),
  })
);

export const updateUserValidator = validate(
  z.object({
    body: z.object({
      name: z
        .string()
        .max(40, { message: 'Name must be a maximum of 40 characters' })
        .min(10, { message: 'Name must be atleast 10 characters' })
        .optional(),

      company: z.string().optional(),

      email: z.string().email('Must be a valid email').optional(),

      telephone: z
        .string()
        .max(15, { message: 'Telephone must be a maximum of 15 characters' })
        .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Telephone bad formatted')
        .optional(),

      country: z
        .string()
        .max(30, { message: 'Country must be a maximum of 30 characters' })
        .min(4, { message: 'Country must be atleast 4 characters' })
        .optional(),

      state: z
        .string()
        .max(30, { message: 'State must be a maximum of 30 characters' })
        .min(4, { message: 'State must be atleast 4 characters' })
        .optional(),

      city: z
        .string()
        .max(30, { message: 'City must be a maximum of 30 characters' })
        .min(4, { message: 'City must be atleast 4 characters' })
        .optional(),

      ZIPcode: z
        .string()
        .max(8, { message: 'ZIPcode must be a maximum of 8 characters' })
        .min(5, { message: 'ZIPcode must be atleast 5 characters' })
        .regex(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Zip code bad formatted')
        .optional(),

      address: z
        .string()
        .max(50, { message: 'Adress must be a maximum of 50 characters' })
        .min(5, { message: 'Adress must be atleast 5 characters' })
        .optional(),
    }),
    params: z.object({
      id: z.string({ required_error: 'User ID is required' }),
    }),
  })
);

export const deleteUserValidator = validate(
  z.object({
    params: z.object({
      id: z.string({ required_error: 'Product ID is required' }),
    }),
  })
);
