import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/create-category.dto';
import { OkResponseRepresentation } from 'src/common/representations/ok-result.response';
import { UuidDto } from 'src/common/dto/uuid.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryRepresentation } from './representations/category.representation';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create category' })
  @ApiOkResponse({ type: OkResponseRepresentation })
  async create(@Body() dto: CategoryDto) {
    await this.categoriesService.create(dto);

    return new OkResponseRepresentation();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  @ApiOkResponse({ type: CategoryRepresentation })
  async findOne(@Param() { id }: UuidDto) {
    return await this.categoriesService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update category' })
  @ApiOkResponse({ type: OkResponseRepresentation })
  async update(@Param() { id }: UuidDto, @Body() dto: CategoryDto) {
    await this.categoriesService.update(id, dto);

    return new OkResponseRepresentation();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiOkResponse({ type: OkResponseRepresentation })
  async remove(@Param() { id }: UuidDto) {
    await this.categoriesService.delete(id);

    return new OkResponseRepresentation();
  }
}
