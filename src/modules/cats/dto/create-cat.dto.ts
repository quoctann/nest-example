import { z } from 'zod';

// export class CreateCatDto {
//   name: string;
//   age: number;
//   breed: string;
// }

// example schema based validation with zod
export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type CreateCatDto = z.infer<typeof createCatSchema>;
