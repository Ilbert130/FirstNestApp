import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { get } from 'https';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

// @UsePipes(ValidationPipe) //Pipes a nivel del controlador. Esto hara que la validacion sea global
//Esto significa que tendra este nombre en la ruta
@Controller('cars')
export class CarsController {

    //Inyeccion de dependencia
    constructor(
        //Nest crea la instancia de esta inyeccion
        private readonly carsService: CarsService
    ){}

    @Get()
    getAllCars(){
        return this.carsService.findAll();
    }

    //Resiviendo un id por parametro
    //Transformar la data recibida en requests, para
    //asegurar un tipo, valor o instancia de un objeto.
    //Este pipes hace la transformacion a un entero
    //Esto hace una validacin para ver si es un entero el que llega
    //@Param('id', ParseIntPipe) id:number
    @Get(':id')
    getCarById( @Param('id', ParseUUIDPipe) id:string ) {

        // console.log({id});
        const car = this.carsService.findById(id);

        return {
            car 
        }
    }

    // @UsePipes(ValidationPipe) //Usando los pipes a nivel de los metodos
    @Post() //si accedemos al body en un post
    createCar(@Body() createCardDto:CreateCarDto) {

        const car = this.carsService.create(createCardDto);
        return {
            ok:true,
            car
        }
    }

    @Patch(':id') //si accedemos al body en un post @Param('id', ParseIntPipe) id:number
    updateCar(
        @Body() updateCarDto:UpdateCarDto, 
        @Param('id', ParseUUIDPipe) id:string
    ) {

        return this.carsService.update(id, updateCarDto);
    }

    @Delete(':id') //si accedemos al body en un post
    deleteCar(@Param('id', ParseUUIDPipe) id:string) {

        return this.carsService.delete(id)[0];
    }
}
