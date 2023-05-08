import { IsString, MinLength } from "class-validator";


//Usando el class-validator y validatorPipe
export class CreateCarDto{
    //Las propiedades de los DTOS deben ser readonly
    
    //Debemos usar estos decoradores para validar las propiedades en los dto
    @IsString()
    readonly brand: string;

    @IsString()
    @MinLength(3)
    readonly model: string;

}