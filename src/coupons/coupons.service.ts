import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCouponDto) {
    return this.prisma.coupon.create({ data });
  }

  async findAll() {
    return this.prisma.coupon.findMany({ where: { deleted: false } });
  }

  async findOne(id: number) {
    const coupon = await this.prisma.coupon.findUnique({ where: { id, deleted: false } });
    if (!coupon) throw new NotFoundException('Cupón no encontrado');
    return coupon;
  }

  async update(id: number, data: UpdateCouponDto) {
    await this.findOne(id);
    return this.prisma.coupon.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.coupon.update({ where: { id }, data: { deleted: true } });
  }
}
