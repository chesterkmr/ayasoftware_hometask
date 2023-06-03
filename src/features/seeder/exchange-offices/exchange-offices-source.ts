import { FetchSourceResult } from 'src/features/seeder/exchange-offices/exchange-offices.types';

export abstract class IExchangeOfficesSource {
  abstract getData(): Promise<FetchSourceResult>;
}
