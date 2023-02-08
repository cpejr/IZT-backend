import { z } from 'zod';

export const formsContact = z.object ({
    company: z.string(),
    representative: z.string(),
    email: z.string().email(),
    telephone: z.string().max(15),
    menssage: z.string().max(1500).min(20),
});
