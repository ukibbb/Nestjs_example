import { z } from 'zod';
import { getNames } from 'country-list';

function isValidCountry(val: string): boolean {
  const names = getNames();
  return Boolean(
    names
      .map((name: string) => name.toLowerCase())
      .find((name) => name === val.toLowerCase()),
  );

  // If is valid check if this country hasn't been added yet.
}

const errors = {
  url: 'Image must be a valid URL.',
  country: 'Country cannot be empty.',
  medal: 'Number of medals is required.',
  countryNotValid: 'Valid country name not found.',
  sorted: 'Sorted requires true value.',
  medalsNotEqual: 'Medals is not equals to medals overall.',
};

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

export const ResultsQuery = z.object({
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

export type OlimpicResult = z.infer<typeof OlimpicResult>;
export type ResultsQuery = z.infer<typeof ResultsQuery>;
