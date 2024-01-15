import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks() {
    const tasks = await this.tasksService.getTasks();
    return tasks;
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) taskId: number) {
    const task = await this.tasksService.getTaskById(taskId);
    return task;
  }

  @Post()
  async createTask(@Body() task: CreateTaskDto) {
    const createdTask = await this.tasksService.createTask(task);
    return createdTask;
  }

  @Patch(':id')
  async updateTask(
    @Param('id', ParseIntPipe) taskId: number,
    @Body() task: UpdateTaskDto,
  ) {
    const updatedTask = await this.tasksService.updateTask(taskId, task);
    return updatedTask;
  }

  @Patch(':id/done')
  async setIsCompleted(
    @Param('id', ParseIntPipe) taskId: number,
    @Body('isCompleted', ParseBoolPipe) isCompleted: boolean,
  ) {
    const updatedTask = await this.tasksService.setIsCompleted(
      taskId,
      isCompleted,
    );
    return updatedTask;
  }
}
