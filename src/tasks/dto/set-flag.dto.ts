import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const isCompletedSchema = z.object({
  isCompleted: z.boolean(),
});

export class isCompletedDto extends createZodDto(isCompletedSchema) {}
