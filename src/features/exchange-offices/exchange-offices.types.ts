import { GetTopExchangersByProfitParams } from 'src/features/exchange-offices/repository/types';

export interface CreateRatePayload {
  from: string;
  to: string;
  in: number;
  out: number;
  reserve: number;
  date: Date;
}

export interface CreateExchangePayload {
  from: string;
  to: string;
  ask: number;
  date: Date;
}

export interface CreateExchangeOfficePayload {
  uid: string;
  name: string;
  countryCode: string;
  exchanges: CreateExchangePayload[];
  rates: CreateRatePayload[];
}

export type GetTopExchangersParams = GetTopExchangersByProfitParams;
