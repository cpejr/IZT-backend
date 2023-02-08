import { z } from 'zod';

export const loginValidator = z.object({
    body: z.object({
      email: z
        .string({ required_error: 'Email is required' })
        .email('Must be a valid email'),
      password: z.string({ required_error: 'Password is required',}).passmax(16).min(6)}),
  })
  .transform(({ body }) => body);