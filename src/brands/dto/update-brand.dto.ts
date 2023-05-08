// import { PartialType } from '@nestjs/mapped-types';
// import { CreateBrandDto } from './create-brand.dto';
import { IsString, MinLength } from 'class-validator';

// //Aqui estamos extendiendo este DTO, Y con el metodo partialtype las propiedades se vuelve 
// //opcional. para eso sirve el mapped-types
// export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
export class UpdateBrandDto {

    @IsString()
    @MinLength(1)
    name: string;
}