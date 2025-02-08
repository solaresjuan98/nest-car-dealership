import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

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
        return createCarDto;
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDto
    ) {
        return this.carsService.update(id, updateCarDto);
    }

    @Delete(':id')
    deleteCar( @Param('id') id: string) {
        
        return this.carsService.delete(id);

    }

}
