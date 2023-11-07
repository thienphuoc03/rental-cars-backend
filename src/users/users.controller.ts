import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { MetaSchema } from 'schemas';

import { CreateUserDto, UserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all user' })
  @ApiExtraModels(UserDto, MetaSchema)
  @ApiResponse({
    status: 200,
    description: 'Successfully',
    content: {
      'application/json': {
        schema: {
          allOf: [
            {
              properties: {
                data: {
                  type: 'array',
                  items: { $ref: getSchemaPath(UserDto) },
                },
              },
            },
            {
              properties: {
                meta: {
                  $ref: getSchemaPath(MetaSchema),
                },
              },
            },
          ],
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'page', required: false, type: Number })
  @ApiParam({ name: 'limit', required: false, type: Number })
  @Get()
  getAllUsers(
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<any> {
    return this.usersService.getAllUsers(page, limit);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiExtraModels(UserDto)
  @ApiResponse({
    status: 200,
    description: 'Successfully',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(UserDto) },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'User with id: {id} not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @Get(':id')
  getUserById(@Param('id') id: number): Promise<UserDto> {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Get user by username' })
  @ApiExtraModels(UserDto)
  @ApiResponse({
    status: 200,
    description: 'Successfully',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(UserDto) },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 404,
    description: 'User with username: {username} not found',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'username', required: true, type: String })
  @Get(':username')
  getUserByUsername(@Param('username') username: string): Promise<UserDto> {
    return this.usersService.getUserByUsername(username);
  }

  @ApiOperation({ summary: 'Add new user' })
  @ApiExtraModels(UserDto)
  @ApiResponse({
    status: 201,
    description: 'Successfully',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(UserDto) },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.createUser(createUserDto);
  }

  //  update user by id
  @ApiOperation({ summary: 'Update user by id' })
  @ApiExtraModels(UserDto)
  @ApiResponse({
    status: 200,
    description: 'Successfully',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(UserDto) },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 404,
    description: 'User with id: {id} not found',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiBody({ type: UpdateUserDto })
  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  //  delete user by id
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({
    status: 200,
    description: 'User: ${user.name} has been deleted',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 404,
    description: 'User with id: {id} not found',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<UserDto> {
    return this.usersService.deleteUser(id);
  }
}
