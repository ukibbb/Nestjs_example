import { getNames } from 'country-list';

export function isValidCountry(val: string): boolean {
  const names = getNames();
  return Boolean(
    names.find((name) => name.toLowerCase() === val.toLowerCase()),
  );
}
