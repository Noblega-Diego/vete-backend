import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, Query, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('clients')
@ApiBearerAuth()
@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() dto: CreateClientDto, @Req() req: Request) {
    const user: any = req.user;
    // Si es CLIENT, solo puede crear un cliente vinculado a sí mismo
    if (user.role === 'CLIENT') {
      return this.clientsService.createAndLinkToUser(dto, user.id);
    }
    return this.clientsService.create(dto);
  }

  @Get()
  findAll(@Req() req: Request, @Query('page') page?: number, @Query('limit') limit?: number, @Query('search') search?: string) {
    const user: any = req.user;
    if (user.role === 'CLIENT') {
      // Solo puede ver sus propios clientes (por lo general uno)
      return this.clientsService.findAllByUserId(user.id);
    }
    return this.clientsService.findAll({ page, limit, search });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user: any = req.user;
    if (user.role === 'CLIENT') {
      const isLinked = await this.clientsService.isClientLinkedToUser(id, user.id);
      if (!isLinked) throw new ForbiddenException('No puedes acceder a este cliente');
    }
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateClientDto, @Req() req: Request) {
    const user: any = req.user;
    if (user.role === 'CLIENT') {
      const isLinked = await this.clientsService.isClientLinkedToUser(id, user.id);
      if (!isLinked) throw new ForbiddenException('No puedes modificar este cliente');
    }
    return this.clientsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user: any = req.user;
    if (user.role === 'CLIENT') {
      const isLinked = await this.clientsService.isClientLinkedToUser(id, user.id);
      if (!isLinked) throw new ForbiddenException('No puedes eliminar este cliente');
    }
    return this.clientsService.remove(id);
  }
}
