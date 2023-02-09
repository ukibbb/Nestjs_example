import { z } from 'zod';

import { errors } from './validation-errors.validation';
import { isValidCountry } from './utils.validation';

export const OlimpicResult = z
  .object({
    country: z
      .string()
      .trim()
      .min(1, errors.country)
      .refine((val) => isValidCountry(val), {
        message: errors.countryNotValid,
      }),
    image: z.string().url(errors.url),
    medals: z.object({
      gold: z.number().min(0),
      silver: z.number().min(0),
      bronze: z.number().min(0),
    }),
    medalsOverall: z.number().min(0),
  })
  .refine(
    ({ medals, medalsOverall }) =>
      Object.values(medals).reduce((a, b) => a + b, 0) === medalsOverall,
    { message: errors.medalsNotEqual },
  );

export type OlimpicResult = z.infer<typeof OlimpicResult>;
