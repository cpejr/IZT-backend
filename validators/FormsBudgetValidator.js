import { z } from 'zod';

export const formsBudget = z.object ({
    name: z.string().max(40).min(10),
    company: z.string(),
    email: z.string().email(),
    telephone: z.string().max(15),
    country: z.string().max(30).min(4),
    state: z.string().max(30).min(4),
    city: z.string().max(30).min(4),
    ZIPcode: z.string().max(8).min(5),
    address: z.string().max(50).min(5),
});
