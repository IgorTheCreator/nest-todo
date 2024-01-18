import { CreateGroupSchema } from './create-group.dto';
import { createZodDto } from 'nestjs-zod';

const PartialUpdateGroupSchema = CreateGroupSchema.partial();
export class UpdateGroupDto extends createZodDto(PartialUpdateGroupSchema) {}
