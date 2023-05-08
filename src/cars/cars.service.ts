import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from "uuid";
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars:Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Corolla'
        // },
        // {
        //     id: uuid(),
        //     brand: 'Honda',
        //     model: 'Civi'
        // },
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Vitz'
        // }
    ]

    findAll() {
        return this.cars;
    }

    findById(id:string) {

        const car = this.cars.find(c => c.id === id);

        if(!car){
            //Asi agregamos el mesaje que queremos 
            //usando un exception filter
            throw new NotFoundException(`Car with id ${id} not found`);
        }

        return car;
    }

    create(createCarDto:CreateCarDto) {

        const car = {
            id:uuid(),
            ...createCarDto
        }

        this.cars.push(car);
        return car;
    }

    update(id:string, updateCarDto:UpdateCarDto) {

        let carDB = this.findById(id);

        if(updateCarDto.id && updateCarDto.id !== id){
            throw new BadRequestException('Car id is not valid');
        }

        this.cars = this.cars.map( c => {

            if(c.id === id){
                carDB = {
                    ...carDB,
                    ...updateCarDto,  //Esto sobre escribe las propiedades
                    id,
                }

                return carDB;
            }

            return c;
        });

        return carDB;

    }

    delete(id:string) {

        const index = this.cars.findIndex( c => c.id === id);

        if(index === -1){
            throw new NotFoundException(`Car with id ${id} not found`);
        }

        const carRomeve = this.cars.splice(index, 1);
        return carRomeve;
    }

    fillCarsWithSeedData(cars:Car[]){
        this.cars = cars;
    }
}
