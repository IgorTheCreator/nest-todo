import { Injectable } from '@nestjs/common';
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
    } catch (error) {
      throw error;
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
    } catch (error) {
      throw error;
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
    } catch (error) {
      throw error;
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
    } catch (error) {
      throw error;
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
    } catch (error) {
      throw error;
    }
  }
}
