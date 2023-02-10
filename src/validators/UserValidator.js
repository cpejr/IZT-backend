import { z } from 'zod';
import validate from '../config/validate.js';

export const getUserValidator = validate(z.object());
export const updateUserValidator = validate(z.object());

export const createUserValidator = validate(
  z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .max(40, { message: 'Name must be a maximum of 40 characters' })
      .min(10, { message: 'Name must be atleast 10 characters' }),

    email: z
      .string({ required_error: 'Email is required' })
      .email('Must be a valid email'),

    password: z
      .string({ required_error: 'Password is required' })
      .max(16, {
        message: 'Password must be a maximum of 16 characters',
      })
      .min(6, { message: 'Password must be atleast 6 characters' }),
  })
);

export const deleteUserValidator = validate(
  z.object({
    params: z.object({
      id: z.string({ required_error: 'Product ID is required' }),
    }),
  })
);
