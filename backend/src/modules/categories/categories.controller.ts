import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesInput } from './dto/create-categories.input';
import { UpdateCategoriesInput } from './dto/update-categories.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { baseController } from 'src/core/baseController';
import { Response } from 'express';
import { SkipAuth } from '../../core/guards/auth-guard';
@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBody({ type: CreateCategoriesInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createCategoriesInput: CreateCategoriesInput,
  ) {
    const result = await this.categoriesService.create(createCategoriesInput);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Categories created successfully',
    );
  }

  @SkipAuth()
  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.categoriesService.find({
      relations: { sub_categories: true },
      order: {
        category_order: 'ASC',
        sub_categories: {
          sub_category_order: 'ASC',
        },
      },
    });

    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Categories retrieved successfully',
    );
  }

  @SkipAuth()
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.categoriesService.findOne({
      where: { id },
      relations: { sub_categories: true },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Categories retrieved successfully',
    );
  }

  @ApiBody({ type: UpdateCategoriesInput })
  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoriesInput: UpdateCategoriesInput,
  ) {
    const result = await this.categoriesService.update(id, {
      ...updateCategoriesInput,
      id,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Categories updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.categoriesService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Categories deleted successfully',
    );
  }
}
