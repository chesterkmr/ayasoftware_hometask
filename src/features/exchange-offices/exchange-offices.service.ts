import { Injectable } from '@nestjs/common';
import { ExchangeOffice } from 'src/entities/exchange-office.entity';
import { Exchange } from 'src/entities/exchange.entity';
import { Rate } from 'src/entities/rate.entity';
import { CountriesService } from 'src/features/countries/countries.service';
import {
  CreateExchangeOfficePayload,
  GetTopExchangersParams,
} from 'src/features/exchange-offices/exchange-offices.types';
import { TopExchanger } from 'src/features/exchange-offices/repository/entities/top-exchanger.entity';
import { ExchangeOfficesRepository } from 'src/features/exchange-offices/repository/exchange-offices.repository';

@Injectable()
export class ExchangeOfficesService {
  constructor(
    private readonly countriesService: CountriesService,
    private readonly exchangeOfficeRepository: ExchangeOfficesRepository,
  ) {}

  async createOffices(
    offices: CreateExchangeOfficePayload[],
  ): Promise<ExchangeOffice[]> {
    const exchangeOffices = await this.initializeNewOffices(offices);

    await this.exchangeOfficeRepository.createMany(exchangeOffices);

    return exchangeOffices;
  }

  private async initializeNewOffices(
    offices: CreateExchangeOfficePayload[],
  ): Promise<ExchangeOffice[]> {
    const countries = await this.countriesService.getCountries();
    const countriesMapByCountryCode = countries.reduce((map, country) => {
      map[country.code] = country;
      return map;
    }, {});

    return offices.map((officePayload) => {
      const { uid, name, countryCode, rates, exchanges } = officePayload;

      const newOffice = new ExchangeOffice();
      newOffice.uid = uid;
      newOffice.name = name;
      newOffice.country = countriesMapByCountryCode[countryCode] || null;
      newOffice.rates = rates.map((ratePayload) => {
        const { from, to, out, date, reserve } = ratePayload;

        const newRate = new Rate();
        newRate.from = from;
        newRate.to = to;
        newRate.in = ratePayload.in;
        newRate.out = out;
        newRate.date = date;
        newRate.reserve = reserve;
        newRate.exchangeOffice = newOffice;

        return newRate;
      });

      newOffice.exchanges = exchanges.map((exchangePayload) => {
        const { from, to, ask, date } = exchangePayload;

        const newExchange = new Exchange();
        newExchange.ask = ask;
        newExchange.from = from;
        newExchange.to = to;
        newExchange.date = date;
        newExchange.exchangeOffice = newOffice;

        return newExchange;
      });
      return newOffice;
    });
  }

  async getTopExchangers(
    params: GetTopExchangersParams,
  ): Promise<TopExchanger[]> {
    return await this.exchangeOfficeRepository.getTopExchangersByProfit(params);
  }
}
