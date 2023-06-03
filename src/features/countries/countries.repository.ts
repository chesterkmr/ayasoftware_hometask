import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/entities/country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesRepository {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async createMany(countries: Partial<Country>[]): Promise<void> {
    const result = countries.map((country) =>
      this.countryRepository.save(country),
    );

    await Promise.all(result);
  }

  async getAll() {
    return await this.countryRepository.find();
  }
}
