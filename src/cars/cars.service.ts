import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';


@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla',
        },
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Camry',
        },
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Yaris',
        },
        {
            id: uuid(),
            brand: 'Nissan',
            model: 'Sentra',
        },
        {
            id: uuid(),
            brand: 'Nissan',
            model: 'Altima',
        }
    ]

    findAll() {
        return this.cars;
    }

    findOne(id: string) {
        const car = this.cars.find(car => car.id === id);

        if (!car) {
            throw new BadRequestException(`Car with id ${id} not found`);
        }

        return car;
    }


    create(createCarDto: CreateCarDto) {
        const newCar: Car = {
            id: uuid(),
            ...createCarDto
        }

        this.cars.push(newCar);

        return newCar;
    }

    update(id: string, updateCarDto: UpdateCarDto) {

        let carDb = this.findOne(id);

        if(updateCarDto.id && updateCarDto.id !== id) {
            throw new BadRequestException(`Car id ${id} does not match the id in the request body`);
        }

        this.cars = this.cars.map(car => {
            if (car.id === id) {

                carDb = {
                    ...car,
                    ...updateCarDto,
                    id
                }
                return carDb;
            }
            return car;
        })

        return carDb;
    }

    delete (id: string ) {
        
        const car = this.findOne(id);

        if(!car) {
            throw new BadRequestException(`Car with id ${id} not found`);
        }

        this.cars = this.cars.filter(car => car.id !== id);

        return {
            ok: true,
            message: 'Car deleted',
            car
        }

    }

}
