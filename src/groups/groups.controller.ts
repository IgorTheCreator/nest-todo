import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto, GroupDto, UpdateGroupDto } from './dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all groups' })
  @ApiOkResponse({ description: 'Success', type: GroupDto })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async getGroups(): Promise<GroupDto[]> {
    const groups = await this.groupsService.getGroups();
    return groups;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get group with tasks' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Group identifier',
  })
  @ApiOkResponse({ description: 'Success', type: GroupDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async getGroupWithTasks(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    groupId: number,
  ): Promise<GroupDto> {
    return this.groupsService.getGroupWithTasks(groupId);
  }

  @Post()
  @ApiOperation({ summary: 'Create group' })
  @ApiBody({
    description: "Group's data",
    type: CreateGroupDto,
  })
  @ApiCreatedResponse({ description: 'Success', type: GroupDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async createGroups(@Body() group: CreateGroupDto): Promise<GroupDto> {
    const createdGroup = await this.groupsService.createGroup(group);
    return createdGroup;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update group' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Group identifier',
  })
  @ApiBody({ description: "Group's data", type: UpdateGroupDto })
  @ApiOkResponse({ description: 'Success', type: GroupDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async updateGroup(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    groupId: number,
    @Body() group: UpdateGroupDto,
  ): Promise<GroupDto> {
    const updatedGroup = await this.groupsService.updateGroup(groupId, group);
    return updatedGroup;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete group' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Group identifier',
  })
  @ApiNoContentResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async deleteGroup(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    groupId: number,
  ): Promise<void> {
    await this.groupsService.deleteGroup(groupId);
  }
}
