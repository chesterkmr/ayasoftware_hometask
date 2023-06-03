import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { FetchSourceResult } from 'src/features/seeder/exchange-offices/exchange-offices.types';
import { IExchangeOfficesSource } from 'src/features/seeder/exchange-offices/exchange-offices-source';
import { IDataParser } from 'src/utils/data-parser/data-parser';

@Injectable()
export class FetchFromFileSourceService implements IExchangeOfficesSource {
  constructor(
    private readonly configService: ConfigService,
    @Inject('DATA_PARSER') private readonly dataParser: IDataParser,
  ) {}

  getData(): Promise<FetchSourceResult> {
    const content = this.loadFileContent();

    return Promise.resolve(this.dataParser.parse<FetchSourceResult>(content));
  }

  private loadFileContent() {
    const filePath = this.configService.get('EXCHANGE_OFFICE_FILE_PATH');

    const content = readFileSync(filePath, {
      encoding: 'utf8',
    });

    return content;
  }
}
