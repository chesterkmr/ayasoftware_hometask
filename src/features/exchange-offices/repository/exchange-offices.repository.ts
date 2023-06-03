import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeOffice } from 'src/entities/exchange-office.entity';
import { TopExchanger } from 'src/features/exchange-offices/repository/entities/top-exchanger.entity';
import {
  GetTopExchangersByProfitParams,
  TopExchangerByProfitQueryResult,
} from 'src/features/exchange-offices/repository/types';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ExchangeOfficesRepository {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(ExchangeOffice)
    private readonly officesRepository: Repository<ExchangeOffice>,
  ) {}

  async createMany(offices: Partial<ExchangeOffice>[]): Promise<void> {
    await this.officesRepository.save(offices);
  }

  async getTopExchangersByProfit(
    query: GetTopExchangersByProfitParams,
  ): Promise<TopExchanger[]> {
    const result = await this.dataSource.query<
      TopExchangerByProfitQueryResult[]
    >(`with cte_transactions_with_bids as (
      select
        *,
        (
          select
            (transactions."ask" / (rate."out" / rate."in"))
          from
            rate
          where
            rate."exchangeOfficeId" = transactions."exchangeOfficeId"
            and rate."date" < transactions."date"
            and rate."from" = transactions."from"
            and rate."to" = transactions."to"
          limit
            1
        ) as bid
      from
        exchange as transactions
      where
        transactions."date" >= date_trunc('month', current_date)
        and transactions."date" <= now()
    ),
    cte_transactions_usd as (
      select
        *,
        (
          select
            transactions."ask" / rate."in"
          from
            rate
          where
            rate."exchangeOfficeId" = transactions."exchangeOfficeId"
            and rate."date" < transactions."date"
            and rate."from" = transactions."to"
            and rate."to" like 'USD'
          limit
            1
        ) as ask_usd,
        (
          select
            transactions."bid" / (rate."in" / rate."out")
          from
            rate
          where
            rate."exchangeOfficeId" = transactions."exchangeOfficeId"
            and rate."date" < transactions."date"
            and rate."from" = transactions."from"
            and rate."to" like 'USD'
        ) as bid_usd
      from
        cte_transactions_with_bids as transactions
    ),
    cte_aggregated_transactions as (
      select
        transactions."exchangeOfficeId",
        SUM(transactions."ask_usd" - transactions."bid_usd") as profit
      from
        cte_transactions_usd as transactions
      group by
        transactions."exchangeOfficeId"
    ),
    cte_top_offices_by_country as (
      select
        *,
        ROW_NUMBER() over (
          partition by exchange_office."countryId"
          order by
            transactions."profit" desc
        ) as row_number
      from
        exchange_office
        inner join cte_aggregated_transactions as transactions on exchange_office."id" = transactions."exchangeOfficeId"
    )
    select
      offices."id",
      offices."name" as exchanger,
      country."name" as country,
      offices."profit"::numeric(18,2)::float as profit_in_usd
    from
      cte_top_offices_by_country as offices
      inner join (
        select
          *
        from
          country
      ) as country on country."id" = offices."countryId"
    where
      offices.row_number <= ${query.limit}
    order by
      offices."profit" desc
    `);

    return result.map((result) => {
      const topExchanger = new TopExchanger();
      topExchanger.id = result.id;
      topExchanger.country = result.country;
      topExchanger.exchanger = result.exchanger;
      topExchanger.profit = result.profit_in_usd;

      return topExchanger;
    });
  }
}
