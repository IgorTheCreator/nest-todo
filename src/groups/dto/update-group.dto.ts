import {z} from 'zod'
import { GroupSchema } from "./create-group.dto";

const PartialGroupSchema = GroupSchema.partial()
export type UpdateGroupDto = z.infer<typeof PartialGroupSchema>