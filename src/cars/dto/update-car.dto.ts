import { IsString, MinLength, IsUUID, IsOptional } from "class-validator";


//Usando el class-validator y validatorPipe
export class UpdateCarDto{

    //Volviendo las propiedades opcionales
    //Las propiedades de los DTOS deben ser readonly
    @IsUUID()
    @IsOptional()                                   ///is optional decorator
    readonly id?: string;
    
    //Debemos usar estos decoradores para validar las propiedades en los dto
    @IsString()
    @IsOptional()
    readonly brand?: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    readonly model?: string;

}