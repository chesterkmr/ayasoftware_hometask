import { Injectable } from '@nestjs/common';
import { Country } from 'src/entities/country.entity';
import { CountriesRepository } from 'src/features/countries/countries.repository';
import { CreateCountryPayload } from 'src/features/countries/countries.types';

@Injectable()
export class CountriesService {
  constructor(private readonly countriesRepository: CountriesRepository) {}

  async createCountries(countries: CreateCountryPayload[]): Promise<Country[]> {
    const newCountries = countries.map((countryPayload) => {
      const newCountry = new Country();

      newCountry.code = countryPayload.code;
      newCountry.name = countryPayload.name;

      return newCountry;
    });

    await this.countriesRepository.createMany(newCountries);

    return newCountries;
  }

  async getCountries() {
    return await this.countriesRepository.getAll();
  }
}
