import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { $Enums } from '@prisma/client';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: { email: string; password: string; name: string; role?: string }) {
    // Convertir string a enum si viene role
    const role = data.role && Object.values($Enums.UserRole).includes(data.role as $Enums.UserRole)
      ? (data.role as $Enums.UserRole)
      : undefined;
    return this.authService.register({ ...data, role });
  }

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) throw new Error('Credenciales inválidas');
    return this.authService.login(user);
  }

  @Post('me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req: ExpressRequest) {
    return req.user;
  }
}
