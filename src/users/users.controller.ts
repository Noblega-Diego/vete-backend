import { Controller, Post, Body, Get, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { $Enums } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: { email: string; password: string; name: string; role?: string }) {
    // Convertir string a enum si viene role
    const role = data.role && Object.values($Enums.UserRole).includes(data.role as $Enums.UserRole)
      ? (data.role as $Enums.UserRole)
      : undefined;
    return this.usersService.create({ ...data, role });
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const user = await this.usersService.findById(Number(id));
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
}
