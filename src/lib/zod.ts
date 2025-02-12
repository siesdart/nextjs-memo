import { z } from 'zod';

export type ZodState<T extends z.ZodType> = {
  errors?: {
    [P in keyof z.infer<T>]?: string[];
  };
  message?: string;
  payload?: FormData;
};
