import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/entities/country.entity';
import { CountriesRepository } from 'src/features/countries/countries.repository';
import { CountriesService } from 'src/features/countries/countries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  providers: [CountriesRepository, CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}
