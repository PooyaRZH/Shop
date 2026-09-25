import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/repo/products.repo';

@Injectable()
export class ProductsService {

  constructor(private readonly productRepo: ProductRepository) { }



  async create(createProductDto: CreateProductDto) {

    if (createProductDto.categories?.length) {
      for (const id of createProductDto.categories) {
        const isExistCategory = await this.productRepo.isExistCategory(id)
        if (!isExistCategory) throw new NotFoundException("category not found")
      }

    }

    const newProduct = await this.productRepo.create(createProductDto)

    if (createProductDto.categories?.length) {
      for (const id of createProductDto.categories) {
        await this.productRepo.createRel(newProduct.id, id)
      }
    }


    return newProduct;
  }



  async findAll() {
    return await this.productRepo.getAll();
  }


  async findOne(id: number) {
    const product = await this.productRepo.getById(id);
    if (!product) throw new NotFoundException("Product not found !")
    return product
  }




  async update(id: number, updateProductDto: UpdateProductDto) {
    if (updateProductDto.categories?.length) {
      for (const id of updateProductDto.categories) {
        const isExistCategory = await this.productRepo.isExistCategory(id)
        if (!isExistCategory) throw new NotFoundException("category not found")
      }

      await this.productRepo.removeCategories(id)
    }

    await this.productRepo.update(id, updateProductDto);
    // console.log(await this.productRepo.update(id, updateProductDto))

    if (updateProductDto.categories?.length) {
      for (const categoryId of updateProductDto.categories) {
        await this.productRepo.createRel(id, categoryId)
      }
    }

    return await this.productRepo.getById(id);
  }



  async remove(id: number) {
    const isRemoved = await this.productRepo.remove(id);
    if (!isRemoved) throw new NotFoundException("محصول یافت نشد")

    return "حذف شد"
  }
}
