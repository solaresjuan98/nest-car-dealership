import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { Car } from './interfaces/car.interface';
import { CreateCarDto } from './dto/create-car.dto';


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

        if(!car) {
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

}
