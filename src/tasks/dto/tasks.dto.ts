import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  desc: z.string(),
  isCompleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  groupId: z.number(),
});

export class TaskDto extends createZodDto(TaskSchema) {}
