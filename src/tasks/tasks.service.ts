import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGroupDto } from 'src/groups/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTaskDto } from './dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTasks() {
    try {
      const tasks = await this.prismaService.task.findMany({
        include: {
          group: true,
        },
      });
      return tasks;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getTaskById(id: number) {
    try {
      const task = await this.prismaService.task.findFirst({
        where: {
          id,
        },
      });
      return task;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async createTask(task: CreateGroupDto) {
    try {
      const createdTask = await this.prismaService.task.create({
        data: {
          title: task.title,
          desc: task.desc,
        },
      });
      return createdTask;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async updateTask(id: number, task: UpdateTaskDto) {
    try {
      const updatedTask = await this.prismaService.task.update({
        where: {
          id,
        },
        data: {
          title: task.title,
          desc: task.desc,
        },
      });
      return updatedTask;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async setIsCompleted(id: number, isCompleted: boolean) {
    try {
      const updatedTask = await this.prismaService.task.update({
        where: {
          id,
        },
        data: {
          isCompleted,
        },
      });
      return updatedTask;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async deleteTask(id: number) {
    try {
      await this.prismaService.task.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
