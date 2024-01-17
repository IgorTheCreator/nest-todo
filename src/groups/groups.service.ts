import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto, UpdateGroupDto } from './dto';

@Injectable()
export class GroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getGroups() {
    try {
      const groups = await this.prismaService.group.findMany();
      return groups;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getGroupWithTasks(id: number) {
    try {
      const groupWithTasks = await this.prismaService.group.findFirst({
        where: {
          id,
        },
        include: {
          tasks: true,
        },
      });
      return groupWithTasks;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async createGroup(group: CreateGroupDto) {
    try {
      const createdGroup = await this.prismaService.group.create({
        data: {
          title: group.title,
          desc: group.desc,
        },
      });
      return createdGroup;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async updateGroup(id: number, group: UpdateGroupDto) {
    try {
      const updatedGroup = await this.prismaService.group.update({
        where: {
          id,
        },
        data: {
          title: group.title,
          desc: group.desc,
        },
      });
      return updatedGroup;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async deleteGroup(id: number) {
    try {
      await this.prismaService.group.delete({
        where: {
          id,
        },
        include: {
          tasks: true,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
