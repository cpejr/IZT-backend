import { z } from 'zod';

const formsContact = z
  .object({
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
        .regex(/^\+(?:[0-9]●?){6,14}[0-9]$/, 'Zip code bad formatted'),

      menssage: z
        .string({ required_error: 'Message is required' })
        .max(1500, { message: 'Message must be a maximum of 1500 characters' })
        .min(20, { message: 'Message must be atleast 20 characters' }),
    }),
  })
  .transform(({ body }) => body);
export default formsContact;
