import { Inject, Injectable } from '@nestjs/common';
import { ExchangeOffice } from 'src/entities/exchange-office.entity';
import { ExchangeOfficesService } from 'src/features/exchange-offices/exchange-offices.service';
import { IExchangeOfficesSource } from 'src/features/seeder/exchange-offices/exchange-offices-source';
import {
  ExchangeOfficeSource,
  FetchSourceResult,
} from 'src/features/seeder/exchange-offices/exchange-offices.types';
import { ISeederService } from 'src/features/seeder/seeder.types';
import { Country } from 'src/entities/country.entity';
import { CreateExchangeOfficePayload } from 'src/features/exchange-offices/exchange-offices.types';
import { CountriesService } from 'src/features/countries/countries.service';
import { CreateCountryPayload } from 'src/features/countries/countries.types';

@Injectable()
export class ExchangeOfficesSeederService implements ISeederService {
  constructor(
    @Inject('EXCHANGE_OFFICES_SOURCE')
    private readonly source: IExchangeOfficesSource,
    private readonly exchangeOfficesService: ExchangeOfficesService,
    private readonly countriesService: CountriesService,
  ) {}

  async seed(): Promise<void> {
    const results = await this.source.getData();

    await this.persistResults(results);
  }

  async persistResults(results: FetchSourceResult) {
    await this.persistCountries(results);
    await this.persistOffices(results);
  }

  async persistCountries(results: FetchSourceResult): Promise<Country[]> {
    const countries: CreateCountryPayload[] = results.countries.map(
      (country) => {
        const { name, code } = country;

        return {
          name,
          code,
        };
      },
    );

    const createdCountries = await this.countriesService.createCountries(
      countries,
    );

    return createdCountries;
  }

  private async persistOffices(
    results: FetchSourceResult,
  ): Promise<ExchangeOffice[]> {
    const exchangeOfficesSources = results['exchange-offices'] || [];
    const exchangeOfficeCreationPayload = this.deserializeExchangeOfficeSources(
      exchangeOfficesSources,
    );
    const offices = await this.exchangeOfficesService.createOffices(
      exchangeOfficeCreationPayload,
    );

    return offices;
  }

  private deserializeExchangeOfficeSources(
    offices: ExchangeOfficeSource[],
  ): CreateExchangeOfficePayload[] {
    return offices.map((office) => {
      const { id: uid, name, country: countryCode, exchanges, rates } = office;

      return {
        uid,
        name,
        countryCode,
        exchanges: exchanges.map((exchageSource) => {
          const { from, to, ask, date } = exchageSource;

          return {
            from,
            to,
            date,
            ask: Number(ask),
          };
        }),
        rates: rates.map((rateSource) => {
          const { from, to, out, date, reserve } = rateSource;

          return {
            from,
            to,
            in: Number(rateSource.in),
            out: Number(out),
            reserve: Number(reserve),
            date,
          };
        }),
      };
    });
  }
}
