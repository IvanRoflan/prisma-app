import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateStockDto } from '../stores/dto/update-stock.dto';

@Injectable()
export class WarehousesService {
  constructor(private readonly prisma: PrismaService) {}

  async updateWarehouseStock(productId: string, dto: UpdateStockDto) {
    await this.prisma.warehouseStock.upsert({
      where: { productId },
      update: dto,
      create: {
        productId,
        ...dto,
      },
    });
  }
}
