import { Injectable } from '@nestjs/common';
import { ExchangeOfficesSeederService } from 'src/features/seeder/exchange-offices/exchange-offices-seeder.service';
import { ISeederService } from 'src/features/seeder/seeder.types';

@Injectable()
export class SeederService {
  private seeders: ISeederService[] = [];

  constructor(exchangeOfficesSeeder: ExchangeOfficesSeederService) {
    this.seeders = [exchangeOfficesSeeder];
  }

  async seed() {
    await Promise.all(this.seeders.map((seeder) => seeder.seed()));
    console.log('Seeding finished.');
  }
}
