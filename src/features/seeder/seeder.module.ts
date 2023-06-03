import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/features/database/database.module';
import { ExchangeOfficesSeederModule } from 'src/features/seeder/exchange-offices/exchange-offices-seeder.module';
import { SeederService } from 'src/features/seeder/seeder.service';

@Module({
  imports: [
    TypeOrmModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ExchangeOfficesSeederModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
