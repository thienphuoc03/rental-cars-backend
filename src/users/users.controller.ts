import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { RoleName } from '@prisma/client';
import { Roles } from 'src/auth/decorators';
import { RolesGuard } from 'src/auth/guards';

import { CreateUserDto, UpdateRoleUserDto, UserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { MetaSchema } from '../../schemas';

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
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Get()
  @Roles(RoleName.ADMIN)
  @UseGuards(RolesGuard)
  getAllUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
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
  @Roles(RoleName.ADMIN, RoleName.CUSTOMER, RoleName.CAROWNER)
  @UseGuards(RolesGuard)
  getUserById(@Param('id') id: number): Promise<UserDto> {
    try {
      return this.usersService.getUserById(id);
    } catch (error) {
      throw new Error(error.message);
    }
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
  @Get('/username/:username')
  @Roles(RoleName.ADMIN, RoleName.CUSTOMER, RoleName.CAROWNER)
  @UseGuards(RolesGuard)
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
  @Roles(RoleName.ADMIN)
  @UseGuards(RolesGuard)
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
  @Patch(':id')
  @Roles(RoleName.ADMIN, RoleName.CUSTOMER, RoleName.CAROWNER)
  @UseGuards(RolesGuard)
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
  @Roles(RoleName.ADMIN)
  @UseGuards(RolesGuard)
  deleteUser(@Param('id') id: number): Promise<UserDto> {
    return this.usersService.deleteUser(id);
  }

  // update role user by user id
  @ApiOperation({ summary: 'Update role user by user id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 404,
    description: 'Role with name ${role} not found',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'userId', required: true, type: Number })
  @ApiBody({ type: UpdateRoleUserDto })
  @Patch('/role/:userId')
  @Roles(RoleName.ADMIN)
  @UseGuards(RolesGuard)
  updateRoleUser(
    @Param('userId') userId: number,
    @Body() updateRoleUserDto: UpdateRoleUserDto,
  ): Promise<any> {
    try {
      return this.usersService.updateRoleUser(userId, updateRoleUserDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
