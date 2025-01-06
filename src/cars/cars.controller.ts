import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {

    constructor (private readonly carsService: CarsService) {}
    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id/:status')
    getCarById(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
        return this.carsService.findOne(id);
    }

    @Post()
    createCar(@Body() createCarDto: CreateCarDto) {
        return {
            ok: true,
            method: 'POST'
        }
    }

    @Patch()
    updateCar(@Body() body: any) {
        return {
            ok: true,
            method: 'PATCH'
        }
    }

    @Delete()
    deleteCar( @Param('id') id: string) {
        return {
            ok: true,
            method: 'DELETE'
        }
    }

}
