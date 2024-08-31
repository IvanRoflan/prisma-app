import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/create-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryRepresentation } from './representations/category.representation';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CategoryDto) {
    await this.prisma.category.create({ data: dto });
  }

  async getById(id: string) {
    const data = await this.prisma.category.findFirstOrThrow({
      where: { id },
      include: {
        products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const res: CategoryRepresentation = {
      id: data.id,
      name: data.name,
      products: data.products.map((it) => it.product),
    };

    return res;
  }

  async update(id: string, dto: CategoryDto) {
    await this.prisma.category.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    await this.prisma.category.delete({ where: { id } });
  }
}
