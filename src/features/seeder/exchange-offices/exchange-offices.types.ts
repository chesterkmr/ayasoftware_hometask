export interface SourceBase {
  date: Date;
}

export interface ExchangeSource extends SourceBase {
  from: string;
  to: string;
  ask: string;
}

export interface RateSource extends SourceBase {
  from: string;
  to: string;
  in: string;
  out: string;
  reserve: string;
}

export interface ExchangeOfficeSource {
  id: string;
  name: string;
  country: string;
  exchanges: ExchangeSource[];
  rates: RateSource[];
}

export interface CountrySource {
  code: string;
  name: string;
}

export interface FetchSourceResult {
  'exchange-offices': ExchangeOfficeSource[];
  countries: CountrySource[];
}
