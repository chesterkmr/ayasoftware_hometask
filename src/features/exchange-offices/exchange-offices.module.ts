import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeOffice } from 'src/entities/exchange-office.entity';
import { CountriesModule } from 'src/features/countries/countries.module';
import { ExchangeOfficesService } from 'src/features/exchange-offices/exchange-offices.service';
import { ExchangeOfficesRepository } from 'src/features/exchange-offices/repository/exchange-offices.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeOffice]), CountriesModule],
  providers: [ExchangeOfficesService, ExchangeOfficesRepository],
  exports: [ExchangeOfficesService],
})
export class ExchangeOfficesModule {}
