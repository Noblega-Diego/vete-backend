import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { $Enums } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { email: string; password: string; name: string; role?: $Enums.UserRole }) {
    const hash = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hash,
        name: data.name,
        role: data.role || $Enums.UserRole.CLIENT,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email, deleted: false } });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id, deleted: false } });
  }

  async validatePassword(user: any, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}
