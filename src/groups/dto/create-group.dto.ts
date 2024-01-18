import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateGroupSchema = z.object({
  title: z.string().max(64),
  desc: z.string().max(256).optional(),
});

export class CreateGroupDto extends createZodDto(CreateGroupSchema) {}
