import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
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
import { MetaSchema } from 'schemas';
import { Roles } from 'src/auth/decorators';
import { RolesGuard } from 'src/auth/guards';

import { CreateRoleDto, RolesDto, UpdateRoleDto } from './dto';
import { RolesService } from './roles.service';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Create a new role' })
  @ApiExtraModels(RolesDto)
  @ApiResponse({
    status: 201,
    description: 'Successfully',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(RolesDto) },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ type: CreateRoleDto })
  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN)
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<RolesDto> {
    try {
      return this.rolesService.createRole(createRoleDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @ApiOperation({ summary: 'Get all roles' })
  @ApiExtraModels(RolesDto)
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
                  items: { $ref: getSchemaPath(RolesDto) },
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
  @ApiQuery({ name: 'page', type: 'number' })
  @ApiQuery({ name: 'limit', type: 'number' })
  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN)
  @Get()
  findAllRoles(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<any[]> {
    try {
      return this.rolesService.findAllRoles(page, limit);
    } catch (error) {
      throw new Error(error);
    }
  }

  @ApiOperation({ summary: 'Get a role by id' })
  @ApiExtraModels(RolesDto)
  @ApiResponse({
    status: 200,
    description: 'Successfully',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(RolesDto) },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'id', type: 'number' })
  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN)
  @Get(':id')
  findOneById(@Param('id') id: string): Promise<RolesDto> {
    try {
      return this.rolesService.findOneById(+id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @ApiOperation({ summary: 'Update a role by id' })
  @ApiExtraModels(RolesDto)
  @ApiResponse({
    status: 200,
    description: 'Successfully',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(RolesDto) },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateRoleDto })
  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN)
  @Patch(':id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      return this.rolesService.updateRole(+id, updateRoleDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @ApiOperation({ summary: 'Delete a role by id' })
  @ApiExtraModels(RolesDto)
  @ApiResponse({
    status: 200,
    description: 'Removed a #${id} role',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'id', type: 'number' })
  @UseGuards(RolesGuard)
  @Roles(RoleName.ADMIN)
  @Delete(':id')
  removeRole(@Param('id') id: string): Promise<string> {
    try {
      return this.rolesService.removeRole(+id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
