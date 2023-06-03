export interface TopExchangerByProfitQueryResult {
  id: number;
  exchanger: string;
  country: string;
  profit_in_usd: number;
}

export interface GetTopExchangersByProfitParams {
  limit: number;
}
