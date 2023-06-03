import { ExchangeOffice } from 'src/entities/exchange-office.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column({ type: 'decimal' })
  in: number;

  @Column({ type: 'decimal' })
  out: number;

  @Column()
  reserve: number;

  @Column({})
  date: Date;

  @ManyToOne(() => ExchangeOffice, (office) => office.rates)
  exchangeOffice: ExchangeOffice;
}
