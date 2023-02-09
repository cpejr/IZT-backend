import { z } from 'zod';
import validate from '../config/validate';

const validator = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Must be a valid email'),
    password: z
      .string({ required_error: 'Password is required' })
      .max(16, {
        message: 'Password must be a maximum of 16 characters',
      })
      .min(6, { message: 'Password must be atleast 6 characters' }),
  }),
});

const loginValidator = validate(validator);

export default loginValidator;
