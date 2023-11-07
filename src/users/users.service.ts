import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleName } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { getPagination } from 'utils/utils';

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
        email: true,
        phone: true,
        gender: true,
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

    return {
      data: users,
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
        email: true,
        phone: true,
        gender: true,
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

    return user;
  }

  async getUserByUsername(username: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        gender: true,
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

    return user;
  }

  async createUser(data: any): Promise<any> {
    const roleId = await this.prismaService.role.findFirst({
      where: {
        name: (data.role as RoleName) || RoleName.CUSTOMER,
      },
      select: {
        id: true,
      },
    });

    delete data.role;

    const user = await this.prismaService.user.create({
      data: {
        ...data,
        roleId: Number(roleId.id),
      },
    });

    return user;
  }

  async updateUser(id: number, data: any): Promise<any> {
    const user = await this.prismaService.user.update({
      where: {
        id: Number(id),
      },
      data,
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  async deleteUser(id: number): Promise<any> {
    const user = await this.prismaService.user.delete({
      where: {
        id: Number(id),
      },
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return `User: ${user.name} has been deleted`;
  }
}
