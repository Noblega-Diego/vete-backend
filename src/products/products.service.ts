import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

export interface ProductQuery {
  page?: number;
  limit?: number;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    return this.prisma.product.create({ data });
  }

  async findAll(query: ProductQuery = {}) {
    const {
      page = 1,
      limit = 10,
      categoryId,
      minPrice,
      maxPrice,
      search,
    } = query;
    const skip = (page - 1) * limit;
    const where: any = { deleted: false };
    if (categoryId) where.categoryId = Number(categoryId);
    if (minPrice) where.price = { ...where.price, gte: Number(minPrice) };
    if (maxPrice) where.price = { ...where.price, lte: Number(maxPrice) };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: { images: true, category: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id, deleted: false }, include: { images: true, category: true } });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async update(id: number, data: UpdateProductDto) {
    await this.findOne(id);
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product.update({ where: { id }, data: { deleted: true } });
  }
}
