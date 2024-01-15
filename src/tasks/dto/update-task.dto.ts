import { z } from 'zod';
import { TaskSchema } from './create-task.dto';

const PartialTaskSchema = TaskSchema.partial();
export type UpdateTaskDto = z.infer<typeof PartialTaskSchema>;
