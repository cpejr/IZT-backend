import { z } from 'zod';
import validate from './validate.js';

export const get = validate(
  z.object({
    query: z.object({
      _id: z.string().optional(),
      name: z.string().optional(),
      isAdmin: z.boolean().optional(),
      isActive: z.boolean().optional(),
      company: z.string().optional(),
      email: z.string().optional(),
      telephone: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional(),
      city: z.string().optional(),
      zipCode: z.string().optional(),
      address: z.string().optional(),
    }),
  })
);

export const create = validate(
  z.object({
    body: z.object({
      name: z
        .string({ required_error: 'User name is required' })
        .min(3, 'Use name must be atleast 3 characters')
        .max(40, 'User name must be a maximum of 40 characters'),
      isAdmin: z.boolean().default(false),
      isActive: z.boolean().default(false),
      company: z.string({ required_error: 'Company name is required' }),
      email: z
        .string({ required_error: 'User email is required' })
        .email('User email must be valid'),
      telephone: z
        .string({ required_error: 'User telephone is required' })
        .max(15, 'User telephone must be a maximum of 15 characters')
        .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'User telephone bad formatted'),
      country: z
        .string({ required_error: 'User country is required' })
        .min(3, 'User country must be atleast 3 characters')
        .max(30, 'User country must be a maximum of 30 characters'),
      state: z
        .string({ required_error: 'User state is required' })
        .min(4, 'User state must be atleast 4 characters')
        .max(30, 'User state must be a maximum of 30 characters'),
      city: z
        .string({ required_error: 'User city is required' })
        .min(3, 'User city must be atleast 3 characters')
        .max(30, 'User city must be a maximum of 30 characters'),
      zipCode: z
        .string({ required_error: 'User zip code is required' })
        .min(5, 'User zip code must be atleast 5 characters')
        .max(8, 'User zip code must be a maximum of 8 characters')
        .regex(/^[0-9]{5}(?:-[0-9]{4})?$/, 'User zip code bad formatted'),
      address: z
        .string({ required_error: 'User address is required' })
        .min(3, 'User address must be atleast 3 characters')
        .max(50, 'User address must be a maximum of 50 characters'),
    }),
  })
);

export const update = validate(
  z.object({
    body: z.object({
      name: z
        .string()
        .min(3, 'Use name must be atleast 3 characters')
        .max(40, 'User name must be a maximum of 40 characters')
        .optional(),
      isAdmin: z.boolean().optional(),
      isActive: z.boolean().optional(),
      company: z.string().optional(),
      email: z.string().email('User email must be valid').optional(),
      telephone: z
        .string()
        .max(15, 'User telephone must be a maximum of 15 characters')
        .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'User telephone bad formatted')
        .optional(),
      country: z
        .string()
        .min(3, 'User country must be atleast 3 characters')
        .max(30, 'User country must be a maximum of 30 characters')
        .optional(),
      state: z
        .string()
        .min(4, 'User state must be atleast 4 characters')
        .max(30, 'User state must be a maximum of 30 characters')
        .optional(),
      city: z
        .string()
        .min(3, 'User city must be atleast 3 characters')
        .max(30, 'User city must be a maximum of 30 characters')
        .optional(),
      zipCode: z
        .string()
        .min(5, 'User zip code must be atleast 5 characters')
        .max(8, 'User zip code must be a maximum of 8 characters')
        .regex(/^[0-9]{5}(?:-[0-9]{4})?$/, 'User zip code bad formatted')
        .optional(),
      address: z
        .string()
        .min(3, 'User address must be atleast 3 characters')
        .max(50, 'User address must be a maximum of 50 characters')
        .optional(),
    }),
    params: z.object({
      _id: z.string({ required_error: 'User ID is required' }),
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
