import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, TaskDto, UpdateTaskDto, isCompletedDto } from './dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks with their groups' })
  @ApiOkResponse({ description: 'Success', type: TaskDto })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async getTasks(): Promise<TaskDto[]> {
    const tasks = await this.tasksService.getTasks();
    return tasks;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Task identifier',
  })
  @ApiOkResponse({ description: 'Success', type: TaskDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async getTaskById(
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<TaskDto> {
    const task = await this.tasksService.getTaskById(taskId);
    return task;
  }

  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiBody({ description: "Task's data", type: CreateTaskDto })
  @ApiOkResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async createTask(@Body() task: CreateTaskDto) {
    const createdTask = await this.tasksService.createTask(task);
    return createdTask;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Task identifier',
  })
  @ApiBody({ description: "Group's data", type: UpdateTaskDto })
  @ApiOkResponse({ description: 'Success', type: TaskDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async updateTask(
    @Param('id', ParseIntPipe) taskId: number,
    @Body() task: UpdateTaskDto,
  ): Promise<TaskDto> {
    const updatedTask = await this.tasksService.updateTask(taskId, task);
    return updatedTask;
  }

  @Patch(':id/done')
  @ApiOperation({ summary: 'Set the completion flag for a task' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Task identifier',
  })
  @ApiBody({ description: 'Completion flag', type: isCompletedDto })
  @ApiOkResponse({ description: 'Success', type: TaskDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async setIsCompleted(
    @Param('id', ParseIntPipe) taskId: number,
    @Body('isCompleted', ParseBoolPipe) { isCompleted }: isCompletedDto,
  ): Promise<TaskDto> {
    const updatedTask = await this.tasksService.setIsCompleted(
      taskId,
      isCompleted,
    );
    return updatedTask;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete task' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Task identifier',
  })
  @ApiNoContentResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async deleteTask(@Param('id', ParseIntPipe) taskId: number): Promise<void> {
    await this.tasksService.deleteTask(taskId);
  }
}
