import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('pets')
@ApiBearerAuth()
@Controller('pets')
@UseGuards(JwtAuthGuard)
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  create(@Body() dto: CreatePetDto, @Req() req: Request) {
    // Forzar que el clienteId sea el del usuario autenticado si es CLIENT
    const user: any = req.user;
    if (user.role === 'CLIENT') {
      dto.clientId = user.id;
    }
    return this.petsService.create(dto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const user: any = req.user;
    if (user.role === 'CLIENT') {
      // Solo ver mascotas de clientes vinculados
      return this.petsService.findAllByUserLinked(user.id);
    }
    return this.petsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user: any = req.user;
    if (user.role === 'CLIENT') {
      const isLinked = await this.petsService.isPetLinkedToUser(id, user.id);
      if (!isLinked) throw new ForbiddenException('No puedes acceder a esta mascota');
    }
    return this.petsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePetDto, @Req() req: Request) {
    const user: any = req.user;
    if (user.role === 'CLIENT') {
      const isLinked = await this.petsService.isPetLinkedToUser(id, user.id);
      if (!isLinked) throw new ForbiddenException('No puedes modificar esta mascota');
    }
    return this.petsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user: any = req.user;
    if (user.role === 'CLIENT') {
      const isLinked = await this.petsService.isPetLinkedToUser(id, user.id);
      if (!isLinked) throw new ForbiddenException('No puedes eliminar esta mascota');
    }
    return this.petsService.remove(id);
  }
}
