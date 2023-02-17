import { z } from 'zod';
import validate from './validate.js';

export const getFormContactValidator = validate(z.object());
export const deleteFormContactValidator = validate(z.object());

export const createFormContactValidator = validate(
  z.object({
    body: z.object({
      company: z.string({ required_error: 'Company name is required' }),

      representative: z.string({
        required_error: 'Representative name is required',
      }),

      email: z
        .string({ required_error: 'Email is required' })
        .email('Must be a valid email'),

      telephone: z
        .string({ required_error: 'Telephone is required' })
        .max(15, { message: 'Telephone must be a maximum of 15 characters' })
        .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Telephone bad formatted'),

      message: z
        .string({ required_error: 'Message is required' })
        .max(1500, { message: 'Message must be a maximum of 1500 characters' })
        .min(5, { message: 'Message must be atleast 5 characters' }),
    }),
  })
);
