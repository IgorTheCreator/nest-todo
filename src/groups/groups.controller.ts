import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto, UpdateGroupDto } from './dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async getGroups() {
    const groups = await this.groupsService.getGroups();
    return groups;
  }

  @Get(':id')
  async getGroupWithTasks(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    groupId: number,
  ) {
    return this.groupsService.getGroupWithTasks(groupId);
  }

  @Post()
  async createGroups(@Body() group: CreateGroupDto) {
    const createdGroup = await this.groupsService.createGroup(group);
    return createdGroup;
  }

  @Patch(':id')
  async updateGroup(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    groupId: number,
    @Body() group: UpdateGroupDto,
  ) {
    const updatedGroup = await this.groupsService.updateGroup(groupId, group);
    return updatedGroup;
  }

  @Delete(':id')
  async deleteGroup(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    groupId: number,
  ) {
    await this.groupsService.deleteGroup(groupId);
  }
}
