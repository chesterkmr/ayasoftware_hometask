import { ExchangeOffice } from 'src/entities/exchange-office.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exchange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  ask: number;

  @Column()
  date: Date;

  @ManyToOne(() => ExchangeOffice, (exchangeOffice) => exchangeOffice.exchanges)
  exchangeOffice: ExchangeOffice;
  @Column()
  exchangeOfficeId: number;
}
