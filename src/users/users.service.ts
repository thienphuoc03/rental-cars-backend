import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleName } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { convertBase64ToFile, getPagination } from 'utils/utils';

import { UpdateRoleUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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
    const user = await this.prismaService.user.findFirst({
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

    return { ...user, role: user.role.name };
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

    if (!user) throw new NotFoundException(`User with username ${username} not found`);

    return { ...user, role: user.role.name };
  }

  async getProfile(currentUser: any): Promise<any> {
    return currentUser;
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

    // upload avatar
    if (!data.avatarUrl) {
      data.avatarUrl =
        'https://res.cloudinary.com/dj1v6wmjv/image/upload/v1701074365/rental-cars-cloudinary/avatars/avatar-default.jpg';
    }

    const avatarFile = convertBase64ToFile(data.avatarUrl);

    const nameImage = `${data.username}-${Date.now()}-avatar`;
    const avatar = await this.cloudinaryService.uploadAvatar(avatarFile, nameImage);
    console.log({ avatar });

    data.avatarUrl = avatar.url;

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

    if (!user) throw new Error('Cannot create user');

    return { ...user, role: user.role.name };
  }

  async updateUser(id: number, data: any): Promise<any> {
    // hash password
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
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

    return { ...user, role: user.role.name };
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

    if (!isRole) throw new NotFoundException(`Role with name ${role} not found`);

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

    return { ...user, role: user.role.name };
  }

  async uploadAvatar(currentUser: any, image: any): Promise<any> {
    const { id } = currentUser;
    const { url } = image;

    const user = await this.prismaService.user.update({
      where: {
        id: Number(id),
      },
      data: {
        avatarUrl: url,
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

    return { ...user, role: user.role.name };
  }
}
