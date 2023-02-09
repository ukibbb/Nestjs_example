import { z } from 'zod';

import { errors } from './validation-errors.validation';

export const ResultQuery = z.object({
  offset: z.coerce.number().min(0),
  limit: z.coerce.number().min(0),
  sorted: z.union([
    z
      .string()
      .trim()
      .refine((val) => val === 'true', { message: errors.sorted }),
    z.undefined(),
  ]),
});

export type ResultQuery = z.infer<typeof ResultQuery>;
