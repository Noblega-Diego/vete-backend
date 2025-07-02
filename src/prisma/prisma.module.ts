import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exportar PrismaService para que esté disponible en otros módulos
})
export class PrismaModule {}
