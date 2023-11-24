import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleName } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { UpdateRoleUserDto } from './dto';
import { getPagination } from '../../utils/utils';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers(page: number, limit: number): Promise<any> {
    const { _page, _limit } = getPagination(page, limit);

    // Calculate the total number of users
    const totalUsers = await this.prismaService.user.count();
    const totalPages = Math.ceil(totalUsers / _limit);

    // Calculate the number of items to skip
    const offset = (_page - 1) * _limit;

    const users = await this.prismaService.user.findMany({
      skip: offset,
      take: _limit,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        gender: true,
        dateOfBirth: true,
        address: true,
        avatarUrl: true,
        status: true,
        role: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    // change role from object to string
    const usersResponse = users.map((user) => {
      return { ...user, role: user.role.name };
    });

    return {
      data: usersResponse,
      meta: {
        totalPages,
        _page,
        _limit,
        totalUsers,
      },
    };
  }

  async getUserById(id: number): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        gender: true,
        dateOfBirth: true,
        address: true,
        avatarUrl: true,
        status: true,
        role: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    const userResponse = { ...user, role: user.role.name };

    return userResponse;
  }

  async getUserByUsername(username: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        gender: true,
        dateOfBirth: true,
        address: true,
        avatarUrl: true,
        status: true,
        role: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user)
      throw new NotFoundException(`User with username ${username} not found`);

    const userResponse = { ...user, role: user.role.name };

    return userResponse;
  }

  async createUser(data: any): Promise<any> {
    const roleId = await this.prismaService.role.findFirst({
      where: {
        name: (data.role as RoleName) || RoleName.TRAVELER,
      },
      select: {
        id: true,
      },
    });

    delete data.role;

    // hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
        roleId: Number(roleId.id),
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        gender: true,
        dateOfBirth: true,
        address: true,
        avatarUrl: true,
        status: true,
        role: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    const userResponse = { ...user, role: user.role.name };

    return userResponse;
  }

  async updateUser(id: number, data: any): Promise<any> {
    // hash password
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }

    const user = await this.prismaService.user.update({
      where: {
        id: Number(id),
      },
      data,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        gender: true,
        dateOfBirth: true,
        address: true,
        avatarUrl: true,
        status: true,
        role: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    const userResponse = { ...user, role: user.role.name };

    return userResponse;
  }

  async deleteUser(id: number): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    await this.prismaService.user.delete({
      where: {
        id: Number(id),
      },
    });

    return `User: ${user.name} has been deleted`;
  }

  async updateRoleUser(userId: number, body: UpdateRoleUserDto): Promise<any> {
    const { role } = body;

    const isRole = await this.prismaService.role.findFirst({
      where: {
        name: role as RoleName,
      },
      select: {
        id: true,
      },
    });

    if (!isRole)
      throw new NotFoundException(`Role with name ${role} not found`);

    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        roleId: Number(isRole?.id),
      },
      select: {
        username: true,
        name: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    const userResponse = { ...user, role: user.role.name };

    return userResponse;
  }
}
