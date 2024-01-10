import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GroupSchema = z
  .object({
    title: z.string().max(64),
    desc: z.string().max(256).optional(),
  })
  .required();

export class CreateGroupDto extends createZodDto(GroupSchema) {}
