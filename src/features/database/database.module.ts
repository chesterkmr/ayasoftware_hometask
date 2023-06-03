import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/entities/country.entity';
import { ExchangeOffice } from 'src/entities/exchange-office.entity';
import { Exchange } from 'src/entities/exchange.entity';
import { Rate } from 'src/entities/rate.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('DB_HOST'),
          port: config.get('DB_PORT'),
          username: config.get('DB_USER'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_NAME'),
          entities: [ExchangeOffice, Exchange, Rate, Country],
          synchronize: true,
          migrations: ['dist/migrations/*.js'],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
