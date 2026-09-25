import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from 'src/repo/categories.repo';

@Injectable()
export class CategoriesService {

  constructor(private readonly categoryRepo: CategoryRepository) { }

  create(createCategoryDto: CreateCategoryDto) {
    const newTicket = this.categoryRepo.create(createCategoryDto)
    return newTicket;
  }

  findAll() {
    return this.categoryRepo.getAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
