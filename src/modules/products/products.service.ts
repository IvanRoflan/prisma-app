import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProductRepresentation } from './representations/product.representation';
import { GetPaginatedProductsDto } from './dto/get-paginated-products.dto';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { PageRepresentation } from 'src/common/representations/page.response';

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

  async getPaginated(dto: GetPaginatedProductsDto) {
    const { storeId, categoryId, skip, take } = dto;
    const where = {
      ...(categoryId && {
        categories: {
          some: {
            categoryId,
          },
        },
      }),
      ...(storeId && {
        storeStocks: {
          some: {
            storeId,
          },
        },
      }),
    };

    const [count, data] = await Promise.all([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        skip,
        take,
        include: {
          categories: { select: { category: { select: { name: true } } } },
          prices: {
            where: storeId ? { storeId } : undefined,
            select: {
              amount: true,
              currency: true,
              store: { select: { id: true, name: true } },
            },
          },
          storeStocks: {
            where: storeId ? { storeId } : undefined,
            select: {
              quantity: true,
              store: { select: { id: true, name: true } },
            },
          },
          warehouseStocks: true,
        },
      }),
    ]);

    const pageMeta = new PageMetaDto({
      pageOptionsDto: dto,
      itemCount: count,
    });

    return new PageRepresentation(
      data.map((it) => new ProductRepresentation(it)),
      pageMeta,
    );
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

    return new ProductRepresentation(data);
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.prisma.product.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    await this.prisma.product.delete({ where: { id } });
  }
}
