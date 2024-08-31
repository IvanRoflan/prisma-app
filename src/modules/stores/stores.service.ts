import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from '../prisma/prisma.service';
import { StoreRepresentation } from './representation/store.representation';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateStoreDto) {
    await this.prisma.store.create({ data: dto });
  }

  async getById(id: string) {
    const data = await this.prisma.store.findFirstOrThrow({
      where: { id },
      include: {
        storeStocks: {
          select: {
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                prices: {
                  where: { storeId: id },
                  select: {
                    amount: true,
                    currency: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const products = data.storeStocks.map((it) => ({
      quantity: it.quantity,
      ...it.product,
      prices: it.product.prices.map((p) => ({
        amount: +p.amount,
        currency: p.currency,
      })),
    }));

    const res: StoreRepresentation = {
      id: data.id,
      name: data.name,
      location: data.location,
      products,
    };

    return res;
  }

  async update(id: string, dto: UpdateStoreDto) {
    await this.prisma.store.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.prisma.store.delete({ where: { id } });
  }

  async setPrice(storeId: string, productId: string, dto: CreatePriceDto) {
    await this.prisma.price.upsert({
      where: {
        productId_storeId_currency: {
          storeId,
          productId,
          currency: dto.currency,
        },
      },
      update: dto,
      create: {
        ...dto,
        storeId,
        productId,
      },
    });
  }

  async updateStock(
    storeId: string,
    productId: string,
    updateStockDto: UpdateStockDto,
  ) {
    return this.prisma.storeStock.upsert({
      where: {
        productId_storeId: {
          storeId,
          productId,
        },
      },
      update: updateStockDto,
      create: {
        storeId,
        productId,
        ...updateStockDto,
      },
    });
  }
}
