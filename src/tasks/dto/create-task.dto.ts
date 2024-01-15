import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const TaskSchema = z.object({
  title: z.string().max(64),
  desc: z.string().max(256).optional(),
});

export class CreateTaskDto extends createZodDto(TaskSchema) {}
