import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FetchFromFileSourceService } from 'src/features/seeder/exchange-offices/fetch-from-file/fetch-from-file-source.service';
import { DataParserModule } from 'src/utils/data-parser/data-parser.module';

const exchangeOfficesSourceFactory = {
  provide: 'EXCHANGE_OFFICES_SOURCE',
  useClass: FetchFromFileSourceService,
};

@Module({
  imports: [DataParserModule],
  providers: [exchangeOfficesSourceFactory, ConfigService],
  exports: [exchangeOfficesSourceFactory],
})
export class FetchFromFileModule {}
