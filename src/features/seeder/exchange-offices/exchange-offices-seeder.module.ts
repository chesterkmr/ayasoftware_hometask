import { Module } from '@nestjs/common';
import { CountriesModule } from 'src/features/countries/countries.module';
import { ExchangeOfficesModule } from 'src/features/exchange-offices/exchange-offices.module';
import { ExchangeOfficesSeederService } from 'src/features/seeder/exchange-offices/exchange-offices-seeder.service';
import { FetchFromFileModule } from 'src/features/seeder/exchange-offices/fetch-from-file/fetch-from-file-source.module';

@Module({
  imports: [FetchFromFileModule, ExchangeOfficesModule, CountriesModule],
  providers: [ExchangeOfficesSeederService],
  exports: [ExchangeOfficesSeederService],
})
export class ExchangeOfficesSeederModule {}
