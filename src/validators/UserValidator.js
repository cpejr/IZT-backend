import { z } from 'zod';
import validate from './validate.js';

export const get = validate(
  z.object({
    query: z.object({
      _id: z.string().optional(),
      name: z.string().optional(),
      isAdmin: z.boolean().optional(),
      isActive: z.boolean().optional(),
      email: z.string().optional(),
      telephone: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional(),
      city: z.string().optional(),
      address: z.string().optional(),
      number: z.string().optional(),
      complement: z.string().optional(),
      zipCode: z.string().optional(),
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
      email: z
        .string({ required_error: 'User email is required' })
        .email('User email must be valid'),
      password: z
        .string({ required_error: 'Password email is required' })
        .min(6, 'User password must be atleast 3 characters')
        .max(16, 'User password must be a maximum of 30 characters'),
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
        .min(3, 'User state must be atleast 3 characters')
        .max(30, 'User state must be a maximum of 30 characters'),
      city: z
        .string({ required_error: 'User city is required' })
        .min(3, 'User city must be atleast 3 characters')
        .max(30, 'User city must be a maximum of 30 characters'),
      address: z
        .string({ required_error: 'User address is required' })
        .min(3, 'User address must be atleast 3 characters')
        .max(50, 'User address must be a maximum of 50 characters'),
      number: z
        .string({ required_error: 'User number is required' })
        .max(15, 'User number must be a maximum of 50 characters'),
      complement: z
        .string({ required_error: 'User complement is required' })
        .min(3, 'User complement must be atleast 3 characters')
        .max(50, 'User complement must be a maximum of 50 characters'),
      zipCode: z
        .string({ required_error: 'User zip code is required' })
        .min(5, 'User zip code must be atleast 5 characters')
        .max(9, 'User zip code must be a maximum of 8 characters')
        .regex(/^\d{5}-\d{3}$/, 'User zip code bad formatted'), // TODO: support for multiple countries
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
      email: z.string().email('User email must be valid').optional(),
      password: z
        .string()
        .min(6, 'User password must be atleast 3 characters')
        .max(16, 'User password must be a maximum of 30 characters')
        .optional(),
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
        .min(3, 'User state must be atleast 3 characters')
        .max(30, 'User state must be a maximum of 30 characters')
        .optional(),
      city: z
        .string()
        .min(3, 'User city must be atleast 3 characters')
        .max(30, 'User city must be a maximum of 30 characters')
        .optional(),
      address: z
        .string()
        .min(3, 'User address must be atleast 3 characters')
        .max(50, 'User address must be a maximum of 50 characters')
        .optional(),
      number: z
        .string()
        .max(15, 'User number must be a maximum of 50 characters')
        .optional(),
      complement: z
        .string()
        .min(3, 'User complement must be atleast 3 characters')
        .max(50, 'User complement must be a maximum of 50 characters')
        .optional(),
      zipCode: z
        .string()
        .min(5, 'User zip code must be atleast 5 characters')
        .max(9, 'User zip code must be a maximum of 8 characters')
        .regex(/^\d{5}-\d{3}$/, 'User zip code bad formatted') // TODO: support for multiple countries
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
