import { createZodDto } from 'nestjs-zod';
import { TaskSchema } from './create-task.dto';

const PartialTaskSchema = TaskSchema.partial();
export class UpdateTaskDto extends createZodDto(PartialTaskSchema) {}
