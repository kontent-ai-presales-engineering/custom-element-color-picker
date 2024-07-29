import { z } from "zod";

export type Config = Readonly<{
  colorFormat?: 'hex' | 'rgb' | 'hsl' | 'hsv';
  useAlpha?: boolean;
}> | null;

export const configSchema: z.Schema<Config> = z.object({
  colorFormat: z.optional(z.enum(['hex', 'rgb', 'hsl', 'hsv'] as const)),
  useAlpha: z.optional(z.boolean()),
}).nullable();
