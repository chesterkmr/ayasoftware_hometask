import { Controller, Get, Query } from '@nestjs/common';
import { GetTopExchangersDto } from 'src/api/exchanger/dto/get-top-exchangers.dto';
import { ExchangeOfficesService } from 'src/features/exchange-offices/exchange-offices.service';
import { TopExchanger } from 'src/features/exchange-offices/repository/entities/top-exchanger.entity';

@Controller('exchanger')
export class ExchangerController {
  constructor(
    private readonly exchangerOfficeService: ExchangeOfficesService,
  ) {}

  @Get('/top')
  async getTopExchangers(
    @Query() query: GetTopExchangersDto,
  ): Promise<TopExchanger[]> {
    return await this.exchangerOfficeService.getTopExchangers({
      limit: query.limit,
    });
  }
}
