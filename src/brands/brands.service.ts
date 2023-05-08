import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from "uuid";

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime()
    // }
  ]

  create(createBrandDto: CreateBrandDto) {

    const {name} = createBrandDto;

    const brand: Brand = {
      id:uuid(),
      name:name.toLowerCase(),
      createdAt: new Date().getTime()
    }

    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    
    const brand = this.brands.find(b => b.id === id);
    if(!brand){
      throw new NotFoundException(`Brand with id ${id} not found`);
    }

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    
    let brandDB = this.findOne(id);

    this.brands = this.brands.map( brand => {

      if(brand.id === id){
        brandDB.updatedAt = new Date().getTime();
        brandDB = {
          ...brandDB,
          ...updateBrandDto
        }
        return brandDB;
      }
      return brand;
    });

    return brandDB;
  }

  remove(id: string) {
    const index = this.brands.findIndex( c => c.id === id);

    if(index === -1){
        throw new NotFoundException(`Brand with id ${id} not found`);
    }
    const brandRomeve = this.brands.splice(index, 1);
    return brandRomeve;
  }

  fillBrandsWithSeedData(brands:Brand[]) {
    this.brands = brands;
  }
}
