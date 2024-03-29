import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleName } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';

interface signUpParams {
  username: string;
  email: string;
  password: string;
}

interface signInParams {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp({ username, email, password }: signUpParams) {
    const existedUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existedUser) throw new ConflictException('Username or email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    // Find the default role with the name 'TRAVELER'
    const defaultRole = await this.prismaService.role.findFirst({
      where: {
        name: RoleName.TRAVELER,
      },
    });

    if (!defaultRole) throw new Error('Default role not');

    const avatarDefaultUrl: string =
      'https://res.cloudinary.com/dj1v6wmjv/image/upload/v1701074365/rental-cars-cloudinary/avatars/avatar-default.jpg';

    const user = await this.prismaService.user.create({
      data: {
        username,
        email,
        avatarUrl: avatarDefaultUrl,
        password: hashedPassword,
        roleId: Number(defaultRole.id),
      },
      select: {
        username: true,
        name: true,
        phone: true,
        avatarUrl: true,
        email: true,
        role: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
    });

    return { ...user, role: user.role.name };
  }

  async signIn({ username, password }: signInParams): Promise<any> {
    const user = await this.prismaService.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        password: true,
        email: true,
        phone: true,
        roleId: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) throw new UnauthorizedException('Tài khoản hoặc mật khẩu không chính xác!!!');

    const hashedPassword = user.password;
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) throw new UnauthorizedException('Tài khoản hoặc mật khẩu không chính xác!!!');

    const { accessToken, refreshToken } = await this.generateToken(user.id, user.username, user.roleId, user.role.name);

    // Remove password from user object
    const { password: _, roleId, ...userWithoutPassword } = user;

    const userResponse = {
      ...userWithoutPassword,
      role: userWithoutPassword.role.name,
    };

    return {
      user: userResponse,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async generateToken(userId: number, username: string, roleId: number, role: string) {
    const payload = { sub: userId, username, roleId, role };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '12h',
      secret: process.env.ACCESS_TOKEN_SECRET,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.REFRESH_TOKEN_SECRET,
    });

    return { accessToken, refreshToken };
  }
}
