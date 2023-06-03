import { Module } from '@nestjs/common';
import { ExchangerController } from 'src/api/exchanger/exchanger.controller';
import { ExchangeOfficesModule } from 'src/features/exchange-offices/exchange-offices.module';

@Module({
  imports: [ExchangeOfficesModule],
  controllers: [ExchangerController],
})
export class ApiModule {}
