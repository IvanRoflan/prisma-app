import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SingleProductRepresentation } from './representations/single-product.representation';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    await this.prisma.product.create({
      data: {
        ...dto,
        categories: {
          create: dto.categories.map((id) => ({
            category: { connect: { id } },
          })),
        },
      },
    });
  }

  findAll() {
    return `This action returns all products`;
  }

  async getById(id: string) {
    const data = await this.prisma.product.findFirstOrThrow({
      where: { id },
      include: {
        categories: { select: { category: { select: { name: true } } } },
        prices: {
          select: {
            amount: true,
            currency: true,
            store: { select: { id: true, name: true } },
          },
        },
        storeStocks: {
          select: {
            quantity: true,
            store: { select: { id: true, name: true } },
          },
        },
        warehouseStocks: true,
      },
    });

    const categories = data.categories.map((it) => it.category.name);
    const prices = data.prices.map((it) => ({
      amount: +it.amount,
      currency: it.currency,
      storeId: it.store.id,
      storeName: it.store.name,
    }));
    const storeLeftovers = data.storeStocks.map((it) => ({
      quantity: it.quantity,
      storeId: it.store.id,
      storeName: it.store.name,
    }));
    const warehouseLeftovers = data.warehouseStocks.map((it) => ({
      id: it.id,
      quantity: it.quantity,
    }));

    const res: SingleProductRepresentation = {
      id: data.id,
      name: data.name,
      description: data.description,
      categories,
      prices,
      storeLeftovers,
      warehouseLeftovers,
    };

    return res;
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.prisma.product.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    await this.prisma.product.delete({ where: { id } });
  }
}
