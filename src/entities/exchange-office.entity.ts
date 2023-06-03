import { Country } from 'src/entities/country.entity';
import { Exchange } from 'src/entities/exchange.entity';
import { Rate } from 'src/entities/rate.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ExchangeOffice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column()
  name: string;

  @ManyToOne(() => Country, (country) => country.exchangeOffices, {})
  country: Country;

  @OneToMany(() => Exchange, (exchange) => exchange.exchangeOffice, {
    cascade: true,
  })
  exchanges: Exchange[];

  @OneToMany(() => Rate, (rate) => rate.exchangeOffice, { cascade: true })
  rates: Rate[];
}
