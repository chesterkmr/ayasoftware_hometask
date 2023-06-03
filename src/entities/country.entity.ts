import { ExchangeOffice } from 'src/entities/exchange-office.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => ExchangeOffice, (office) => office.country)
  exchangeOffices: ExchangeOffice[];
}
