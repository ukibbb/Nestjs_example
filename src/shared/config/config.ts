import { z } from 'zod';
import { InvalidConfigError } from './errors/invalid-config.errors';

export const configSchema = z.object({
  // MYSQL
  MYSQL_ROOT_PASSWORD: z.string(),
  MYSQL_USER: z.string(),
  MYSQL_DATABASE: z.string(),
  MYSQL_PASSWORD: z.string(),
  MYSQL_PORT: z.string().transform((val) => Number(val)),
  HOST: z.string(),
});

export type Config = z.infer<typeof configSchema>;

type CreateConfigPayload = {
  [Key in keyof Config]: any;
};

export const createConfig = async (
  payload: CreateConfigPayload,
): Promise<Config> => {
  try {
    return configSchema.parseAsync(payload);
  } catch (error: any) {
    throw new InvalidConfigError();
  }
};
