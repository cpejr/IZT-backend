import { z } from 'zod';
import validate from './validate.js';

export const get = validate(
  z.object({
    query: z.object({
      _id: z.string().optional(),
      name: z.string().optional(),
      company: z.string().optional(),
      role: z.string().optional(),
      isAdmin: z.boolean().optional(),
      isActive: z.boolean().optional(),
      email: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional(),
      city: z.string().optional(),
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
      company: z
        .string({ required_error: 'User company is required' })
        .min(3, 'Use company must be atleast 3 characters')
        .max(40, 'User company must be a maximum of 40 characters'),
      role: z
        .string({ required_error: 'User role is required' })
        .min(3, 'Use role must be atleast 3 characters')
        .max(40, 'User role must be a maximum of 40 characters'),
      isAdmin: z.boolean().default(false),
      isActive: z.boolean().default(false),
      email: z
        .string({ required_error: 'User email is required' })
        .email('User email must be valid'),
      password: z
        .string({ required_error: 'Password email is required' })
        .min(6, 'User password must be atleast 3 characters')
        .max(16, 'User password must be a maximum of 30 characters'),
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
      company: z
        .string()
        .min(3, 'Use company must be atleast 3 characters')
        .max(40, 'User company must be a maximum of 40 characters')
        .optional(),
      role: z
        .string()
        .min(3, 'Use role must be atleast 3 characters')
        .max(40, 'User role must be a maximum of 40 characters')
        .optional(),
      isAdmin: z.boolean().optional(),
      isActive: z.boolean().optional(),
      email: z.string().email('User email must be valid').optional(),
      password: z
        .string()
        .min(6, 'User password must be atleast 3 characters')
        .max(16, 'User password must be a maximum of 30 characters')
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
