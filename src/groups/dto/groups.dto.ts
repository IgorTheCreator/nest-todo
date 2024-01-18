import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const GroupSchema = z.object({
  id: z.number(),
  title: z.string(),
  desc: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export class GroupDto extends createZodDto(GroupSchema) {}
